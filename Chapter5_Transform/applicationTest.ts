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

// canvas2dApp.start()
canvas2dApp.drawCanvasCoordCenter()
// canvas2dApp.testFillLocalRectWithTitle()
// canvas2dApp.doTransform0()
// canvas2dApp.doTransform(30, true)
// canvas2dApp.doTransform(30, false)
// canvas2dApp.testFillLocalRectWithTitleUV()

// canvas2dApp.strokeGrid();
// canvas2dApp.testMyTextLayout();
// canvas2dApp.loadAndDrawImage("./data/test.jpg");
// canvas2dApp.drawColorCanvas();
// canvas2dApp.testChangePartCanvasImageData();

let ptX: number = 600
let ptY: number = 500

canvas2dApp.tank.tankRotation = Math.atan2(
  ptX - canvas2dApp.canvas.width * 0.5,
  ptY - canvas2dApp.canvas.height * 0.5
)
canvas2dApp.drawTank2()

//计算出点[ ptX , ptY ] 与 tank原点之间的距离（也就是三角形斜边的长度）
// let len: number = canvas2dApp.distance(ptX, ptY, app.canvas.width * 0.5, app.canvas.height * 0.5);

// // 计算出斜边一半时的坐标，然后在该坐标处绘制坦克
// canvas2dApp.tank.x = canvas2dApp.tank.x + Math.cos(canvas2dApp.tank.tankRotation) * len * 0.5;
// canvas2dApp.tank.y = canvas2dApp.tank.y + Math.sin(canvas2dApp.tank.tankRotation) * len * 0.5;
// canvas2dApp.drawTank2();

// // 接下来我们要继续将坦克绘制到斜边的末尾 ，上面代码已经将坦克的坐标更新到了斜边一半
// canvas2dApp.tank.x = canvas2dApp.tank.x + Math.cos(canvas2dApp.tank.tankRotation) * len * 0.5;
// canvas2dApp.tank.y = canvas2dApp.tank.y + Math.sin(canvas2dApp.tank.tankRotation) * len * 0.5;
// canvas2dApp.drawTank2();

// canvas2dApp.drawTriangle(canvas2dApp.canvas.width * 0.5, canvas2dApp.canvas.height * 0.5, ptX, canvas2dApp.canvas.height * 0.5, ptX, ptY);
