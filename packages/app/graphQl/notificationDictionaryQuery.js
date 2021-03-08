const getQuery = () => `
  query {
    allNotifications {
      id
      topic
      code
      subcode
      title
      actionable
      dismissable
      hide
      appSummary
      appMessage
      ctaText
      ctaLink
      apiMethod
      apiEndpoint
    }
  }
`

module.exports = getQuery
