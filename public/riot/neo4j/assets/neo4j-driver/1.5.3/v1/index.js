'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.session = exports.types = exports.auth = exports.Neo4jError = exports.integer = exports.isInt = exports.int = exports.driver = undefined;

var _integer = require('./integer');

var _graphTypes = require('./graph-types');

var _error = require('./error');

var _result = require('./result');

var _result2 = _interopRequireDefault(_result);

var _resultSummary = require('./result-summary');

var _resultSummary2 = _interopRequireDefault(_resultSummary);

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _driver = require('./driver');

var _routingDriver = require('./routing-driver');

var _routingDriver2 = _interopRequireDefault(_routingDriver);

var _version = require('../version');

var _version2 = _interopRequireDefault(_version);

var _util = require('./internal/util');

var _urlUtil = require('./internal/url-util');

var _urlUtil2 = _interopRequireDefault(_urlUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @property {function(username: string, password: string, realm: ?string)} basic the function to create a
 * basic authentication token.
 * @property {function(base64EncodedTicket: string)} kerberos the function to create a Kerberos authentication token.
 * Accepts a single string argument - base64 encoded Kerberos ticket.
 * @property {function(principal: string, credentials: string, realm: string, scheme: string, parameters: ?object)} custom
 * the function to create a custom authentication token.
 */
var auth = {
  basic: function basic(username, password) {
    var realm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    if (realm) {
      return { scheme: 'basic', principal: username, credentials: password, realm: realm };
    } else {
      return { scheme: 'basic', principal: username, credentials: password };
    }
  },
  kerberos: function kerberos(base64EncodedTicket) {
    return {
      scheme: 'kerberos',
      principal: '', // This empty string is required for backwards compatibility.
      credentials: base64EncodedTicket
    };
  },
  custom: function custom(principal, credentials, realm, scheme) {
    var parameters = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

    if (parameters) {
      return {
        scheme: scheme, principal: principal, credentials: credentials, realm: realm,
        parameters: parameters
      };
    } else {
      return { scheme: scheme, principal: principal, credentials: credentials, realm: realm };
    }
  }
}; /**
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

var USER_AGENT = "neo4j-javascript/" + _version2.default;

/**
 * Construct a new Neo4j Driver. This is your main entry point for this
 * library.
 *
 * ## Configuration
 *
 * This function optionally takes a configuration argument. Available configuration
 * options are as follows:
 *
 *     {
 *       // Encryption level: ENCRYPTION_ON or ENCRYPTION_OFF.
 *       encrypted: ENCRYPTION_ON|ENCRYPTION_OFF
 *
 *       // Trust strategy to use if encryption is enabled. There is no mode to disable
 *       // trust other than disabling encryption altogether. The reason for
 *       // this is that if you don't know who you are talking to, it is easy for an
 *       // attacker to hijack your encrypted connection, rendering encryption pointless.
 *       //
 *       // TRUST_ALL_CERTIFICATES is the default choice for NodeJS deployments. It only requires
 *       // new host to provide a certificate and does no verification of the provided certificate.
 *       //
 *       // TRUST_ON_FIRST_USE is available for modern NodeJS deployments, and works
 *       // similarly to how `ssl` works - the first time we connect to a new host,
 *       // we remember the certificate they use. If the certificate ever changes, we
 *       // assume it is an attempt to hijack the connection and require manual intervention.
 *       // This means that by default, connections "just work" while still giving you
 *       // good encrypted protection.
 *       //
 *       // TRUST_CUSTOM_CA_SIGNED_CERTIFICATES is the classic approach to trust verification -
 *       // whenever we establish an encrypted connection, we ensure the host is using
 *       // an encryption certificate that is in, or is signed by, a certificate listed
 *       // as trusted. In the web bundle, this list of trusted certificates is maintained
 *       // by the web browser. In NodeJS, you configure the list with the next config option.
 *       //
 *       // TRUST_SYSTEM_CA_SIGNED_CERTIFICATES means that you trust whatever certificates
 *       // are in the default certificate chain of th
 *       trust: "TRUST_ALL_CERTIFICATES" | "TRUST_ON_FIRST_USE" | "TRUST_SIGNED_CERTIFICATES" |
 *       "TRUST_CUSTOM_CA_SIGNED_CERTIFICATES" | "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
 *
 *       // List of one or more paths to trusted encryption certificates. This only
 *       // works in the NodeJS bundle, and only matters if you use "TRUST_CUSTOM_CA_SIGNED_CERTIFICATES".
 *       // The certificate files should be in regular X.509 PEM format.
 *       // For instance, ['./trusted.pem']
 *       trustedCertificates: [],
 *
 *       // Path to a file where the driver saves hosts it has seen in the past, this is
 *       // very similar to the ssl tool's known_hosts file. Each time we connect to a
 *       // new host, a hash of their certificate is stored along with the domain name and
 *       // port, and this is then used to verify the host certificate does not change.
 *       // This setting has no effect unless TRUST_ON_FIRST_USE is enabled.
 *       knownHosts:"~/.neo4j/known_hosts",
 *
 *       // The max number of connections that are allowed idle in the pool at any time.
 *       // Connection will be destroyed if this threshold is exceeded.
 *       // <b>Deprecated:</b> please use <code>maxConnectionPoolSize</code> instead.
 *       connectionPoolSize: 100,
 *
 *       // The maximum total number of connections allowed to be managed by the connection pool, per host.
 *       // This includes both in-use and idle connections. No maximum connection pool size is imposed
 *       // by default.
 *       maxConnectionPoolSize: 100,
 *
 *       // The maximum allowed lifetime for a pooled connection in milliseconds. Pooled connections older than this
 *       // threshold will be closed and removed from the pool. Such discarding happens during connection acquisition
 *       // so that new session is never backed by an old connection. Setting this option to a low value will cause
 *       // a high connection churn and might result in a performance hit. It is recommended to set maximum lifetime
 *       // to a slightly smaller value than the one configured in network equipment (load balancer, proxy, firewall,
 *       // etc. can also limit maximum connection lifetime). No maximum lifetime limit is imposed by default. Zero
 *       // and negative values result in lifetime not being checked.
 *       maxConnectionLifetime: 60 * 60 * 1000, // 1 hour
 *
 *       // The maximum amount of time to wait to acquire a connection from the pool (to either create a new
 *       // connection or borrow an existing one.
 *       connectionAcquisitionTimeout: 60000, // 1 minute
 *
 *       // Specify the maximum time in milliseconds transactions are allowed to retry via
 *       // <code>Session#readTransaction()</code> and <code>Session#writeTransaction()</code> functions.
 *       // These functions will retry the given unit of work on `ServiceUnavailable`, `SessionExpired` and transient
 *       // errors with exponential backoff using initial delay of 1 second.
 *       // Default value is 30000 which is 30 seconds.
 *       maxTransactionRetryTime: 30000, // 30 seconds
 *
 *       // Provide an alternative load balancing strategy for the routing driver to use.
 *       // Driver uses "least_connected" by default.
 *       // <b>Note:</b> We are experimenting with different strategies. This could be removed in the next minor
 *       // version.
 *       loadBalancingStrategy: "least_connected" | "round_robin",
 *
 *       // Specify socket connection timeout in milliseconds. Numeric values are expected. Negative and zero values
 *       // result in no timeout being applied. Connection establishment will be then bound by the timeout configured
 *       // on the operating system level. Default value is 5000, which is 5 seconds.
 *       connectionTimeout: 5000, // 5 seconds
 *     }
 *
 * @param {string} url The URL for the Neo4j database, for instance "bolt://localhost"
 * @param {Map<String,String>} authToken Authentication credentials. See {@link auth} for helpers.
 * @param {Object} config Configuration object. See the configuration section above for details.
 * @returns {Driver}
 */
function driver(url, authToken) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  (0, _util.assertString)(url, 'Bolt URL');
  var parsedUrl = _urlUtil2.default.parseBoltUrl(url);
  if (parsedUrl.scheme === 'bolt+routing') {
    return new _routingDriver2.default(parsedUrl.hostAndPort, parsedUrl.query, USER_AGENT, authToken, config);
  } else if (parsedUrl.scheme === 'bolt') {
    if (!(0, _util.isEmptyObjectOrNull)(parsedUrl.query)) {
      throw new Error('Parameters are not supported with scheme \'bolt\'. Given URL: \'' + url + '\'');
    }
    return new _driver.Driver(parsedUrl.hostAndPort, USER_AGENT, authToken, config);
  } else {
    throw new Error('Unknown scheme: ' + parsedUrl.scheme);
  }
}

