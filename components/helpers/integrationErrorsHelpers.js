import produce from 'immer'

import copy from '../../copy/integrationErrorsCopy'

export const testForMissingPages = (scopes) => {
  if (scopes.length > 2) return false
  if (
    scopes.includes('manage_pages')
    && scopes.includes('pages_show_list')
  ) {
    return true
  }
  return false
}

export const getErrorResponse = (error, artist) => {
  const {
    code,
    subcode, message:
    defaultMessage,
    hidden,
    context,
    field,
  } = error

  if (code === 'expired_access_token' || code === 'page_permission_error') {
    return {
      message: copy.expired_access_token(),
      action: 'fb_reauth',
      buttonText: 'Relink Facebook',
      hidden,
    }
  }

  if (code === 'missing_permission_scope') {
    const missingPermissions = context
    const hasOnlyMissingPages = testForMissingPages(missingPermissions)
    return {
      message: copy[code](missingPermissions, hasOnlyMissingPages),
      action: 'fb_reauth',
      buttonText: 'Continue with Facebook',
      missingPermissions,
      hidden,
    }
  }

  if (code === 'ad_account_error' && subcode === 'CLOSED') {
    return {
      message: copy.ad_account_closed(artist),
      action: 'link',
      buttonText: 'Email us',
      href: 'mailto:help@getfed.app?subject=New ad account, old one closed',
    }
  }

  if (code === 'ad_account_disabled') {
    return {
      message: copy[code](artist),
      action: 'link',
      buttonText: 'Facebook Ads Manager',
      href: 'https://facebook.com/adsmanager/manage/',
      fbLink: true,
      hidden,
    }
  }

  if (code === 'ad_account_error' && subcode === 'UNSETTLED') {
    return {
      message: copy.unpaid_invoice(artist),
      action: 'link',
      buttonText: 'Facebook Billing',
      href: 'https://www.facebook.com/ads/manager/billing/',
      fbLink: true,
      hidden,
    }
  }

  if (code === 'ad_account_no_funding_source') {
    return {
      message: copy[code](artist),
      action: 'link',
      buttonText: 'Add payment details',
      href: 'https://www.facebook.com/ads/manager/billing/',
      fbLink: true,
      hidden,
    }
  }

  if (code === 'missing_field' && field === 'instagram_id') {
    return {
      message: copy.no_instagram_business(),
      action: 'dismiss',
      buttonText: 'Ok',
      hidden: true,
    }
  }
  if (code === 'instagram_page_not_linked') {
    return {
      message: copy[code](),
      action: 'link',
      buttonText: 'Link Instagram Account',
      href: 'https://www.facebook.com/business/help/898752960195806',
      fbLink: true,
      hidden,
    }
  }

  return {
    message: defaultMessage,
    action: 'dismiss',
    buttonText: 'Ok',
    hidden,
  }
}


const handleInstaErrors = (errors) => {
  const missingInstaBusinessIndex = errors.findIndex(({ code, field }) => code === 'missing_field' && field === 'instagram_id')
  const missingInstaIdIndex = errors.findIndex(({ code }) => code === 'instagram_page_not_linked')
  // If no missing insta business, just hide no insta account error
  if (missingInstaIdIndex > -1 && missingInstaBusinessIndex === -1) {
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
  // Else just return unaltered
  return errors
}

const getIntegrationErrorPriority = (error) => {
  const { code, subcode } = error
  if (code === 'expired_access_token') return 0
  if (code === 'missing_permission_scope') return 1
  if (code === 'ad_account_error' && subcode === 'CLOSED') return 2
  if (code === 'ad_account_disabled') return 3
  if (code === 'ad_account_error' && subcode === 'UNSETTLED') return 4
  if (code === 'instagram_id' && subcode === 'missing_field') return 5
  if (code === 'ad_account_no_funding_source') return 6
  if (code === 'instagram_page_not_linked') return 7
  return 999
}

// Converts integration errors into an array of errors
// with the platform as part of the error
export const formatErrors = (errors) => {
  // Loop through all platform error types
  const formattedErrors = Object.entries(errors).reduce((acc, [platform, platformErrors]) => {
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
    return [...acc, ...errorsWithPlatform]
  }, [])
  // Remove instagram busine
  const errorsFiltered = handleInstaErrors(formattedErrors)
  // Sort error by priority
  const sortedErrors = errorsFiltered.sort((a, b) => {
    return a.priority - b.priority
  })

  return sortedErrors
}
