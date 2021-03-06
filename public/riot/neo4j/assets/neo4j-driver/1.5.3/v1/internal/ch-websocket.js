'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _buf = require('./buf');

var _error = require('./../error');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new WebSocketChannel to be used in web browsers.
 * @access private
 */
var WebSocketChannel = function () {

  /**
   * Create new instance
   * @param {ChannelConfig} config - configuration for this channel.
   */
  function WebSocketChannel(config) {
    (0, _classCallCheck3.default)(this, WebSocketChannel);


    this._open = true;
    this._pending = [];
    this._error = null;
    this._handleConnectionError = this._handleConnectionError.bind(this);
    this._config = config;

    var scheme = "ws";
    //Allow boolean for backwards compatibility
    if (config.encrypted === true || config.encrypted === _util.ENCRYPTION_ON) {
      if (!config.trust || config.trust === 'TRUST_CUSTOM_CA_SIGNED_CERTIFICATES') {
        scheme = "wss";
      } else {
        this._error = (0, _error.newError)("The browser version of this driver only supports one trust " + 'strategy, \'TRUST_CUSTOM_CA_SIGNED_CERTIFICATES\'. ' + config.trust + ' is not supported. Please ' + "either use TRUST_CUSTOM_CA_SIGNED_CERTIFICATES or disable encryption by setting " + "`encrypted:\"" + _util.ENCRYPTION_OFF + "\"` in the driver configuration.");
        return;
      }
    }

    this._ws = createWebSocket(scheme, config.url);
    this._ws.binaryType = "arraybuffer";

    var self = this;
    //All connection errors are not sent to the error handler
    //we must also check for dirty close calls
    this._ws.onclose = function (e) {
      if (!e.wasClean) {
        self._handleConnectionError();
      }
    };
    this._ws.onopen = function () {
      // Connected! Cancel the connection timeout
      self._clearConnectionTimeout();

      // Drain all pending messages
      var pending = self._pending;
      self._pending = null;
      for (var i = 0; i < pending.length; i++) {
        self.write(pending[i]);
      }
    };
    this._ws.onmessage = function (event) {
      if (self.onmessage) {
        var b = new _buf.HeapBuffer(event.data);
        self.onmessage(b);
      }
    };

    this._ws.onerror = this._handleConnectionError;

    this._connectionTimeoutFired = false;
    this._connectionTimeoutId = this._setupConnectionTimeout();
  }

  (0, _createClass3.default)(WebSocketChannel, [{
    key: '_handleConnectionError',
    value: function _handleConnectionError() {
      if (this._connectionTimeoutFired) {
        // timeout fired - not connected within configured time
        this._error = (0, _error.newError)('Failed to establish connection in ' + this._config.connectionTimeout + 'ms', this._config.connectionErrorCode);

        if (this.onerror) {
          this.onerror(this._error);
        }
        return;
      }

      // onerror triggers on websocket close as well.. don't get me started.
      if (this._open) {
        // http://stackoverflow.com/questions/25779831/how-to-catch-websocket-connection-to-ws-xxxnn-failed-connection-closed-be
        this._error = (0, _error.newError)("WebSocket connection failure. Due to security " + "constraints in your web browser, the reason for the failure is not available " + "to this Neo4j Driver. Please use your browsers development console to determine " + "the root cause of the failure. Common reasons include the database being " + "unavailable, using the wrong connection URL or temporary network problems. " + "If you have enabled encryption, ensure your browser is configured to trust the " + 'certificate Neo4j is configured to use. WebSocket `readyState` is: ' + this._ws.readyState, this._config.connectionErrorCode);
        if (this.onerror) {
          this.onerror(this._error);
        }
      }
    }
  }, {
    key: 'isEncrypted',
    value: function isEncrypted() {
      return this._config.encrypted;
    }

    /**
     * Write the passed in buffer to connection
     * @param {HeapBuffer} buffer - Buffer to write
     */

  }, {
    key: 'write',
    value: function write(buffer) {
      // If there is a pending queue, push this on that queue. This means
      // we are not yet connected, so we queue things locally.
      if (this._pending !== null) {
        this._pending.push(buffer);
      } else if (buffer instanceof _buf.HeapBuffer) {
        this._ws.send(buffer._buffer);
      } else {
        throw (0, _error.newError)("Don't know how to send buffer: " + buffer);
      }
    }

    /**
     * Close the connection
     * @param {function} cb - Function to call on close.
     */

  }, {
    key: 'close',
    value: function close() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return null;
      };

      this._open = false;
      this._clearConnectionTimeout();
      this._ws.close();
      this._ws.onclose = cb;
    }

    /**
     * Set connection timeout on the given WebSocket, if configured.
     * @return {number} the timeout id or null.
     * @private
     */

  }, {
    key: '_setupConnectionTimeout',
    value: function _setupConnectionTimeout() {
      var _this = this;

      var timeout = this._config.connectionTimeout;
      if (timeout) {
        var webSocket = this._ws;

        return setTimeout(function () {
          if (webSocket.readyState !== WebSocket.OPEN) {
            _this._connectionTimeoutFired = true;
            webSocket.close();
          }
        }, timeout);
      }
      return null;
    }

    /**
     * Remove active connection timeout, if any.
     * @private
     */

  }, {
    key: '_clearConnectionTimeout',
    value: function _clearConnectionTimeout() {
      var timeoutId = this._connectionTimeoutId;
      if (timeoutId || timeoutId === 0) {
        this._connectionTimeoutFired = false;
        this._connectionTimeoutId = null;
        clearTimeout(timeoutId);
      }
    }
  }]);
  return WebSocketChannel;
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

