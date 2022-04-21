import { ELayout, TestCanvas2DApplication } from "./renderStateStack";
import { CanvasMouseEvent } from './application'
import { Math2D, vec2 } from "./math2d";



export class Vector {
  public start: vec2;
  public end: vec2;
  public _mouseX: number = 0;
  public _mouseY: number = 0;
  private arrowLen: number = 20;
  private app!: TestCanvas2DApplication;

  constructor(start: vec2, end: vec2) {
    this.start = start
    this.end = end
  }

  public drawInfo(x: number, y: number, info: string): void {
    this.app.drawCoordInfo(info, x, y)
  }

  public drawArrow(x1: number, y1: number, x2: number, y2: number, lineWidth: number = 1, lineDash?: number[]): void {
    const app = this.app
    if (!app.context2D) {
      return
    }
    app.context2D.save()
    app.context2D.lineWidth = lineWidth
    if (lineDash && lineDash.length) {
      app.context2D.setLineDash(lineDash)
    }
    app.context2D.moveTo(x1, y1)
    app.context2D.lineTo(x2, y2)
    app.context2D.stroke()
    app.context2D.beginPath()
    app.context2D.closePath()
    app.context2D.restore()
  }

  public draw(app: TestCanvas2DApplication): void {
    if (!app.context2D) {
      return
    }

    this.app = app

    const head = new vec2(150, 150)
    const v1 = new vec2(400 - head.x, 300 - head.y)
    const v2 = new vec2(this._mouseX - head.x, this._mouseY - head.y)
    // 求鼠标在v1上的投影长度
    const v3Len = (v1.x * v2.x + v1.y * v2.y) / v1.length
    const norX = v1.x / v1.length
    const norY = v1.y / v1.length
    // 在x轴上的平行向量
    const v3 = new vec2(norX * v3Len, norY * v3Len)
    // const v4 = new vec2(v3.x - this._mouseX, v3.y - this._mouseY)
    
    const inArea = !(v3.length >= v1.length) && v3.x > 0
    const lineWidth: number = inArea ? 3 : 1


    
    if (inArea) {
      app.fillCircle(head.x, head.y, 5, 'red')
      app.fillCircle(this._mouseX, this._mouseY, 5, 'red')
  
      this.drawArrow(head.x, head.y, v1.x + head.x, v1.y + head.y, lineWidth)
      this.drawArrow(head.x, head.y, this._mouseX, this._mouseY, lineWidth, [4])
      this.drawArrow(head.x + v3.x, head.y + v3.y, this._mouseX, this._mouseY, lineWidth, [4])
    } else {
      this.drawArrow(head.x, head.y, v1.x + head.x, v1.y + head.y, lineWidth)
    }
    let font: string = app.makeFontString('16px', 'bold')
    app.fillText('head(150, 150)', head.x, head.y, 'red', 'center', 'middle', font)
    app.fillText('(400, 300)', 400, 300, 'red', 'center', 'middle', font)
    app.fillText(`(${this._mouseX}, ${this._mouseY})`, this._mouseX, this._mouseY, 'red', 'center', 'middle', font)
    app.context2D.save()
    app.context2D.translate(head.x + v1.x / 2, head.y + v1.y / 2 - 10)
    app.fillText(`${v1.length.toFixed(2)}`, 0, 0, 'red', 'left', 'top', font)
    app.context2D.restore()

  }

  public onMouseMove(evt: CanvasMouseEvent): void {
    this._mouseX = evt.canvasPosition.x
    this._mouseY = evt.canvasPosition.y
  }
}

const v1 = new Vector(new vec2(150, 150), new vec2(400, 300))