/**
 * Object containing constructors for all graph types.
 */
var types = {
  Node: _graphTypes.Node,
  Relationship: _graphTypes.Relationship,
  UnboundRelationship: _graphTypes.UnboundRelationship,
  PathSegment: _graphTypes.PathSegment,
  Path: _graphTypes.Path,
  Result: _result2.default,
  ResultSummary: _resultSummary2.default,
  Record: _record2.default
};

/**
 * Object containing string constants representing session access modes.
 */
var session = {
  READ: _driver.READ,
  WRITE: _driver.WRITE
};

/**
 * Object containing string constants representing predefined {@link Neo4jError} codes.
 */
var error = {
  SERVICE_UNAVAILABLE: _error.SERVICE_UNAVAILABLE,
  SESSION_EXPIRED: _error.SESSION_EXPIRED,
  PROTOCOL_ERROR: _error.PROTOCOL_ERROR
};

/**
 * Object containing functions for work with {@link Integer} objects.
 */
var integer = {
  toNumber: _integer.toNumber,
  toString: _integer.toString,
  inSafeRange: _integer.inSafeRange
};

/**
 * @private
 */
var forExport = {
  driver: driver,
  int: _integer.int,
  isInt: _integer.isInt,
  integer: integer,
  Neo4jError: _error.Neo4jError,
  auth: auth,
  types: types,
  session: session,
  error: error
};

exports.driver = driver;
exports.int = _integer.int;
exports.isInt = _integer.isInt;
exports.integer = integer;
exports.Neo4jError = _error.Neo4jError;
exports.auth = auth;
exports.types = types;
exports.session = session;
exports.error = error;
exports.default = forExport;