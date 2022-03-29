export class Canvas2DUtil {
  public context: CanvasRenderingContext2D | null;

  public constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d')
  }

  public drawTExt(text: string) : void {
    if (this.context === null) {
      return
    }
    this.context.save()

    this.context.textBaseline = 'middle'
    this.context.textAlign = 'center'

    let centerX: number = this.context.canvas.width * 0.5
    let centerY: number = this.context.canvas.height * 0.5
    this.context.fillText(text, centerX, centerY)
    this.context.strokeStyle = 'green'
    this.context.strokeText(text, centerX, centerY)

    //将上面context中的textAlign , textBaseLine , fillStyle , strokeStyle状态恢复到初始化状态
    this.context.restore()
  }
}