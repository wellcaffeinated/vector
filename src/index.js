function _drawArrow(ctx, x, y, length, angle, color) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 2
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(length, 0)
  ctx.stroke()
  ctx.lineTo(length - 6, 6)
  ctx.lineTo(length - 6, -6)
  ctx.lineTo(length, 0)
  ctx.fill()
  ctx.restore()
}

class Vector {

  constructor(x = 0, y = 0) {
    if (!(this instanceof Vector)){
      return new Vector(x, y)
    }

    this.isVector = true

    if (y !== undefined){
      this.set(x, y)
    } else if (Array.isArray(x)){
      this.copyArray(x)
    } else if (typeof x === 'object'){
      this.copy(x)
    } else {
      throw new Error('Invalid value for vector constructor')
    }
  }

  static create(x, y){
    return new Vector(x, y)
  }

  static isVector(v){
    return v && v.isVector === true
  }

  get 0(){
    return this.x
  }

  get 1(){
    return this.y
  }

  hasNaN(){
    return Number.isNaN(this.x) || Number.isNaN(this.y)
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  // set this vector to have the values of another vector
  copy(v) {
    return this.set(v.x, v.y)
  }

  copyX(v){
    this.x = v.x
    return this
  }

  copyY(v){
    this.y = v.y
    return this
  }

  copyArray([x, y]){
    return this.set(x, y)
  }

  set(x, y) {
    this.x = x
    this.y = y
    return this
  }

  fixNaN(){
    if (Number.isNaN(this.x)){
      this.x = 0
    }
    if (Number.isNaN(this.y)) {
      this.y = 0
    }
    return this
  }

  invert(){
    this.x = 1 / this.x
    this.y = 1 / this.y
    return this
  }

  invertX() {
    this.x = 1 / this.x
    return this
  }

  invertY() {
    this.y = 1 / this.y
    return this
  }

  add(other) {
    this.x += other.x
    this.y += other.y
    return this
  }

  addX(other){
    this.x += other.x
    return this
  }

  addY(other){
    this.y += other.y
    return this
  }

  plus(other) {
    return this.clone().add(other)
  }

  subtract(other) {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  subtractX(other){
    this.x -= other.x
    return this
  }

  subtractY(other) {
    this.y -= other.y
    return this
  }

  minus(other) {
    return this.clone().subtract(other)
  }

  multiply(number, my) {
    this.x *= number
    this.y *= my === undefined ? number : my
    return this
  }

  times(number, my) {
    return this.clone().multiply(number, my)
  }

  divide(number, divY) {
    this.x /= number
    this.y /= divY === undefined ? number : divY
    return this
  }

  dividedBy(number, divY) {
    return this.clone().divide(number, divY)
  }

  normSq() {
    return this.x * this.x + this.y * this.y
  }

  norm() {
    return Math.sqrt(this.normSq())
  }

  setNorm(n) {
    let norm = this.norm()
    if (norm === n){
      return this
    } else if (norm === 0) {
      norm = 1
      this.x = 1
      this.y = 0
    }
    n /= norm
    this.x *= n
    this.y *= n
    return this
  }

  normalize() {
    return this.setNorm(1)
  }

  distanceSqTo(other){
    const dx = other.x - this.x
    const dy = other.y - this.y
    return dx * dx + dy * dy
  }

  distanceTo(other){
    return Math.sqrt(this.distanceSqTo(other))
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  setAngle(angle) {
    let n = this.norm()
    if (n === 0) {
      n = 1
      this.x = 1
      this.y = 0
    }
    this.x = n * Math.cos(angle)
    this.y = n * Math.sin(angle)
    return this
  }

  rotateBy(angle) {
    return this.setAngle(this.angle() + angle)
  }

  dot(vector) {
    return this.x * vector.x + this.y * vector.y
  }

  cross(vector){
    return this.x * vector.y - this.y * vector.x
  }

  projectTo(vector) {
    const other = vector.clone().normalize()
    return other.multiply(this.dot(other))
  }

  projectionScalar(vector) {
    return this.dot(vector) / vector.norm()
  }

  clampedProj(vector) {
    const n = vector.norm()
    const other = vector.clone().normalize()
    return other.multiply(Math.min(n, Math.max(0, this.dot(other))))
  }

  clampX(minX = 0, maxX = 1){
    this.x = Math.max(minX, Math.min(maxX, this.x))
    return this
  }

  clampXLower(minX = 0){
    this.x = Math.max(minX, this.x)
    return this
  }

  clampXUpper(maxX = 1) {
    this.x = Math.min(maxX, this.x)
    return this
  }

  clampY(minY = 0, maxY = 1) {
    this.y = Math.max(minY, Math.min(maxY, this.y))
    return this
  }

  clampYLower(minY = 0) {
    this.y = Math.max(minY, this.y)
    return this
  }

  clampYUpper(maxY = 1){
    this.y = Math.min(maxY, this.y)
    return this
  }

  clamp(minV = 0, maxV = 1) {
    return this
      .clampX(minV.x, maxV.x)
      .clampY(minV.y, maxV.y)
  }

  clampLower(minV = { x: 0, y: 0 }){
    return this
      .clampXLower(minV.x)
      .clampYLower(minV.y)
  }

  clampUpper(maxV = { x: 1, y: 1 }) {
    return this
      .clampXUpper(maxV.x)
      .clampYUpper(maxV.y)
  }

  clampNorm(minL = 0, maxL = 1){
    const l = this.norm()
    const clamped = Math.max(minL, Math.min(maxL, l))
    return this.setNorm(clamped)
  }

  clampNormLower(minL = 0){
    const l = this.norm()
    const clamped = Math.max(minL, l)
    return this.setNorm(clamped)
  }

  clampNormUpper(maxL = 1) {
    const l = this.norm()
    const clamped = Math.min(maxL, l)
    return this.setNorm(clamped)
  }

  clampAngle(minA = 0, maxA = 2 * Math.PI){
    const a = this.angle()
    const clamped = Math.max(minA, Math.min(maxA, a))
    if (clamped === a){
      return this
    }
    return this.setAngle(clamped)
  }

  clampAngleLower(minA = 0) {
    const a = this.angle()
    const clamped = Math.max(minA, a)
    if (clamped === a) {
      return this
    }
    return this.setAngle(clamped)
  }

  clampAngleUpper(maxA = 2 * Math.PI) {
    const a = this.angle()
    const clamped = Math.min(maxA, a)
    if (clamped === a) {
      return this
    }
    return this.setAngle(clamped)
  }

  // perform a reflection with specified normal vector to the mirror
  reflect(normal) {
    const n = normal.normSq()
    return this.subtract(normal.times((2 * this.dot(normal)) / n))
  }

  // return a new vector that is the reflection along normal
  reflection(normal) {
    return this.copy().reflect(normal)
  }

  randomize(n = 1) {
    return this.setNorm(n).setAngle(2 * Math.PI * Math.random())
  }

  round(){
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    return this
  }

  floor(){
    this.x = this.x | 0
    this.y = this.y | 0
    return this
  }

  ceil(){
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)
    return this
  }

  toString(){
    return `(${this.x}, ${this.y})`
  }

  toJSON(){
    return { x: this.x, y: this.y }
  }

  toArray(){
    return [this.x, this.y]
  }

  // Draws this vector to a canvas context
  drawTo(
    ctx,
    {
      offset = null,
      scale = 1,
      withComponents = false,
      color = 'grey',
      xcolor = 'tomato',
      ycolor = 'gold'
    } = {}
  ) {
    const angle = this.angle()
    const n = scale * this.norm()
    const ox = offset ? offset.x : 0
    const oy = offset ? offset.y : 0
    if (withComponents) {
      // _drawArrow(ctx, ox, oy + this.y * scale, scale * this.x, 0, 'red')
      // _drawArrow(ctx, ox, oy, scale * this.y, Math.PI / 2, 'yellow')
      ctx.save()
      ctx.strokeStyle = xcolor
      ctx.translate(ox, oy)
      ctx.beginPath()
      const y = scale * this.y
      ctx.moveTo(0, y)
      ctx.lineTo(scale * this.x, y)
      ctx.stroke()
      ctx.strokeStyle = ycolor
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, y)
      ctx.stroke()
      ctx.restore()
    }
    _drawArrow(ctx, ox, oy, n, angle, color)
  }
}

Vector.Zero = Vector(0, 0)
Vector.AxisX = Vector(1, 0)
Vector.AxisY = Vector(0, 1)

export default Vector
