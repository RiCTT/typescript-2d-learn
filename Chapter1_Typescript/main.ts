import { Canvas2DUtil } from './canvas2d'

let canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement
if (canvas === null) {
  alert( "无法获取HTMLCanvasElement !!! " );
  throw new Error( "无法获取HTMLCanvasElement !!! " );
}

let canvas2d: Canvas2DUtil = new Canvas2DUtil(canvas)
canvas2d.drawTExt("hello world !!")