import { Canvas2DApplication } from './application'
import { Rectangle, Size, vec2 } from './math2d'


type PatternRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat"
type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end';
type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom';
type FontType = "10px sans-serif" | "15px sans-serif" | "20px sans-serif" | "25px sans-serif";
type FontStyle = "normal" | "italic" | "oblique";
type FontVariant = "normal" | "small-caps";
type FontWeight = "normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
type FontSize = "10px" | "12px" | "16px" | "18px" | "24px" | "50%" | "75%" | "100%" | "125%" | "150%" | "xx-small" | "x-small" | "small" | "medium" | "large" | "x-large" | "xx-large";
type FontFamily = "sans-serif" | "serif" | "courier" | "fantasy" | "monospace";

export enum ELayout {
  LEFT_TOP,
  RIGHT_TOP,
  RIGHT_BOTTOM,
  LEFT_BOTTOM,
  CENTER_MIDDLE,
  CENTER_TOP,
  RIGHT_MIDDLE,
  CENTER_BOTTOM,
  LEFT_MIDDLE
}

class RenderState {
  public lineWidth: number = 1;
  public strokeStyle: string = 'red'
  public fillStyle: string = 'green'

  public clone(): RenderState {
    let state: RenderState = new RenderState()
    state.lineWidth = this.lineWidth
    state.strokeStyle = this.strokeStyle
    state.fillStyle = this.fillStyle

    return state
  }

  public toString(): string {
    return JSON.stringify(this, null, '')
  }
}

export class RenderStateStack {
  private _stack: RenderState[] = [new RenderState()]
  private get _currentState(): RenderState {
    return this._stack[this._stack.length - 1]
  }

  public save(): void {
    this._stack.push(this._currentState.clone())
  }

  public restore(): void {
    this._stack.pop()
  }

  public get lineWidth(): number {
    return this._currentState.lineWidth;
  }

  public set lineWidth(value: number) {
    this._currentState.lineWidth = value;
  }

  public get strokeStyle(): string {
    return this._currentState.strokeStyle;
  }

  public set strokeStyle(value: string) {
    this._currentState.strokeStyle = value;
  }

  public get fillStyle(): string {
    return this._currentState.strokeStyle;
  }

  public set fillStyle(value: string) {
    this._currentState.strokeStyle = value;
  }

  public printCurrentStateInfo(): void {
    console.log(this._currentState.toString());
  }

}

export class TestCanvas2DApplication extends Canvas2DApplication {
  private _lineDashOffset: number = 0;
  private _linearGradient!: CanvasGradient;
  private _radialGradient!: CanvasGradient;
  private _pattern: CanvasPattern | null = null;

