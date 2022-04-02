import { Application, CanvasInputEvent, CanvasKeyBoardEvent, CanvasMouseEvent } from "./src/application";

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
}

stopBtn.onclick = (evt: Event): void => {
  app.stop()
}