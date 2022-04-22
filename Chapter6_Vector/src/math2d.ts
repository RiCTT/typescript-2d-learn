const EPSILON: number = 0.00001;
const PiBy180: number = 0.017453292519943295;

export class vec2 {
  // 为什么是float32array
  public values: Float32Array;

  public constructor(x: number = 0, y: number = 0) {
    this.values = new Float32Array([x, y])
  }

  public toString(): string {
    return "[" + this.values[0] + "," + this.values[1] + "]"
  }

  get x(): number { return this.values[0] }
  public set x(x: number) { this.values[0] = x; }

  get y(): number { return this.values[1] }
  public set y(y: number) { this.values[1] = y; }

  public reset(x: number = 0, y: number): vec2 {
    this.values[0] = x
    this.values[1] = y
    return this
  }

  public equals(vector: vec2): boolean {
    if (Math.abs(this.values[0] - vector.values[0]) > EPSILON) {
      return false
    }
    if (Math.abs(this.values[1] - vector.values[1]) > EPSILON) {
      return false
    }
    return true
  }

  public negative(): vec2 {
    this.values[0] = -this.values[0]
    this.values[1] = -this.values[1]
    return this
  }

  public squaredLength(): number {
    return (this.x * this.x + this.y * this.y)
  }

  public get length(): number {
    return Math.sqrt(this.squaredLength())
  }

  public normalize(): number {
    let len: number = this.length
    if (Math2D.isEquals(len, 0)) {
      this.values[0] = 0
      this.values[1] = 0
      return 0
    }
    if (Math2D.isEquals(len, 1)) {
      return 1.0
    }
    this.values[0] /= len
    this.values[1] /= len

    return len
  }

  public static create(x: number = 0, y: number = 0): vec2 {
    return new vec2(x, y)
  }

  public add(right: vec2): vec2 {
    return vec2.sum(this, right, this)
  }

  public static sum(left: vec2, right: vec2, result: vec2 | null = null): vec2 {
    if (!result) result = new vec2()
    result.values[0] = left.values[0] + right.values[0]
    result.values[1] = left.values[1] + right.values[1]
    return result
  }

  public substract(another: vec2): vec2 {
    return vec2.difference(this, another, this)
  }

  public static difference(end: vec2, start: vec2, result: vec2 | null = null): vec2 {
    if (!result) result = new vec2()
    result.values[0] = end.values[0] - start.values[0]
    result.values[1] = end.values[1] - start.values[1]
    return result
  }

  public static copy(src: vec2, result: vec2 | null = null): vec2 {
    if (result === null) result = new vec2();
    result.values[0] = src.values[0];
    result.values[1] = src.values[1];
    return result;
  }

  public static scale(direction: vec2, scalar: number, result: vec2 | null = null): vec2 {
    if (result === null) result = new vec2();
    result.values[0] = direction.values[0] * scalar;
    result.values[1] = direction.values[1] * scalar;
    return result;
  }

  // 先放大direction，再将放大的driection和start做加法运算
  public static scaleAdd(start: vec2, direction: vec2, scalar: number, result: vec2 | null = null): vec2 {
    if (result === null) result = new vec2();
    vec2.scale(direction, scalar, result);
    return vec2.sum(start, result, result);
  }

  public static moveToawrds(start: vec2, direction: vec2, scalar: number, result: vec2 | null = null): vec2 {
    if (result === null) {
      result = new vec2()
    }
    vec2.scale(direction, scalar, result)
    return vec2.sum(start, result, result)
  }

  public innerProduct(right: vec2): number {
    return vec2.dotProduct(this, right)
  }

  // 点积，内积反映两个向量的夹角关系
  // - 结果 > 0，说明两个向量同方向，夹角在0，90，
  // - 结果 = 0，说明两个向量垂直
  // - 结果 < 0，夹角在90-180
  public static dotProduct(left: vec2, right: vec2): number {
    return left.x * right.x + left.y * right.y
  }

  // 不太懂
  public static crossProduct(left: vec2, right: vec2): number {
    return left.x * right.y - left.y * right.x
  }

  public static getOrientation(from: vec2, to: vec2, isRadian: boolean = false): number {
    let diff: vec2 = vec2.difference(to, from)
    let radian = Math.atan2(diff.y, diff.x)
    if (isRadian === false) {
      radian = Math2D.toDegree(radian);
    }
    return radian
  }

