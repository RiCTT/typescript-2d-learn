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

  get x(): number {
    return this.values[0]
  }
  public set x(x: number) { this.values[0] = x; }


  get y(): number {
    return this.values[1]
  }
  public set y(y: number) { this.values[1] = y; }


  public reset(x: number = 0, y: number): vec2 {
    this.values[0] = x
    this.values[1] = y
    return this
  }

  public static create(x: number = 0, y: number = 0): vec2 {
    return new vec2(x, y)
  }
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
  public static isEquals(left: number, right: number, espilon: number = EPSILON): boolean {
    if (Math.abs(left - right) >= espilon) {
      return false;
    }
    return true;
  }
}