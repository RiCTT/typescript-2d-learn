export class vec2 {
  // 为什么是float32array
  public values: Float32Array;

  public constructor(x: number = 0, y: number = 0) {
    this.values = new Float32Array([x, y])
  }

  public toString(): string {
    return "[" + this.values[0] + "," +  this.values[1] + "]"
  }

  get x(): number {
    return this.values[0]
  }

  get y(): number {
    return this.values[1]
  }

  public reset(x: number = 0, y: number): vec2 {
    this.values[0] = x
    this.values[1] = y
    return this
  }

  // 看的我有点怪怪的
  public static create(x: number = 0, y: number = 0): vec2 {
    return new vec2(x,y )
  }
}