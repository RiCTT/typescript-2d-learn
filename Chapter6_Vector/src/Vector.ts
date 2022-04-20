import { TestCanvas2DApplication } from "./renderStateStack";
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

  public draw(app: TestCanvas2DApplication): void {
    if (!app.context2D) {
      return
    }
    this.app = app
    const { start, end } = this
    const vec: vec2 = vec2.difference(end, start)
    const isInArea: boolean = true
    const lineWidth: number = isInArea ? 3 : 1
    app.context2D.save()
    app.context2D.beginPath()
    app.context2D.lineWidth = lineWidth
    app.context2D.fillStyle = '#000'
    app.context2D.moveTo(start.x, start.y)
    app.context2D.lineTo(end.x, end.y)
    app.context2D.closePath()
    app.context2D.stroke()
    app.context2D.restore()

    app.fillText(`[ ${start.x}, ${start.y} ]`, start.x, start.y, '#000', 'center', 'middle', '20px sans-serif')
    app.fillText(`[ ${end.x}, ${end.y} ]`, end.x, end.y, '#000', 'center', 'middle', '20px sans-serif')
    app.context2D.save()
    app.context2D.translate(start.x, start.y)
    app.context2D.translate((end.x - start.x) / 2, (end.y - start.y) / 2 - 20)
    app.context2D.rotate(Math.PI / 6)
    app.fillText(`${vec.length.toFixed(2)}`, 0, 0,  '#000', 'center', 'middle', '20px sans-serif')
    app.context2D.restore()

    app.context2D.save()
    app.context2D.translate(end.x, end.y)
    app.context2D.lineWidth = lineWidth
    app.context2D.beginPath()
    app.context2D.moveTo(0, 0)
    app.context2D.lineTo(-this.arrowLen, 0)
    app.context2D.closePath()
    app.context2D.stroke()
    app.context2D.restore()

    app.context2D.save()
    app.context2D.translate(end.x, end.y)
    app.context2D.rotate(Math.PI / 180 * 70)
    app.context2D.lineWidth = lineWidth
    app.context2D.beginPath()
    app.context2D.moveTo(0, 0)
    app.context2D.lineTo(-this.arrowLen, 0)
    app.context2D.closePath()
    app.context2D.stroke()
    app.context2D.restore()

    
    if (isInArea) {
      app.context2D.save()
      app.context2D.setLineDash([4])
      app.context2D.moveTo(start.x, start.y)
      app.context2D.lineTo(this._mouseX, this._mouseY)
      app.context2D.stroke()
      app.context2D.restore()

      app.fillCircle(this._mouseX, this._mouseY, 5, 'red')

      const v1 = new vec2(this._mouseX - start.x, this._mouseY - start.y)
      const v2 = new vec2(end.x - start.x, end.y - start.y)
      // 不能删除
      // const angle = Math2D.toDegree(Math.acos((v1.x * v2.x + v1.y * v2.y) / (v1.length * v2.length)))
      const newLen = (v1.x * v2.x + v1.y * v2.y) / v2.length
      const v2Copy = vec2.copy(v2)
      v2Copy.normalize()
      
      app.context2D.save()
      const v3 = new vec2(v2Copy.x * newLen, v2Copy.y * newLen)
      app.context2D.translate(start.x, start.y)
      app.context2D.translate(v3.x, v3.y)
      app.context2D.setLineDash([4])
      app.context2D.moveTo(0, 0)
      app.context2D.lineTo(this._mouseX - v3.x - start.x, this._mouseY - v3.y - start.y)
      app.context2D.stroke()
      app.context2D.closePath()
      app.fillCircle(0, 0, 5, 'red')
      app.context2D.restore()
    }
  }

  public onMouseMove(evt: CanvasMouseEvent): void {
    this._mouseX = evt.canvasPosition.x
    this._mouseY = evt.canvasPosition.y
  }
}