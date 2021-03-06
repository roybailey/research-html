"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alloc = exports.NodeBuffer = exports.CombinedBuffer = exports.SliceBuffer = exports.HeapBuffer = exports.BaseBuffer = undefined;

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
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

/** This module defines a common API for dealing with binary data that
  * works for both browsers (via ArrayBuffer/DataView) and for NodeJS
  *(via Buffer API).
  */

var _node = require("buffer");
/**
  * Common base with default implementation for most buffer methods.
  * Buffers are stateful - they track a current "position", this helps greatly
  * when reading and writing from them incrementally. You can also ignore the
  * stateful read/write methods.
  * readXXX and writeXXX-methods move the inner position of the buffer.
  * putXXX and getXXX-methods do not.
  * @access private
  */

var BaseBuffer = function () {
  /**
   * Create a instance with the injected size.
   * @constructor
   * @param {Integer} size
   */
  function BaseBuffer(size) {
    (0, _classCallCheck3.default)(this, BaseBuffer);

    this.position = 0;
    this.length = size;
    // Calling these out - this is the required 
    // methods a subclass needs to implement
    var getUInt8 = null;
    var getInt8 = null;
    var getFloat64 = null;
    var getSlice = null;
    var putFloat64 = null;
    var putUInt8 = null;
    var putInt8 = null;
  }

  /**
   * @param p
   */


  (0, _createClass3.default)(BaseBuffer, [{
    key: "getInt16",
    value: function getInt16(p) {
      return this.getInt8(p) << 8 | this.getUInt8(p + 1);
    }

    /**
     * @param p
     */

  }, {
    key: "getUInt16",
    value: function getUInt16(p) {
      return this.getUInt8(p) << 8 | this.getUInt8(p + 1);
    }

    /**
     * @param p
     */

  }, {
    key: "getInt32",
    value: function getInt32(p) {
      return this.getInt8(p) << 24 | this.getUInt8(p + 1) << 16 | this.getUInt8(p + 2) << 8 | this.getUInt8(p + 3);
    }

    /**
     * @param p
     */

  }, {
    key: "getUInt32",
    value: function getUInt32(p) {
      return this.getUInt8(p) << 24 | this.getUInt8(p + 1) << 16 | this.getUInt8(p + 2) << 8 | this.getUInt8(p + 3);
    }

    /**
     * @param p
     */

  }, {
    key: "getInt64",
    value: function getInt64(p) {
      return this.getInt8(p) << 56 | this.getUInt8(p + 1) << 48 | this.getUInt8(p + 2) << 40 | this.getUInt8(p + 3) << 32 | this.getUInt8(p + 4) << 24 | this.getUInt8(p + 5) << 16 | this.getUInt8(p + 6) << 8 | this.getUInt8(p + 7);
    }

    /**
     * Get a slice of this buffer. This method does not copy any data,
     * but simply provides a slice view of this buffer
     * @param start
     * @param length
     */

  }, {
    key: "getSlice",
    value: function getSlice(start, length) {
      return new SliceBuffer(start, length, this);
    }

    /**
     * @param p
     * @param val
     */

  }, {
    key: "putInt16",
    value: function putInt16(p, val) {
      this.putInt8(p, val >> 8);
      this.putUInt8(p + 1, val & 0xFF);
    }

    /**
     * @param p
     * @param val
     */

  }, {
    key: "putUInt16",
    value: function putUInt16(p, val) {
      this.putUInt8(p, val >> 8 & 0xFF);
      this.putUInt8(p + 1, val & 0xFF);
    }

    /**
     * @param p
     * @param val
     */

  }, {
    key: "putInt32",
    value: function putInt32(p, val) {
      this.putInt8(p, val >> 24);
      this.putUInt8(p + 1, val >> 16 & 0xFF);
      this.putUInt8(p + 2, val >> 8 & 0xFF);
      this.putUInt8(p + 3, val & 0xFF);
    }

    /**
     * @param p
     * @param val
     */

  }, {
    key: "putUInt32",
    value: function putUInt32(p, val) {
      this.putUInt8(p, val >> 24 & 0xFF);
      this.putUInt8(p + 1, val >> 16 & 0xFF);
      this.putUInt8(p + 2, val >> 8 & 0xFF);
      this.putUInt8(p + 3, val & 0xFF);
    }

    /**
     * @param p
     * @param val
     */

  }, {
    key: "putInt64",
    value: function putInt64(p, val) {
      this.putInt8(p, val >> 48);
      this.putUInt8(p + 1, val >> 42 & 0xFF);
      this.putUInt8(p + 2, val >> 36 & 0xFF);
      this.putUInt8(p + 3, val >> 30 & 0xFF);
      this.putUInt8(p + 4, val >> 24 & 0xFF);
      this.putUInt8(p + 5, val >> 16 & 0xFF);
      this.putUInt8(p + 6, val >> 8 & 0xFF);
      this.putUInt8(p + 7, val & 0xFF);
    }

    /**
     * @param position
     * @param other
     */

  }, {
    key: "putBytes",
    value: function putBytes(position, other) {
      for (var i = 0, end = other.remaining(); i < end; i++) {
        this.putUInt8(position + i, other.readUInt8());
      }
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readUInt8",
    value: function readUInt8() {
      return this.getUInt8(this._updatePos(1));
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readInt8",
    value: function readInt8() {
      return this.getInt8(this._updatePos(1));
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readUInt16",
    value: function readUInt16() {
      return this.getUInt16(this._updatePos(2));
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readUInt32",
    value: function readUInt32() {
      return this.getUInt32(this._updatePos(4));
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readInt16",
    value: function readInt16() {
      return this.getInt16(this._updatePos(2));
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readInt32",
    value: function readInt32() {
      return this.getInt32(this._updatePos(4));
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readInt64",
    value: function readInt64() {
      return this.getInt32(this._updatePos(8));
    }

    /**
     * Read from state position.
     */

  }, {
    key: "readFloat64",
    value: function readFloat64() {
      return this.getFloat64(this._updatePos(8));
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeUInt8",
    value: function writeUInt8(val) {
      this.putUInt8(this._updatePos(1), val);
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeInt8",
    value: function writeInt8(val) {
      this.putInt8(this._updatePos(1), val);
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeInt16",
    value: function writeInt16(val) {
      this.putInt16(this._updatePos(2), val);
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeInt32",
    value: function writeInt32(val) {
      this.putInt32(this._updatePos(4), val);
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeUInt32",
    value: function writeUInt32(val) {
      this.putUInt32(this._updatePos(4), val);
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeInt64",
    value: function writeInt64(val) {
      this.putInt64(this._updatePos(8), val);
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeFloat64",
    value: function writeFloat64(val) {
      this.putFloat64(this._updatePos(8), val);
    }

    /**
     * Write to state position.
     * @param val
     */

  }, {
    key: "writeBytes",
    value: function writeBytes(val) {
      this.putBytes(this._updatePos(val.remaining()), val);
    }

    /**
     * Get a slice of this buffer. This method does not copy any data,
     * but simply provides a slice view of this buffer
     * @param length
     */

  }, {
    key: "readSlice",
    value: function readSlice(length) {
      return this.getSlice(this._updatePos(length), length);
    }
  }, {
    key: "_updatePos",
    value: function _updatePos(length) {
      var p = this.position;
      this.position += length;
      return p;
    }

    /**
     * Get remaning
     */

  }, {
    key: "remaining",
    value: function remaining() {
      return this.length - this.position;
    }

    /**
     * Has remaning
     */

  }, {
    key: "hasRemaining",
    value: function hasRemaining() {
      return this.remaining() > 0;
    }

    /**
     * Reset position state
     */

  }, {
    key: "reset",
    value: function reset() {
      this.position = 0;
    }

    /**
     * Get string representation of buffer and it's state.
     * @return {string} Buffer as a string
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.constructor.name + "( position=" + this.position + " )\n  " + this.toHex();
    }

    /**
     * Get string representation of buffer.
     * @return {string} Buffer as a string
     */

  }, {
    key: "toHex",
    value: function toHex() {
      // TODO something like StringBuilder?
      var out = "";
      for (var i = 0; i < this.length; i++) {
        var hexByte = this.getUInt8(i).toString(16);
        if (hexByte.length == 1) {
          hexByte = "0" + hexByte;
        }
        out += hexByte + " ";
      }
      return out;
    }
  }]);
  return BaseBuffer;
}();

/**
 * Basic buffer implementation that should work in most any modern JS env.
 * @access private
 */


var HeapBuffer = function (_BaseBuffer) {
  (0, _inherits3.default)(HeapBuffer, _BaseBuffer);

  function HeapBuffer(arg) {
    (0, _classCallCheck3.default)(this, HeapBuffer);

    var buffer = arg instanceof ArrayBuffer ? arg : new ArrayBuffer(arg);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeapBuffer.__proto__ || (0, _getPrototypeOf2.default)(HeapBuffer)).call(this, buffer.byteLength));

    _this._buffer = buffer;
    _this._view = new DataView(_this._buffer);
    return _this;
  }

  (0, _createClass3.default)(HeapBuffer, [{
    key: "putUInt8",
    value: function putUInt8(position, val) {
      this._view.setUint8(position, val);
    }
  }, {
    key: "getUInt8",
    value: function getUInt8(position) {
      return this._view.getUint8(position);
    }
  }, {
    key: "putInt8",
    value: function putInt8(position, val) {
      this._view.setInt8(position, val);
    }
  }, {
    key: "getInt8",
    value: function getInt8(position) {
      return this._view.getInt8(position);
    }
  }, {
    key: "getFloat64",
    value: function getFloat64(position) {
      return this._view.getFloat64(position);
    }
  }, {
    key: "putFloat64",
    value: function putFloat64(position, val) {
      this._view.setFloat64(position, val);
    }
  }, {
    key: "getSlice",
    value: function getSlice(start, length) {
      if (this._buffer.slice) {
        return new HeapBuffer(this._buffer.slice(start, start + length));
      } else {
        // Some platforms (eg. phantomjs) don't support slice, so fall back to a copy
        // We do this rather than return a SliceBuffer, because sliceBuffer cannot
        // be passed to native network write ops etc - we need ArrayBuffer for that
        var copy = new HeapBuffer(length);
        for (var i = 0; i < length; i++) {
          copy.putUInt8(i, this.getUInt8(i + start));
        }
        return copy;
      }
    }

    /** 
     * Specific to HeapBuffer, this gets a DataView from the
     * current position and of the specified length. 
     */

  }, {
    key: "readView",
    value: function readView(length) {
      return new DataView(this._buffer, this._updatePos(length), length);
    }
  }]);
  return HeapBuffer;
}(BaseBuffer);

/**
 * Represents a view as slice of another buffer.
 * @access private
 */


var SliceBuffer = function (_BaseBuffer2) {
  (0, _inherits3.default)(SliceBuffer, _BaseBuffer2);

  function SliceBuffer(start, length, inner) {
    (0, _classCallCheck3.default)(this, SliceBuffer);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (SliceBuffer.__proto__ || (0, _getPrototypeOf2.default)(SliceBuffer)).call(this, length));

    _this2._start = start;
    _this2._inner = inner;
    return _this2;
  }

  (0, _createClass3.default)(SliceBuffer, [{
    key: "putUInt8",
    value: function putUInt8(position, val) {
      this._inner.putUInt8(this._start + position, val);
    }
  }, {
    key: "getUInt8",
    value: function getUInt8(position) {
      return this._inner.getUInt8(this._start + position);
    }
  }, {
    key: "putInt8",
    value: function putInt8(position, val) {
      this._inner.putInt8(this._start + position, val);
    }
  }, {
    key: "putFloat64",
    value: function putFloat64(position, val) {
      this._inner.putFloat64(this._start + position, val);
    }
  }, {
    key: "getInt8",
    value: function getInt8(position) {
      return this._inner.getInt8(this._start + position);
    }
  }, {
    key: "getFloat64",
    value: function getFloat64(position) {
      return this._inner.getFloat64(this._start + position);
    }
  }]);
  return SliceBuffer;
}(BaseBuffer);

/**
 * Buffer that combines multiple buffers, exposing them as one single buffer.
 * @access private
 */


var CombinedBuffer = function (_BaseBuffer3) {
  (0, _inherits3.default)(CombinedBuffer, _BaseBuffer3);

  function CombinedBuffer(buffers) {
    (0, _classCallCheck3.default)(this, CombinedBuffer);

    var length = 0;
    for (var i = 0; i < buffers.length; i++) {
      length += buffers[i].length;
    }

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (CombinedBuffer.__proto__ || (0, _getPrototypeOf2.default)(CombinedBuffer)).call(this, length));

    _this3._buffers = buffers;
    return _this3;
  }

  (0, _createClass3.default)(CombinedBuffer, [{
    key: "getUInt8",
    value: function getUInt8(position) {
      // Surely there's a faster way to do this.. some sort of lookup table thing?
      for (var i = 0; i < this._buffers.length; i++) {
        var buffer = this._buffers[i];
        // If the position is not in the current buffer, skip the current buffer
        if (position >= buffer.length) {
          position -= buffer.length;
        } else {
          return buffer.getUInt8(position);
        }
      }
    }
  }, {
    key: "getInt8",
    value: function getInt8(position) {
      // Surely there's a faster way to do this.. some sort of lookup table thing?
      for (var i = 0; i < this._buffers.length; i++) {
        var buffer = this._buffers[i];
        // If the position is not in the current buffer, skip the current buffer
        if (position >= buffer.length) {
          position -= buffer.length;
        } else {
          return buffer.getInt8(position);
        }
      }
    }
  }, {
    key: "getFloat64",
    value: function getFloat64(position) {
      // At some point, a more efficient impl. For now, we copy the 8 bytes
      // we want to read and depend on the platform impl of IEEE 754.
      var b = alloc(8);
      for (var i = 0; i < 8; i++) {
        b.putUInt8(i, this.getUInt8(position + i));
      };
      return b.getFloat64(0);
    }
  }]);
  return CombinedBuffer;
}(BaseBuffer);

/**
 * Buffer used in a Node.js environment
 * @access private
 */


var NodeBuffer = function (_BaseBuffer4) {
  (0, _inherits3.default)(NodeBuffer, _BaseBuffer4);

  function NodeBuffer(arg) {
    (0, _classCallCheck3.default)(this, NodeBuffer);

    var buffer = arg instanceof _node.Buffer ? arg : new _node.Buffer(arg);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (NodeBuffer.__proto__ || (0, _getPrototypeOf2.default)(NodeBuffer)).call(this, buffer.length));

    _this4._buffer = buffer;
    return _this4;
  }

  (0, _createClass3.default)(NodeBuffer, [{
    key: "getUInt8",
    value: function getUInt8(position) {
      return this._buffer.readUInt8(position);
    }
  }, {
    key: "getInt8",
    value: function getInt8(position) {
      return this._buffer.readInt8(position);
    }
  }, {
    key: "getFloat64",
    value: function getFloat64(position) {
      return this._buffer.readDoubleBE(position);
    }
  }, {
    key: "putUInt8",
    value: function putUInt8(position, val) {
      this._buffer.writeUInt8(val, position);
    }
  }, {
    key: "putInt8",
    value: function putInt8(position, val) {
      this._buffer.writeInt8(val, position);
    }
  }, {
    key: "putFloat64",
    value: function putFloat64(position, val) {
      this._buffer.writeDoubleBE(val, position);
    }
  }, {
    key: "putBytes",
    value: function putBytes(position, val) {
      if (val instanceof NodeBuffer) {
        var bytesToCopy = Math.min(val.length - val.position, this.length - position);
        val._buffer.copy(this._buffer, position, val.position, val.position + bytesToCopy);
        val.position += bytesToCopy;
      } else {
        (0, _get3.default)(NodeBuffer.prototype.__proto__ || (0, _getPrototypeOf2.default)(NodeBuffer.prototype), "putBytes", this).call(this, position, val);
      }
    }
  }, {
    key: "getSlice",
    value: function getSlice(start, length) {
      return new NodeBuffer(this._buffer.slice(start, start + length));
    }
  }]);
  return NodeBuffer;
}(BaseBuffer);

// Use HeapBuffer by default, unless Buffer API is available, see below


var _DefaultBuffer = HeapBuffer;
try {
  // This will throw an exception if we're not running on NodeJS or equivalent
  require.resolve("buffer");
  _DefaultBuffer = NodeBuffer;
} catch (e) {}

/**
 * Allocate a new buffer using whatever mechanism is most sensible for the
 * current platform
 * @access private
 * @param {Integer} size
 * @return new buffer
 */
function alloc(size) {
  return new _DefaultBuffer(size);
}

exports.BaseBuffer = BaseBuffer;
exports.HeapBuffer = HeapBuffer;
exports.SliceBuffer = SliceBuffer;
exports.CombinedBuffer = CombinedBuffer;
exports.NodeBuffer = NodeBuffer;
exports.alloc = alloc;