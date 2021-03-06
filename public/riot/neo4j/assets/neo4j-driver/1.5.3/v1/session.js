'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _streamObserver = require('./internal/stream-observer');

var _streamObserver2 = _interopRequireDefault(_streamObserver);

var _result = require('./result');

var _result2 = _interopRequireDefault(_result);

var _transaction = require('./transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _error = require('./error');

var _util = require('./internal/util');

var _connectionHolder = require('./internal/connection-holder');

var _connectionHolder2 = _interopRequireDefault(_connectionHolder);

var _driver = require('./driver');

var _driver2 = _interopRequireDefault(_driver);

var _transactionExecutor = require('./internal/transaction-executor');

var _transactionExecutor2 = _interopRequireDefault(_transactionExecutor);

var _bookmark = require('./internal/bookmark');

var _bookmark2 = _interopRequireDefault(_bookmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * A Session instance is used for handling the connection and
  * sending statements through the connection.
  * @access public
  */

var Session = function () {

  /**
   * @constructor
   * @param {string} mode the default access mode for this session.
   * @param {ConnectionProvider} connectionProvider - the connection provider to acquire connections from.
   * @param {Bookmark} bookmark - the initial bookmark for this session.
   * @param {Object} [config={}] - this driver configuration.
   */
  function Session(mode, connectionProvider, bookmark, config) {
    (0, _classCallCheck3.default)(this, Session);

    this._mode = mode;
    this._readConnectionHolder = new _connectionHolder2.default(_driver.READ, connectionProvider);
    this._writeConnectionHolder = new _connectionHolder2.default(_driver.WRITE, connectionProvider);
    this._open = true;
    this._hasTx = false;
    this._lastBookmark = bookmark;
    this._transactionExecutor = _createTransactionExecutor(config);
  }

  /**
   * Run Cypher statement
   * Could be called with a statement object i.e.: {text: "MATCH ...", parameters: {param: 1}}
   * or with the statement and parameters as separate arguments.
   * @param {mixed} statement - Cypher statement to execute
   * @param {Object} parameters - Map with parameters to use in statement
   * @return {Result} - New Result
   */


  (0, _createClass3.default)(Session, [{
    key: 'run',
    value: function run(statement) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if ((typeof statement === 'undefined' ? 'undefined' : (0, _typeof3.default)(statement)) === 'object' && statement.text) {
        parameters = statement.parameters || {};
        statement = statement.text;
      }
      (0, _util.assertCypherStatement)(statement);

      return this._run(statement, parameters, function (connection, streamObserver) {
        return connection.run(statement, parameters, streamObserver);
      });
    }
  }, {
    key: '_run',
    value: function _run(statement, parameters, statementRunner) {
      var streamObserver = new _streamObserver2.default(this._onRunFailure());
      var connectionHolder = this._connectionHolderWithMode(this._mode);
      if (!this._hasTx) {
        connectionHolder.initializeConnection();
        connectionHolder.getConnection(streamObserver).then(function (connection) {
          statementRunner(connection, streamObserver);
          connection.pullAll(streamObserver);
          connection.sync();
        }).catch(function (error) {
          return streamObserver.onError(error);
        });
      } else {
        streamObserver.onError((0, _error.newError)('Statements cannot be run directly on a ' + 'session with an open transaction; either run from within the ' + 'transaction or use a different session.'));
      }
      return new _result2.default(streamObserver, statement, parameters, function () {
        return streamObserver.serverMetadata();
      }, connectionHolder);
    }

    /**
     * Begin a new transaction in this session. A session can have at most one transaction running at a time, if you
     * want to run multiple concurrent transactions, you should use multiple concurrent sessions.
     *
     * While a transaction is open the session cannot be used to run statements outside the transaction.
     *
     * @param {string|string[]} [bookmarkOrBookmarks=null] - reference or references to some previous transactions.
     * DEPRECATED: This parameter is deprecated in favour of {@link Driver#session} that accepts an initial bookmark.
     * Session will ensure that all nested transactions are chained with bookmarks to guarantee causal consistency.
     * @returns {Transaction} - New Transaction
     */

  }, {
    key: 'beginTransaction',
    value: function beginTransaction(bookmarkOrBookmarks) {
      this._updateBookmark(new _bookmark2.default(bookmarkOrBookmarks));
      return this._beginTransaction(this._mode);
    }
  }, {
    key: '_beginTransaction',
    value: function _beginTransaction(accessMode) {
      var _this = this;

      if (this._hasTx) {
        throw (0, _error.newError)('You cannot begin a transaction on a session with an open transaction; ' + 'either run from within the transaction or use a different session.');
      }

      var mode = _driver2.default._validateSessionMode(accessMode);
      var connectionHolder = this._connectionHolderWithMode(mode);
      connectionHolder.initializeConnection();
      this._hasTx = true;

      return new _transaction2.default(connectionHolder, function () {
        _this._hasTx = false;
      }, this._onRunFailure(), this._lastBookmark, this._updateBookmark.bind(this));
    }

    /**
     * Return the bookmark received following the last completed {@link Transaction}.
     *
     * @return {string|null} a reference to a previous transaction
     */

  }, {
    key: 'lastBookmark',
    value: function lastBookmark() {
      return this._lastBookmark.maxBookmarkAsString();
    }

    /**
     * Execute given unit of work in a {@link READ} transaction.
     *
     * Transaction will automatically be committed unless the given function throws or returns a rejected promise.
     * Some failures of the given function or the commit itself will be retried with exponential backoff with initial
     * delay of 1 second and maximum retry time of 30 seconds. Maximum retry time is configurable via driver config's
     * <code>maxTransactionRetryTime</code> property in milliseconds.
     *
     * @param {function(tx: Transaction): Promise} transactionWork - callback that executes operations against
     * a given {@link Transaction}.
     * @return {Promise} resolved promise as returned by the given function or rejected promise when given
     * function or commit fails.
     */

  }, {
    key: 'readTransaction',
    value: function readTransaction(transactionWork) {
      return this._runTransaction(_driver.READ, transactionWork);
    }

    /**
     * Execute given unit of work in a {@link WRITE} transaction.
     *
     * Transaction will automatically be committed unless the given function throws or returns a rejected promise.
     * Some failures of the given function or the commit itself will be retried with exponential backoff with initial
     * delay of 1 second and maximum retry time of 30 seconds. Maximum retry time is configurable via driver config's
     * <code>maxTransactionRetryTime</code> property in milliseconds.
     *
     * @param {function(tx: Transaction): Promise} transactionWork - callback that executes operations against
     * a given {@link Transaction}.
     * @return {Promise} resolved promise as returned by the given function or rejected promise when given
     * function or commit fails.
     */

  }, {
    key: 'writeTransaction',
    value: function writeTransaction(transactionWork) {
      return this._runTransaction(_driver.WRITE, transactionWork);
    }
  }, {
    key: '_runTransaction',
    value: function _runTransaction(accessMode, transactionWork) {
      var _this2 = this;

      return this._transactionExecutor.execute(function () {
        return _this2._beginTransaction(accessMode);
      }, transactionWork);
    }

    /**
     * Update value of the last bookmark.
     * @param {Bookmark} newBookmark the new bookmark.
     * @private
     */

  }, {
    key: '_updateBookmark',
    value: function _updateBookmark(newBookmark) {
      if (newBookmark && !newBookmark.isEmpty()) {
        this._lastBookmark = newBookmark;
      }
    }

    /**
     * Close this session.
     * @param {function()} callback - Function to be called after the session has been closed
     * @return
     */

  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return null;
      };

      if (this._open) {
        this._open = false;
        this._transactionExecutor.close();
        this._readConnectionHolder.close().then(function () {
          _this3._writeConnectionHolder.close().then(function () {
            callback();
          });
        });
      } else {
        callback();
      }
    }

    //Can be overridden to add error callback on RUN

  }, {
    key: '_onRunFailure',
    value: function _onRunFailure() {
      return function (err) {
        return err;
      };
    }
  }, {
    key: '_connectionHolderWithMode',
    value: function _connectionHolderWithMode(mode) {
      if (mode === _driver.READ) {
        return this._readConnectionHolder;
      } else if (mode === _driver.WRITE) {
        return this._writeConnectionHolder;
      } else {
        throw (0, _error.newError)('Unknown access mode: ' + mode);
      }
    }
  }]);
  return Session;
}(); /**
      * Copyright (c) 2002-2018 "Neo Technology,"
      * Network Engine for Objects in Lund AB [http://neotechnology.com]
      *
      * This file is part of Neo4j.
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *     http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */


function _createTransactionExecutor(config) {
  var maxRetryTimeMs = config && config.maxTransactionRetryTime ? config.maxTransactionRetryTime : null;
  return new _transactionExecutor2.default(maxRetryTimeMs);
}

exports.default = Session;