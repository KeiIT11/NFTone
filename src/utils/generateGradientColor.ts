export type RGB = { R: number; G: number; B: number }

export function generateGradientColor(rgb: RGB) {
  const r = rgb.R
  const g = rgb.G
  const b = rgb.B

  return `linear-gradient(to right, rgb(${r}, ${g}, ${b}), rgb(${r + 100}, ${
    g + 100
  },${b + 100}))`
}
