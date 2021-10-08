// PAGE VIEW
export const trackGooglePageView = (pathname) => {
  const { dataLayer } = window
  if (!dataLayer) return
  dataLayer.push({
    event: 'customPageView',
    customPath: pathname === '/' ? '/posts' : pathname,
  })
}
