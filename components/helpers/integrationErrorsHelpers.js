import produce from 'immer'

import copy from '../../copy/integrationErrorsCopy'

export const getErrorResponse = (error, artist) => {
  const { code, subcode, message: defaultMessage, hidden } = error

  if (code === 'expired_access_token') {
    return {
      message: copy[code],
      action: 'fb_reauth',
      buttonText: 'Relink with facebook',
      hidden,
    }
  }

  if (code === 'missing_permission_scope') {
    return {
      message: copy[code],
      action: 'fb_reauth',
      buttonText: 'Relink with facebook',
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
      hidden,
    }
  }

  if (code === 'ad_account_error' && subcode === 'UNSETTLED') {
    return {
      message: copy.unpaid_invoice(artist),
      action: 'link',
      buttonText: '‘Facebook Billing',
      href: 'https://www.facebook.com/ads/manager/billing/',
      hidden,
    }
  }

  if (code === 'ad_account_no_funding_source') {
    return {
      message: copy[code](artist),
      action: 'link',
      buttonText: '‘Facebook Billing',
      href: 'https://www.facebook.com/ads/manager/billing/',
      hidden,
    }
  }

  if (code === 'instagram_id') {
    return {
      message: copy.no_instagram(artist),
      action: 'link',
      buttonText: '‘Facebook Billing',
      href: 'https://www.facebook.com/ads/manager/billing/',
      hidden,
    }
  }
  if (code === 'instagram_page_not_linked') {
    return {
      message: copy[code],
      action: 'link',
      buttonText: 'Link Instagram Account',
      href: 'https://www.facebook.com/business/help/898752960195806',
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
  const missingInstaIdIndex = errors.findIndex(({ code, subcode }) => code === 'instagram_id' && subcode === 'missing_field')
  const missingInstaBusinessIndex = errors.findIndex(({ code }) => code === 'instagram_page_not_linked')
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
