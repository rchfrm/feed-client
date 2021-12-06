const getQuery = () => `
  query {
    allNotifications(first: 100) {
      id
      topic
      title
      ctaType
      actionable
      dismissable
      hide
      appSummary
      appMessage
      ctaText
      ctaLink
      buttonType
      apiMethod
      apiEndpoint
    }
  }
`

module.exports = getQuery
