// PAGE VIEW
export const trackGooglePageView = (pathname) => {
  const { dataLayer } = window
  if (! dataLayer) return
  dataLayer.push({
    event: 'customPageView',
    customPath: pathname,
  })
}

export const trackGoogleUserCreated = () => {
  const { dataLayer } = window
  if (! dataLayer) return
  dataLayer.push({
    event: 'user_created',
  })
}

export const trackGoogleProfileCreated = () => {
  const { dataLayer } = window
  if (! dataLayer) return
  dataLayer.push({
    event: 'profile_created',
  })
}

export const trackGoogleBudgetSet = () => {
  const { dataLayer } = window
  if (! dataLayer) return
  dataLayer.push({
    event: 'first_budget_set',
  })
}