  public static getAngle(a: vec2, b: vec2, isRadian: boolean = false): number {
    let dot: number = vec2.dotProduct(a, b);
    let radian: number = Math.acos(dot / (a.length * b.length));
    if (isRadian === false) {
      radian = Math2D.toDegree(radian);
    }
    return radian;
  }

  public static cosAngle(a: vec2, b: vec2, norm: boolean = false): number {
    if (norm === true) {
      a.normalize();
      b.normalize();
    }
    return vec2.dotProduct(a, b);
  }

  public static sinAngle(a: vec2, b: vec2, norm: boolean = false): number {
    if (norm === true) {
      a.normalize();
      b.normalize();
    }
    return (a.x * b.y - b.x * a.y);
  }

  public static zero = new vec2(0, 0)
  public static xAxis = new vec2(1, 0)
  public static yAxis = new vec2(0, 1)
  public static nXAxis = new vec2(-1, 0)
  public static nYAxis = new vec2(0, -1)
  public static temp = new vec2(0, 0)
  public static temp1 = new vec2(0, 0)
}

export class Size {
  public values: Float32Array;

  public constructor(w: number = 1, h: number = 1) {
    this.values = new Float32Array([w, h])
  }
  set width(value: number) { this.values[0] = value; }
  get width(): number { return this.values[0]; }

  set height(value: number) { this.values[1] = value; }
  get height(): number { return this.values[1]; }

  public static create(w: number = 1, h: number = 1): Size {
    return new Size(w, h);
  }
}

export class Rectangle {
  public origin: vec2;
  public size: Size;

  public constructor(orign: vec2 = new vec2(), size: Size = new Size(1, 1)) {
    this.origin = orign;
    this.size = size;
  }

  public isEmpty(): boolean {
    let area: number = this.size.width * this.size.height;
    if (Math2D.isEquals(area, 0) === true) {
      return true;
    } else {
      return false;
    }
  }

  public static create(x: number = 0, y: number = 0, w: number = 1, h: number = 1): Rectangle {
    let origin: vec2 = new vec2(x, y);
    let size: Size = new Size(w, h);
    return new Rectangle(origin, size);
  }
}

export class Math2D {
  // 转换成弧度
  public static toRadian(degree: number): number {
    return degree * PiBy180;
  }

  // 转换成角度
  public static toDegree(radian: number): number {
    return radian / PiBy180;
  }
  public static isEquals(left: number, right: number, espilon: number = EPSILON): boolean {
    if (Math.abs(left - right) >= espilon) {
      return false;
    }
    return true;
  }
}

export class mat2d {
  public values: Float32Array;

