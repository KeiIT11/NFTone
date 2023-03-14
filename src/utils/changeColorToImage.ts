import { RGB } from '@/utils/generateGradientColor'

const width = 800
const height = 800

export const changeColorToImage = (rgb: RGB) => {
  const { R, G, B } = rgb

  const canvasElem = document.createElement('canvas')
  canvasElem.width = width
  canvasElem.height = height
  const ctx = canvasElem.getContext('2d')
  if (!ctx) return

  const color = `rgb(${String(R)},${String(G)},${String(B)})`

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)

  let png = canvasElem.toDataURL() // Base64形式（imgタグのsrcに入れて表示できる形）
  const buffer = new Buffer(png) // 画像のバイナリデータ

  return buffer
}
