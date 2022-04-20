import { TestCanvas2DApplication } from './src/renderStateStack'

const canvas = document.querySelector("#canvas") as HTMLCanvasElement

const app: TestCanvas2DApplication = new TestCanvas2DApplication(canvas)
const startBtn: HTMLButtonElement | null = document.getElementById('start') as HTMLButtonElement
const stopBtn: HTMLButtonElement | null = document.getElementById('stop') as HTMLButtonElement

startBtn.onclick = (evt: Event): void => {
  app.start()
}

stopBtn.onclick = (evt: Event): void => {
  app.stop()
}

app.start()