  private _img!: HTMLImageElement;


  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    // this.addTimer(this.timeCallback.bind(this), 0.033)
  }

  public render(): void {
    if (this.context2D) {
      // this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // this.strokeGrid();
    }
  }

  public drawRect(x: number, y: number, w: number, h: number): void {
    if (!this.context2D) {
      return
    }
    this.context2D.save()
    this.context2D.lineWidth = 20
    this.context2D.fillStyle = 'grey'
    this.context2D.beginPath()
    this.context2D.moveTo(x, y)
    this.context2D.lineTo(x + w, y)
    this.context2D.lineTo(x + w, y + h)
    this.context2D.lineTo(x, y + h)
    this.context2D.closePath()
    this.context2D.fill()
    this.context2D.stroke()
    this.context2D.restore()
  }

  public testMyRenderStateStack(): void {
    let stack: RenderStateStack = new RenderStateStack()
    stack.printCurrentStateInfo();
    stack.save();
    stack.lineWidth = 10;
    stack.fillStyle = 'black';
    stack.printCurrentStateInfo();
    stack.restore();
    stack.printCurrentStateInfo();
  }

  public drawRect1(): void {
    if (this.context2D) {
      this.context2D.save()
      this.context2D.lineWidth = 10
      this.context2D.fillStyle = 'rgba(255, 0, 0, 0.5)'
      this.context2D.strokeStyle = 'blue'
      let x = this.canvas.width * 0.5
      let y = this.canvas.height * 0.5
      this.context2D.fillRect(x, y, x, y)
      this.context2D.strokeRect(x, y, x, y)
      this.context2D.restore()
    }
  }

  public drawRect2(): void {
    if (this.context2D) {
      this.context2D.fillStyle = "rgba(0,255,0,0.5)";
      this.context2D.strokeStyle = 'red';
      this.context2D.beginPath();
      this.context2D.rect(0, 0, this.context2D.canvas.width * 0.5, this.context2D.canvas.height * 0.5);
      this.context2D.stroke();
      this.context2D.fill();
    }
  }

  public drawRect3(): void {
    if (this.context2D !== null) {
      this.context2D.fillStyle = "rgba(0,0,255,0.5)";
      this.context2D.strokeStyle = 'red';
      this.context2D.beginPath();
      this.context2D.moveTo(this.context2D.canvas.width * 0.5, 0);
      this.context2D.lineTo(this.context2D.canvas.width, 0);
      this.context2D.lineTo(this.context2D.canvas.width, this.context2D.canvas.height * 0.5);
      this.context2D.lineTo(this.context2D.canvas.width * 0.5, this.context2D.canvas.height * 0.5);
      //this . context2D . closePath ( ) ;
      this.context2D.stroke();
      this.context2D.fill();
    }
  }

  private _updateLineDashOffset(): void {
    this._lineDashOffset++
    if (this._lineDashOffset > 10000) {
      this._lineDashOffset = 0
    }
  }

  private _drawLineDashRect(x: number, y: number, w: number, h: number): void {
    if (!this.context2D) {
      return
    }
    this.context2D.save()
    this.context2D.lineWidth = 2
    this.context2D.strokeStyle = 'rgb(0, 0, 255)'
    if (this._linearGradient === undefined) {
      this._linearGradient = this.context2D.createLinearGradient(x, y, x + w, y + h)
      this._linearGradient.addColorStop(0.0, 'rgba( 255 , 0 , 0 , 1 ) ');
      this._linearGradient.addColorStop(0.5, 'green');
      this._linearGradient.addColorStop(0.8, '#0000FF');
      this._linearGradient.addColorStop(1.0, 'black');
    }
    if (this._radialGradient === undefined) {
      let centX: number = x + w * 0.5;
      let centY: number = y + h * 0.5;
      let radius: number = Math.min(w, h);
      radius *= 0.5;
      this._radialGradient = this.context2D.createRadialGradient(centX, centY, radius * 0.2, centX, centY, radius);
      this._radialGradient.addColorStop(0.0, 'rgba( 255 , 0 , 0 , 0.5 ) ');
      this._radialGradient.addColorStop(0.5, 'green');
      this._radialGradient.addColorStop(0.8, '#0000FF');
      this._radialGradient.addColorStop(1.0, 'black');
    }
    this.context2D.fillStyle = this._linearGradient;
    // this.context2D.fillStyle = this._radialGradient;
    this.context2D.setLineDash([10, 5]);
    this.context2D.lineDashOffset = - this._lineDashOffset;
    this.context2D.beginPath();
    this.context2D.moveTo(x, y);
    this.context2D.lineTo(x + w, y);
    this.context2D.lineTo(x + w, y + h);
    this.context2D.lineTo(x, y + h);
    this.context2D.closePath();
    this.context2D.fill();
    this.context2D.stroke();

    this.context2D.restore()
  }

  public static Colors: string[] = [
    'aqua',    //浅绿色
    'black',   //黑色
    'blue',    //蓝色 
    'fuchsia', //紫红色
    'gray',     //灰色
    'green',   //绿色
    'lime',    //绿黄色
    'maroon',  //褐红色
    'navy',    //海军蓝
    'olive',   //橄榄色
    'orange',  //橙色
    'purple',  //紫色
    'red',      //红色
    'silver',  //银灰色
    'teal',    //蓝绿色
    'yellow',   //黄色
    'white'   //白色
  ]

  public fillLinearRect(x: number, y: number, w: number, h: number): void {
    if (this.context2D) {
      this.context2D.save()
      if (!this._linearGradient) {
        // 从左上角到右上角
        // this._linearGradient = this.context2D.createLinearGradient(x, y, x + w, y)
        // 从上到下
        // this._linearGradient = this.context2D.createLinearGradient(x, y, x, y + h);
        // 从左上角到右下角
        // this._linearGradient = this.context2D.createLinearGradient(x, y, x + w, y + h);
        // 从右下角到左上角
        this._linearGradient = this.context2D.createLinearGradient(x + w, y + h, x, y);
        this._linearGradient.addColorStop(0.0, 'grey')
        this._linearGradient.addColorStop(0.25, 'rgba(255, 0, 0, 1)')
        this._linearGradient.addColorStop(0.5, 'green')
        this._linearGradient.addColorStop(0.75, '#0000FF')
        this._linearGradient.addColorStop(1.0, 'black')
      }
      this.context2D.fillStyle = this._linearGradient
      this.context2D.beginPath()
      this.context2D.rect(x, y, w, h)
      this.context2D.fill()
      this.context2D.restore()
    }
  }

  public fillRadialRect(x: number, y: number, w: number, h: number): void {
    if (this.context2D !== null) {
      this.context2D.save();
      if (this._radialGradient === undefined) {
        let centX: number = x + w * 0.5;
        let centY: number = y + h * 0.5;
        let radius: number = Math.min(w, h);
        radius *= 0.5;
        this._radialGradient = this.context2D.createRadialGradient(centX, centY, radius * 0.1, centX, centY, radius);
        this._radialGradient.addColorStop(0.0, 'black');
        this._radialGradient.addColorStop(0.25, 'rgba( 255 , 0 , 0 , 1 ) ');
        this._radialGradient.addColorStop(0.5, 'green');
        this._radialGradient.addColorStop(0.75, '#0000FF');
        this._radialGradient.addColorStop(1.0, 'white');
      }
      this.context2D.fillStyle = this._radialGradient;
      this.context2D.fillRect(x, y, w, h);
      this.context2D.restore();
    }
  }

  public fillPatternRect(x: number, y: number, w: number, h: number, repeat: PatternRepeat = 'repeat'): void {
    if (!this.context2D) {
      return
    }
    if (this._pattern === null) {
      let img: HTMLImageElement = document.createElement('img')
      img.src = './data/test.jpg'
      img.onload = (ev: Event): void => {
        if (this.context2D) {
          this._pattern = this.context2D.createPattern(img, repeat)
          this.context2D.save()
          if (this._pattern) {
            this.context2D.fillStyle = this._pattern
          }
          this.context2D.beginPath()
          this.context2D.rect(x, y, w, h)
          this.context2D.fill()
          this.context2D.restore()
        }
      }
    } else {
      this.context2D.save()
      this.context2D.fillStyle = this._pattern
      this.context2D.beginPath();
      this.context2D.rect(x, y, w, h);
      this.context2D.fill();
      this.context2D.restore();
    }
  }

  public fillCircle(x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern = 'red'): void {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.fillStyle = fillStyle;
      this.context2D.beginPath();
      this.context2D.arc(x, y, radius, 0, Math.PI * 2);
      this.context2D.fill();
      this.context2D.restore();
    }
  }

  public fillRectangleWithColor(rect: Rectangle, color: string): void {
    if (rect.isEmpty()) {
      return;
    }
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.fillStyle = color;
      this.context2D.fillRect(rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
      this.context2D.restore();
    }
  }

  public strokeLine(x0: number, y0: number, x1: number, y1: number): void {
    if (this.context2D !== null) {
      this.context2D.beginPath();
      this.context2D.moveTo(x0, y0);
      this.context2D.lineTo(x1, y1);
      this.context2D.stroke();
    }
  }

  public strokeCoord(orginX: number, orginY: number, width: number, height: number, lineWidth: number = 3): void {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.lineWidth = lineWidth;
      this.context2D.strokeStyle = 'red';
      this.strokeLine(orginX, orginY, orginX + width, orginY);
      this.context2D.strokeStyle = 'blue';
      this.strokeLine(orginX, orginY, orginX, orginY + height);
      this.context2D.restore();
    }
  }

  public strokeLocalCoord(width: number, height: number, lineWidth: number = 1): void {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.lineWidth = lineWidth;
      this.context2D.strokeStyle = 'red';
      this.strokeLine(0, 0, width, 0);
      this.context2D.strokeStyle = 'blue';
      this.strokeLine(0, 0, 0, height);
      this.context2D.restore();
    }
  }

  public strokeCircle(x: number, y: number, radius: number, color: string = 'red', lineWidth: number = 1): void {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.strokeStyle = color;
      this.context2D.lineWidth = lineWidth;
      this.context2D.beginPath();
      this.context2D.arc(x, y, radius, 0, Math.PI * 2);
      this.context2D.stroke();
      this.context2D.restore();
    }
  }

  public strokeRect(x: number, y: number, w: number, h: number, color: string = 'black'): void {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.strokeStyle = color;
      this.context2D.beginPath();
      this.context2D.moveTo(x, y);
      this.context2D.lineTo(x + w, y);
      this.context2D.lineTo(x + w, y + h);
      this.context2D.lineTo(x, y + h);
      this.context2D.closePath();
      this.context2D.stroke();
      this.context2D.restore();
    }
  }

  public strokeGrid(color: string = 'grey', interval: number = 10): void {
    if (this.context2D) {
      this.context2D.save()
      this.context2D.strokeStyle = color
      this.context2D.lineWidth = 0.5
      for (let i: number = interval + 0.5; i < this.canvas.width; i += interval) {
        this.strokeLine(i, 0, i, this.canvas.height)
      }
      for (let i: number = interval + 0.5; i < this.canvas.height; i += interval) {
        this.strokeLine(0, i, this.canvas.width, i)
      }
      this.context2D.restore()
      this.strokeCoord(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  public fillText(text: string, x: number, y: number, color: string = 'white', align: TextAlign = 'left', baseline: TextBaseline = 'top', font: FontType = '10px sans-serif'): void {
    if (this.context2D !== null) {
      this.context2D.save();
      this.context2D.textAlign = align;
      this.context2D.textBaseline = baseline;
      this.context2D.font = font;
      this.context2D.fillStyle = color;
      this.context2D.fillText(text, x, y);
      this.context2D.restore();
    }
  }

  public calcTextSize(text: string, char: string = 'W', scale: number = 0.5): Size {
    if (this.context2D) {
      let size: Size = new Size()
      size.width = this.context2D.measureText(text).width
      let w: number = this.context2D.measureText(char).width
      size.height = w + w * scale
      return size
    }
    alert('context')
  }

  /**
   * 计算文本在矩形中的位置
   * @param layout 
   * @param text 
   * @param parentWidth 
   * @param parentHeight 
   * @returns 
   */
  public calcLocalTextRectangle(layout: ELayout, text: string, parentWidth: number, parentHeight: number): Rectangle {
    let s: Size = this.calcTextSize(text)
    let o: vec2 = vec2.create()
    let left: number = 0
    let top: number = 0
    let right: number = parentWidth - s.width
    let bottom: number = parentHeight - s.height
    let center: number = right * 0.5
    let middle: number = bottom * 0.5

    switch (layout) {
      case ELayout.LEFT_TOP:
        o.x = left
        o.y = top
        break
      case ELayout.RIGHT_TOP:
        o.x = right
        o.y = top
        break
      case ELayout.LEFT_BOTTOM:
        o.x = left
        o.y = bottom
        break
      case ELayout.RIGHT_BOTTOM:
        o.x = right
        o.y = bottom
        break
      case ELayout.CENTER_MIDDLE:
        o.x = center
        o.y = middle
        break
      case ELayout.CENTER_TOP:
        o.x = center;
        o.y = 0;
        break;
      case ELayout.RIGHT_MIDDLE:
        o.x = right;
        o.y = middle;
        break;
      case ELayout.CENTER_BOTTOM:
        o.x = center;
        o.y = bottom;
        break;
      case ELayout.LEFT_MIDDLE:
        o.x = left;
        o.y = middle;
        break;
    }
    return new Rectangle(o, s);
  }

  public fillRectWithTitle(x: number, y: number, width: number, height: number, title: string = '', layout: ELayout = ELayout.CENTER_MIDDLE, color: string = 'grey', showCoord: boolean = true): void {
    if (this.context2D) {
      this.context2D.save()
      this.context2D.fillStyle = color
      this.context2D.beginPath()
      this.context2D.rect(x, y, width, height)
      this.context2D.fill()
      if (title.length !== 0) {
        let rect: Rectangle = this.calcLocalTextRectangle(layout, title, width, height)
        this.fillText(title, x + rect.origin.x, y + rect.origin.y, 'white', 'left', 'top', /*, '10px sans-serif'*/)
        this.fillText(title, x + rect.origin.x, y + rect.origin.y, 'white', 'left', 'top' /*, '10px sans-serif'*/);
        this.strokeRect(x + rect.origin.x, y + rect.origin.y, rect.size.width, rect.size.height, 'rgba( 0 , 0 , 0 , 0.5 ) ');
        this.fillCircle(x + rect.origin.x, y + rect.origin.y, 2);
      }

      if (showCoord) {
        // this.strokeCoord(x, y, width + 20, height + 20);
        this.strokeCoord(x, y, width, height);
        this.fillCircle(x, y, 3);
      }

      this.context2D.restore();
    }
  }

  public testMyTextLayout(font: string = this.makeFontString("10px", "normal", "normal", "normal", "sans-serif")): void {
    let x: number = 20
    let y: number = 20;
    let width: number = this.canvas.width - x * 2
    let height: number = this.canvas.height - y * 2
    let right: number = x + width
    let bottom: number = y + height

    let drawX: number = x
    let drawY: number = y
    let drawWidth: number = 150
    let drawHeight: number = 50
    let color = 'rgba(255, 255, 0, 0.3)'

    if (this.context2D) {
      this.context2D.save()
      this.context2D.font = font
      this.fillRectWithTitle(x, y, width, height)

      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-top', ELayout.LEFT_TOP, color)
      drawX = right - drawWidth;
      drawY = y;
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-top', ELayout.RIGHT_TOP, color)
      drawX = right - drawWidth;
      drawY = bottom - drawHeight;
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-bottom', ELayout.RIGHT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
      drawX = x;
      drawY = bottom - drawHeight;
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-bottom', ELayout.LEFT_BOTTOM, 'rgba( 255 , 255 , 0 , 0.2 )');
      drawX = (right - drawWidth) * 0.5;
      drawY = (bottom - drawHeight) * 0.5;
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-middle', ELayout.CENTER_MIDDLE, 'rgba( 255 , 0 , 0 , 0.2 )');
      drawX = (right - drawWidth) * 0.5;
      drawY = y;
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-top', ELayout.CENTER_TOP, 'rgba( 0 , 255 , 0 , 0.2 )');
      drawX = (right - drawWidth);
      drawY = (bottom - drawHeight) * 0.5;
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'right-middle', ELayout.RIGHT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
      drawX = (right - drawWidth) * 0.5;
      drawY = (bottom - drawHeight);
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'center-bottom', ELayout.CENTER_BOTTOM, 'rgba( 0 , 255 , 0 , 0.2 )');
      drawX = x;
      drawY = (bottom - drawHeight) * 0.5;
      this.fillRectWithTitle(drawX, drawY, drawWidth, drawHeight, 'left-middle', ELayout.LEFT_MIDDLE, 'rgba( 0 , 255 , 0 , 0.2 )');
    }
  }

  public makeFontString(
    size: FontSize = '10px',
    weight: FontWeight = 'normal',
    style: FontStyle = 'normal',
    variant: FontVariant = 'normal',
    family: FontFamily = 'sans-serif',
  ): string {
    let strs: string[] = []
    strs.push(style)
    strs.push(style);
    strs.push(variant);
    strs.push(weight);
    strs.push(size);
    strs.push(family);
    let ret: string = strs.join(" ");
    console.log(ret);
    return ret;
  }

  public testCanvas2DTextLayout(): void {

  }

  public timeCallback(id: number, data: any): void {
    this._updateLineDashOffset()
    this._drawLineDashRect(10, 10, this.canvas.width - 20, this.canvas.height - 20)
  }
}