  public constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, x: number = 0, y: number = 0) {
    this.values = new Float32Array([a, b, c, d, x, y]);
  }

  public identity(): void {
    this.values[0] = 1.0;
    this.values[1] = 0.0;
    this.values[2] = 0.0;
    this.values[3] = 1.0;
    this.values[4] = 0.0;
    this.values[5] = 0.0;
  }

  public static create(a: number = 1, b: number = 0, c: number = 0, d: number = 1, x: number = 0, y: number = 0): mat2d {
    return new mat2d(a, b, c, d, x, y);
  }

  public get xAxis(): vec2 {
    return vec2.create(this.values[0], this.values[1]);
  }

  public get yAxis(): vec2 {
    return vec2.create(this.values[2], this.values[3]);
  }

  public get origin(): vec2 {
    return vec2.create(this.values[4], this.values[5])
  }

  public getAngle(isRadian: boolean = false): number {
    let angle: number = Math.atan2(this.values[1], this.values[0]);
    if (isRadian) {
      return angle;
    }
    return angle / PiBy180;
  }

  public static copy(src: mat2d, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();
    result.values[0] = src.values[0];
    result.values[1] = src.values[1];
    result.values[2] = src.values[2];
    result.values[3] = src.values[3];
    result.values[4] = src.values[4];
    result.values[5] = src.values[5];
    return result;
  }


  public static multiply(left: mat2d, right: mat2d, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();

    let a0: number = left.values[0];
    let a1: number = left.values[1];
    let a2: number = left.values[2];
    let a3: number = left.values[3];
    let a4: number = left.values[4];
    let a5: number = left.values[5];

    let b0: number = right.values[0];
    let b1: number = right.values[1];
    let b2: number = right.values[2];
    let b3: number = right.values[3];
    let b4: number = right.values[4];
    let b5: number = right.values[5];

    result.values[0] = a0 * b0 + a2 * b1;
    result.values[1] = a1 * b0 + a3 * b1;
    result.values[2] = a0 * b2 + a2 * b3;
    result.values[3] = a1 * b2 + a3 * b3;
    result.values[4] = a0 * b4 + a2 * b5 + a4;
    result.values[5] = a1 * b4 + a3 * b5 + a5;

    return result;
  }

  public static determinant(mat: mat2d): number {
    return mat.values[0] * mat.values[3] - mat.values[2] * mat.values[1];
  }

  public static invert(src: mat2d, result: mat2d): boolean {
    let det: number = mat2d.determinant(src);

    if (Math2D.isEquals(det, 0)) {
      return false;
    }

    det = 1.0 / det;

    result.values[0] = src.values[3] * det;
    result.values[1] = - src.values[1] * det;
    result.values[2] = - src.values[2] * det;
    result.values[3] = src.values[0] * det;
    result.values[4] = (src.values[2] * src.values[5] - src.values[3] * src.values[4]) * det;
    result.values[5] = (src.values[1] * src.values[4] - src.values[0] * src.values[5]) * det;
    return true;
  }

  public static makeRotation(radians: number, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();
    let s: number = Math.sin(radians), c: number = Math.cos(radians);
    result.values[0] = c;
    result.values[1] = s;
    result.values[2] = -s;
    result.values[3] = c;
    result.values[4] = 0;
    result.values[5] = 0;
    return result;
  }

  public onlyRotationMatrixInvert(): mat2d {
    let s: number = this.values[1];
    this.values[1] = this.values[2];
    this.values[2] = s;
    return this;
  }

  public static makeRotationFromVectors(v1: vec2, v2: vec2, norm: boolean = false, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();
    result.values[0] = vec2.cosAngle(v1, v2, norm);
    result.values[1] = vec2.sinAngle(v1, v2, norm);
    result.values[2] = - vec2.sinAngle(v1, v2, norm);
    result.values[3] = vec2.cosAngle(v1, v2, norm);
    result.values[4] = 0;
    result.values[5] = 0;
    return result;
  }

  public static makeReflection(axis: vec2, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();
    result.values[0] = 1 - 2 * axis.x * axis.x;
    result.values[1] = - 2 * axis.x * axis.y;
    result.values[2] = - 2 * axis.x * axis.y;
    result.values[3] = 1 - 2 * axis.y * axis.y;
    result.values[4] = 0;
    result.values[5] = 0;
    return result;
  }

  public static makeXSkew(sx: number, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();
    result.values[0] = 1;
    result.values[1] = 0;
    result.values[2] = sx;
    result.values[3] = 1;
    result.values[4] = 0;
    result.values[5] = 0;
    return result;
  }

  public static makeYSkew(sy: number, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();
    result.values[0] = 1;
    result.values[1] = sy;
    result.values[2] = 0;
    result.values[3] = 1;
    result.values[4] = 0;
    result.values[5] = 0;
    return result;
  }

  public static makeTranslation(tx: number, ty: number, result: mat2d | null = null): mat2d {
    if (result === null) result = new mat2d();
    result.values[0] = 1;
    result.values[1] = 0;
    result.values[2] = 0;
    result.values[3] = 1;

    result.values[4] = tx;
    result.values[5] = ty;
    return result;
  }

  public static makeScale(sx: number, sy: number, result: mat2d | null = null): mat2d {
    if (Math2D.isEquals(sx, 0) || Math2D.isEquals(sy, 0)) {
      alert(" x轴或y轴缩放系数为0 ");
      throw new Error(" x轴或y轴缩放系数为0 ");
    }

    if (result === null) result = new mat2d();
    result.values[0] = sx;
    result.values[1] = 0;
    result.values[2] = 0;
    result.values[3] = sy;
    result.values[4] = 0;
    result.values[5] = 0;
    return result;
  }

  public static temp1 = mat2d.create();
  public static temp2 = mat2d.create();
  public static quadBezierBasicMatrix = mat2d.create(1, -2, -2, 2, 1, 0);
}