var available = typeof WebSocket !== 'undefined';
var _websocketChannelModule = { channel: WebSocketChannel, available: available };

function createWebSocket(scheme, parsedUrl) {
  var url = scheme + '://' + parsedUrl.hostAndPort;

  try {
    return new WebSocket(url);
  } catch (error) {
    if (isIPv6AddressIssueOnWindows(error, parsedUrl)) {

      // WebSocket in IE and Edge browsers on Windows do not support regular IPv6 address syntax because they contain ':'.
      // It's an invalid character for UNC (https://en.wikipedia.org/wiki/IPv6_address#Literal_IPv6_addresses_in_UNC_path_names)
      // and Windows requires IPv6 to be changes in the following way:
      //   1) replace all ':' with '-'
      //   2) replace '%' with 's' for link-local address
      //   3) append '.ipv6-literal.net' suffix
      // only then resulting string can be considered a valid IPv6 address. Yes, this is extremely weird!
      // For more details see:
      //   https://social.msdn.microsoft.com/Forums/ie/en-US/06cca73b-63c2-4bf9-899b-b229c50449ff/whether-ie10-websocket-support-ipv6?forum=iewebdevelopment
      //   https://www.itdojo.com/ipv6-addresses-and-unc-path-names-overcoming-illegal/
      // Creation of WebSocket with unconverted address results in SyntaxError without message or stacktrace.
      // That is why here we "catch" SyntaxError and rewrite IPv6 address if needed.

      var windowsFriendlyUrl = asWindowsFriendlyIPv6Address(scheme, parsedUrl);
      return new WebSocket(windowsFriendlyUrl);
    } else {
      throw error;
    }
  }
}

function isIPv6AddressIssueOnWindows(error, parsedUrl) {
  return error.name === 'SyntaxError' && isIPv6Address(parsedUrl);
}

function isIPv6Address(parsedUrl) {
  var hostAndPort = parsedUrl.hostAndPort;
  return hostAndPort.charAt(0) === '[' && hostAndPort.indexOf(']') !== -1;
}

function asWindowsFriendlyIPv6Address(scheme, parsedUrl) {
  // replace all ':' with '-'
  var hostWithoutColons = parsedUrl.host.replace(new RegExp(':', 'g'), '-');

  // replace '%' with 's' for link-local IPv6 address like 'fe80::1%lo0'
  var hostWithoutPercent = hostWithoutColons.replace('%', 's');

  // append magic '.ipv6-literal.net' suffix
  var ipv6Host = hostWithoutPercent + '.ipv6-literal.net';

  return scheme + '://' + ipv6Host + ':' + parsedUrl.port;
}

exports.default = _websocketChannelModule;