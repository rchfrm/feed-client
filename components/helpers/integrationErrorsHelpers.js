const getIntegrationErrorPriority = (error) => {
  const { code, subcode } = error
  if (code === 'expired_access_token') return 0
  if (code === 'missing_permission_scope') return 1
  if (code === 'ad_account_error' && subcode === 'CLOSED') return 2
  if (code === 'ad_account_disabled') return 3
  if (code === 'ad_account_error' && subcode === 'UNSETTLED') return 4
  if (code === 'instagram_id') return 5
  if (code === 'instagram_page_not_linked') return 6
  return 999
}

export const getIntegrationErrorMessage = (error) => {
  console.log('error', error)
  return 'HELPPP'
}

// Converts integration errors into an array of errors
// with the platform as part of the error
export const formatErrors = (errors) => {
  // Loop through all platform error types
  const formattedErrors = Object.entries(errors).reduce((formattedErrors, [platform, platformErrors]) => {
    // Loop through each error in the platform
    const errorsWithPlatform = platformErrors.map((error) => {
      const priority = getIntegrationErrorPriority(error)
      return {
        ...error,
        platform,
        priority,
      }
    })
    return [...formattedErrors, ...errorsWithPlatform]
  }, [])
  // Sort error by priority
  const sortedErrors = formattedErrors.sort((a, b) => {
    return a.priority - b.priority
  })

  return sortedErrors
}
