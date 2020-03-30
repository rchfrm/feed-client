import produce from 'immer'
const handleInstaErrors = (errors) => {
  const missingInstaIdIndex = errors.findIndex(({ code, subcode }) => code === 'instagram_id' && subcode === 'missing_field')
  const missingInstaBusinessIndex = errors.findIndex(({ code }) => code === 'instagram_page_not_linked')
  // Do nothing if no insta errors
  if (missingInstaIdIndex === -1 && missingInstaBusinessIndex === -1) {
    return errors
  }
  // If no missing insta business, just hide insta error
  if (missingInstaBusinessIndex === -1 && missingInstaIdIndex > -1) {
    return produce(errors, draftErrors => {
      draftErrors[missingInstaIdIndex].hidden = true
    })
  }
  // Hide both insta errors if also missing insta account
  if (missingInstaIdIndex > -1 && missingInstaBusinessIndex > -1) {
    return produce(errors, draftErrors => {
      draftErrors[missingInstaIdIndex].hidden = true
      draftErrors[missingInstaBusinessIndex].hidden = true
    })
  }
}

const getIntegrationErrorPriority = (error) => {
  const { code, subcode } = error
  if (code === 'expired_access_token') return 0
  if (code === 'missing_permission_scope') return 1
  if (code === 'ad_account_error' && subcode === 'CLOSED') return 2
  if (code === 'ad_account_disabled') return 3
  if (code === 'ad_account_error' && subcode === 'UNSETTLED') return 4
  if (code === 'instagram_id' && subcode === 'missing_field') return 5
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
  const formattedErrors = Object.entries(errors).reduce(([platform, platformErrors]) => {
    // Loop through each error in the platform
    const errorsWithPlatform = platformErrors.map((error) => {
      const priority = getIntegrationErrorPriority(error)
      return {
        ...error,
        platform,
        priority,
        hidden: false,
      }
    })
    return errorsWithPlatform
  })
  // Remove instagram busine
  const errorsFiltered = handleInstaErrors(formattedErrors)
  // Sort error by priority
  const sortedErrors = errorsFiltered.sort((a, b) => {
    return a.priority - b.priority
  })

  return sortedErrors
}
