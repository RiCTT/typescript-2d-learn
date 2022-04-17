import { Application, CanvasInputEvent, CanvasKeyBoardEvent, CanvasMouseEvent } from "./src/application";
import { TestCanvas2DApplication, RenderStateStack } from './src/renderStateStack'

class ApplicationTest extends Application {
  protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    console.log('key is ' + evt.key + 'down')
  }

  protected dispatchMouseDown(evt: CanvasMouseEvent): void {
    console.log("canvas pos is" + evt.canvasPosition)
  }

  public update(elapsedMsec: number, intervalSec: number): void {
    // console.log("elapsed: " + elapsedMsec + "intervalSec: " + intervalSec)
  }

  public render(): void {
    console.log("调用render")
  }
}


let canvas: HTMLCanvasElement | null = document.querySelector("#canvas") as HTMLCanvasElement

let app = new ApplicationTest(canvas)

app.update(0, 0)
app.render()

let startBtn: HTMLButtonElement | null = document.getElementById('start') as HTMLButtonElement
let stopBtn: HTMLButtonElement | null = document.getElementById('stop') as HTMLButtonElement

startBtn.onclick = (evt: Event): void => {
  app.start()
  canvas2dApp.start()
}

stopBtn.onclick = (evt: Event): void => {
  app.stop()
  canvas2dApp.stop()

}


let canvas2dApp = new TestCanvas2DApplication(canvas)

canvas2dApp.drawCanvasCoordCenter()
// canvas2dApp.testFillLocalRectWithTitle()
// canvas2dApp.doTransform0()
// canvas2dApp.doTransform(30, true)
// canvas2dApp.doTransform(30, false)
// canvas2dApp.testFillLocalRectWithTitleUV()

canvas2dApp.start()
// canvas2dApp.strokeGrid();
// canvas2dApp.testMyTextLayout();
// canvas2dApp.loadAndDrawImage("./data/test.jpg");
// canvas2dApp.drawColorCanvas();
// canvas2dApp.testChangePartCanvasImageData();