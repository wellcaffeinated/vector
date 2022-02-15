/**
 * vector 0.0.2
 * @license GPL-3.0
 * Copyright 2022-present Jasper Palfree
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vector = factory());
})(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _drawArrow(ctx, x, y, length, angle, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.lineTo(length - 6, 6);
    ctx.lineTo(length - 6, -6);
    ctx.lineTo(length, 0);
    ctx.fill();
    ctx.restore();
  }

  var Vector = /*#__PURE__*/function () {
    function Vector(x, y) {
      if (x === void 0) {
        x = 0;
      }

      if (y === void 0) {
        y = 0;
      }

      if (!(this instanceof Vector)) {
        return new Vector(x, y);
      }

      this.isVector = true;

      if (y !== undefined) {
        this.set(x, y);
      } else if (Array.isArray(x)) {
        this.copyArray(x);
      } else if (typeof x === 'object') {
        this.copy(x);
      } else {
        throw new Error('Invalid value for vector constructor');
      }
    }

    Vector.create = function create(x, y) {
      return new Vector(x, y);
    };

    Vector.isVector = function isVector(v) {
      return v && v.isVector === true;
    };

    var _proto = Vector.prototype;

    _proto.hasNaN = function hasNaN() {
      return Number.isNaN(this.x) || Number.isNaN(this.y);
    };

    _proto.clone = function clone() {
      return new Vector(this.x, this.y);
    } // set this vector to have the values of another vector
    ;

    _proto.copy = function copy(v) {
      return this.set(v.x, v.y);
    };

    _proto.copyX = function copyX(v) {
      this.x = v.x;
      return this;
    };

    _proto.copyY = function copyY(v) {
      this.y = v.y;
      return this;
    };

    _proto.copyArray = function copyArray(_ref) {
      var x = _ref[0],
          y = _ref[1];
      return this.set(x, y);
    };

    _proto.set = function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    };

    _proto.fixNaN = function fixNaN() {
      if (Number.isNaN(this.x)) {
        this.x = 0;
      }

      if (Number.isNaN(this.y)) {
        this.y = 0;
      }

      return this;
    };

    _proto.invert = function invert() {
      this.x = 1 / this.x;
      this.y = 1 / this.y;
      return this;
    };

    _proto.invertX = function invertX() {
      this.x = 1 / this.x;
      return this;
    };

    _proto.invertY = function invertY() {
      this.y = 1 / this.y;
      return this;
    };

    _proto.add = function add(other) {
      this.x += other.x;
      this.y += other.y;
      return this;
    };

    _proto.addX = function addX(other) {
      this.x += other.x;
      return this;
    };

    _proto.addY = function addY(other) {
      this.y += other.y;
      return this;
    };

    _proto.plus = function plus(other) {
      return this.clone().add(other);
    };

    _proto.subtract = function subtract(other) {
      this.x -= other.x;
      this.y -= other.y;
      return this;
    };

    _proto.subtractX = function subtractX(other) {
      this.x -= other.x;
      return this;
    };

    _proto.subtractY = function subtractY(other) {
      this.y -= other.y;
      return this;
    };

    _proto.minus = function minus(other) {
      return this.clone().subtract(other);
    };

    _proto.multiply = function multiply(number, my) {
      this.x *= number;
      this.y *= my === undefined ? number : my;
      return this;
    };

    _proto.times = function times(number, my) {
      return this.clone().multiply(number, my);
    };

    _proto.divide = function divide(number, divY) {
      this.x /= number;
      this.y /= divY === undefined ? number : divY;
      return this;
    };

    _proto.dividedBy = function dividedBy(number, divY) {
      return this.clone().divide(number, divY);
    };

    _proto.normSq = function normSq() {
      return this.x * this.x + this.y * this.y;
    };

    _proto.norm = function norm() {
      return Math.sqrt(this.normSq());
    };

    _proto.setNorm = function setNorm(n) {
      var norm = this.norm();

      if (norm === n) {
        return this;
      } else if (norm === 0) {
        norm = 1;
        this.x = 1;
        this.y = 0;
      }

      n /= norm;
      this.x *= n;
      this.y *= n;
      return this;
    };

    _proto.normalize = function normalize() {
      return this.setNorm(1);
    };

    _proto.distanceSqTo = function distanceSqTo(other) {
      var dx = other.x - this.x;
      var dy = other.y - this.y;
      return dx * dx + dy * dy;
    };

    _proto.distanceTo = function distanceTo(other) {
      return Math.sqrt(this.distanceSqTo(other));
    };

    _proto.angle = function angle() {
      return Math.atan2(this.y, this.x);
    };

    _proto.setAngle = function setAngle(angle) {
      var n = this.norm();

      if (n === 0) {
        n = 1;
        this.x = 1;
        this.y = 0;
      }

      this.x = n * Math.cos(angle);
      this.y = n * Math.sin(angle);
      return this;
    };

    _proto.rotateBy = function rotateBy(angle) {
      return this.setAngle(this.angle() + angle);
    };

    _proto.dot = function dot(vector) {
      return this.x * vector.x + this.y * vector.y;
    };

    _proto.cross = function cross(vector) {
      return this.x * vector.y - this.y * vector.x;
    };

    _proto.projectTo = function projectTo(vector) {
      var m = this.dot(vector);
      return this.copy(vector).setNorm(m);
    };

    _proto.projection = function projection(vector) {
      var other = vector.clone().normalize();
      return other.multiply(this.dot(other));
    };

    _proto.projectToClamped = function projectToClamped(vector) {
      return this.projectTo(vector).clampNormUpper(vector.norm());
    };

    _proto.projectionScalar = function projectionScalar(vector) {
      return this.dot(vector) / vector.norm();
    };

    _proto.projectionClamped = function projectionClamped(vector) {
      var n = vector.norm();
      var other = vector.clone().normalize();
      return other.multiply(Math.min(n, Math.max(0, this.dot(other))));
    };

    _proto.clampX = function clampX(minX, maxX) {
      if (minX === void 0) {
        minX = 0;
      }

      if (maxX === void 0) {
        maxX = 1;
      }

      this.x = Math.max(minX, Math.min(maxX, this.x));
      return this;
    };

    _proto.clampXLower = function clampXLower(minX) {
      if (minX === void 0) {
        minX = 0;
      }

      this.x = Math.max(minX, this.x);
      return this;
    };

    _proto.clampXUpper = function clampXUpper(maxX) {
      if (maxX === void 0) {
        maxX = 1;
      }

      this.x = Math.min(maxX, this.x);
      return this;
    };

    _proto.clampY = function clampY(minY, maxY) {
      if (minY === void 0) {
        minY = 0;
      }

      if (maxY === void 0) {
        maxY = 1;
      }

      this.y = Math.max(minY, Math.min(maxY, this.y));
      return this;
    };

    _proto.clampYLower = function clampYLower(minY) {
      if (minY === void 0) {
        minY = 0;
      }

      this.y = Math.max(minY, this.y);
      return this;
    };

    _proto.clampYUpper = function clampYUpper(maxY) {
      if (maxY === void 0) {
        maxY = 1;
      }

      this.y = Math.min(maxY, this.y);
      return this;
    };

    _proto.clamp = function clamp(minV, maxV) {
      if (minV === void 0) {
        minV = 0;
      }

      if (maxV === void 0) {
        maxV = 1;
      }

      return this.clampX(minV.x, maxV.x).clampY(minV.y, maxV.y);
    };

    _proto.clampLower = function clampLower(minV) {
      if (minV === void 0) {
        minV = {
          x: 0,
          y: 0
        };
      }

      return this.clampXLower(minV.x).clampYLower(minV.y);
    };

    _proto.clampUpper = function clampUpper(maxV) {
      if (maxV === void 0) {
        maxV = {
          x: 1,
          y: 1
        };
      }

      return this.clampXUpper(maxV.x).clampYUpper(maxV.y);
    };

    _proto.clampNorm = function clampNorm(minL, maxL) {
      if (minL === void 0) {
        minL = 0;
      }

      if (maxL === void 0) {
        maxL = 1;
      }

      var l = this.norm();
      var clamped = Math.max(minL, Math.min(maxL, l));
      return this.setNorm(clamped);
    };

    _proto.clampNormLower = function clampNormLower(minL) {
      if (minL === void 0) {
        minL = 0;
      }

      var l = this.norm();
      var clamped = Math.max(minL, l);
      return this.setNorm(clamped);
    };

    _proto.clampNormUpper = function clampNormUpper(maxL) {
      if (maxL === void 0) {
        maxL = 1;
      }

      var l = this.norm();
      var clamped = Math.min(maxL, l);
      return this.setNorm(clamped);
    };

    _proto.clampAngle = function clampAngle(minA, maxA) {
      if (minA === void 0) {
        minA = 0;
      }

      if (maxA === void 0) {
        maxA = 2 * Math.PI;
      }

      var a = this.angle();
      var clamped = Math.max(minA, Math.min(maxA, a));

      if (clamped === a) {
        return this;
      }

      return this.setAngle(clamped);
    };

    _proto.clampAngleLower = function clampAngleLower(minA) {
      if (minA === void 0) {
        minA = 0;
      }

      var a = this.angle();
      var clamped = Math.max(minA, a);

      if (clamped === a) {
        return this;
      }

      return this.setAngle(clamped);
    };

    _proto.clampAngleUpper = function clampAngleUpper(maxA) {
      if (maxA === void 0) {
        maxA = 2 * Math.PI;
      }

      var a = this.angle();
      var clamped = Math.min(maxA, a);

      if (clamped === a) {
        return this;
      }

      return this.setAngle(clamped);
    } // perform a reflection with specified normal vector to the mirror
    ;

    _proto.reflect = function reflect(normal) {
      var n = normal.normSq();
      return this.subtract(normal.times(2 * this.dot(normal) / n));
    } // return a new vector that is the reflection along normal
    ;

    _proto.reflection = function reflection(normal) {
      return this.copy().reflect(normal);
    };

    _proto.randomize = function randomize(n) {
      if (n === void 0) {
        n = 1;
      }

      return this.setNorm(n).setAngle(2 * Math.PI * Math.random());
    };

    _proto.round = function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
    };

    _proto.floor = function floor() {
      this.x = this.x | 0;
      this.y = this.y | 0;
      return this;
    };

    _proto.ceil = function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
    };

    _proto.toString = function toString() {
      return "(" + this.x + ", " + this.y + ")";
    };

    _proto.toJSON = function toJSON() {
      return {
        x: this.x,
        y: this.y
      };
    };

    _proto.toArray = function toArray() {
      return [this.x, this.y];
    } // Draws this vector to a canvas context
    ;

    _proto.drawTo = function drawTo(ctx, _temp) {
      var _ref2 = _temp === void 0 ? {} : _temp,
          _ref2$offset = _ref2.offset,
          offset = _ref2$offset === void 0 ? null : _ref2$offset,
          _ref2$scale = _ref2.scale,
          scale = _ref2$scale === void 0 ? 1 : _ref2$scale,
          _ref2$withComponents = _ref2.withComponents,
          withComponents = _ref2$withComponents === void 0 ? false : _ref2$withComponents,
          _ref2$color = _ref2.color,
          color = _ref2$color === void 0 ? 'grey' : _ref2$color,
          _ref2$xcolor = _ref2.xcolor,
          xcolor = _ref2$xcolor === void 0 ? 'tomato' : _ref2$xcolor,
          _ref2$ycolor = _ref2.ycolor,
          ycolor = _ref2$ycolor === void 0 ? 'gold' : _ref2$ycolor;

      var angle = this.angle();
      var n = scale * this.norm();
      var ox = offset ? offset.x : 0;
      var oy = offset ? offset.y : 0;

      if (withComponents) {
        // _drawArrow(ctx, ox, oy + this.y * scale, scale * this.x, 0, 'red')
        // _drawArrow(ctx, ox, oy, scale * this.y, Math.PI / 2, 'yellow')
        ctx.save();
        ctx.strokeStyle = xcolor;
        ctx.translate(ox, oy);
        ctx.beginPath();
        var y = scale * this.y;
        ctx.moveTo(0, y);
        ctx.lineTo(scale * this.x, y);
        ctx.stroke();
        ctx.strokeStyle = ycolor;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, y);
        ctx.stroke();
        ctx.restore();
      }

      _drawArrow(ctx, ox, oy, n, angle, color);
    };

    _createClass(Vector, [{
      key: "0",
      get: function get() {
        return this.x;
      }
    }, {
      key: "1",
      get: function get() {
        return this.y;
      }
    }]);

    return Vector;
  }();

  Vector.Zero = Vector(0, 0);
  Vector.AxisX = Vector(1, 0);
  Vector.AxisY = Vector(0, 1);

  return Vector;

}));
