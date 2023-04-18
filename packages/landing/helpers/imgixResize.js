import { parseUrl } from '@/landing/helpers/utils'

const sizes = {
  portrait_lazy: { w: 12, h: 16, fit: 'crop', blur: true },
  portrait_sm: { w: 240, h: 320, fit: 'crop' },
  portrait_md: { w: 320, h: 480, fit: 'crop' },
  portrait_lg: { w: 420, h: 560, fit: 'crop' },
  portrait_xl: { w: 600, h: 800, fit: 'crop' },
  portrait_xxl: { w: 900, h: 1200, fit: 'crop' },
  landscape_lazy: { w: 24, h: 16, fit: 'crop', blur: true },
  landscape_sm: { w: 480, h: 320, fit: 'crop' },
  landscape_md: { w: 560, h: 420, fit: 'crop' },
  landscape_lg: { w: 800, h: 600, fit: 'crop' },
  landscape_xl: { w: 1200, h: 900, fit: 'crop' },
  landscape_xxl: { w: 1440, h: 1080, fit: 'crop' },
  square_lazy: { w: 20, h: 20, fit: 'crop', blur: true },
  square_sm: { w: 200, h: 200, fit: 'crop' },
  square_md: { w: 400, h: 400, fit: 'crop' },
  square_lg: { w: 600, h: 600, fit: 'crop' },
  square_xl: { w: 800, h: 800, fit: 'crop' },
  square_xxl: { w: 1200, h: 1200, fit: 'crop' },
}

export const resize = (url, { q = 50, auto = 'format', dpr = 1, trim, w, h, fit, m, blur }, fm) => {
  const mask = m ? `&mask=${m}` : ''
  const width = w ? `&w=${w}` : ''
  const height = h ? `&h=${h}` : ''
  const cropFit = fit ? `&fit=${fit}` : ''
  const trimImage = trim ? `&trim=${trim}` : ''
  const format = fm ? `&fm=${fm}` : ''
  const blurQuery = blur ? `&blur=${200}` : ''
  return `${url}?q=${q}&auto=${auto}&dpr=${dpr}${trimImage}${width}${height}${cropFit}${mask}${format}${blurQuery}`
}

export const size = (url, size, format) => {
  const { basicUrl } = parseUrl(url)
  return resize(basicUrl, sizes[size], format)
}
