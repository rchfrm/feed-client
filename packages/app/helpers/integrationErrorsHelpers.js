import produce from 'immer'

import copy from '@/app/copy/integrationErrorsCopy'

import { sortArrayByKey } from '@/helpers/utils'
import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

export const testForMissingPages = (scopes) => {
  if (scopes.length > 2) return false
  if (
    scopes.includes('pages_manage_ads')
    && scopes.includes('pages_show_list')
  ) {
    return true
  }
  return false
}

export const getErrorResponse = (error, artist) => {
  if (!error) return
  const {
    code,
    subcode, message:
    defaultMessage,
    hidden,
    context,
    field,
  } = error

  // Get facebook integration
  const facebookIntegration = artist ? getArtistIntegrationByPlatform(artist, 'facebook') : null

  if (code === 'missing_permission_scope') {
    const missingPermissions = context
    const hasOnlyMissingPages = testForMissingPages(missingPermissions)
    return {
      message: copy[code](missingPermissions, hasOnlyMissingPages),
      action: 'fb_reauth',
      buttonText: 'Continue with Facebook',
      missingPermissions,
      hidden,
      code,
    }
  }

  if (code === 'expired_access_token' || code === 'page_permission_error') {
    return {
      message: copy.expired_access_token(),
      action: 'fb_reauth',
      buttonText: 'Relink Facebook',
      hidden,
      code,
    }
  }

  if (code === 'ad_account_error' && subcode === 'CLOSED') {
    return {
      message: copy.ad_account_closed(facebookIntegration),
      action: 'link',
      buttonText: 'Email us',
      href: 'mailto:help@tryfeed.co?subject=New ad account, old one closed',
      code,
    }
  }

  if (code === 'ad_account_disabled') {
    return {
      message: copy[code](facebookIntegration),
      action: 'link',
      buttonText: 'Facebook Ads Manager',
      href: 'https://facebook.com/adsmanager/manage/',
      fbLink: true,
      hidden,
      code,
    }
  }

  if (code === 'ad_account_error' && subcode === 'UNSETTLED') {
    return {
      message: copy.unpaid_invoice(facebookIntegration),
      action: 'link',
      buttonText: 'Facebook Billing',
      href: 'https://www.facebook.com/ads/manager/billing/',
      fbLink: true,
      hidden,
      code,
    }
  }

  if (code === 'ad_account_no_funding_source') {
    return {
      message: copy[code](facebookIntegration),
      action: 'link',
      buttonText: 'Add payment details',
      href: 'https://www.facebook.com/ads/manager/billing/',
      fbLink: true,
      hidden,
      code,
    }
  }

  if (code === 'missing_field' && field === 'instagram_id') {
    return {
      message: copy.no_instagram_business(),
      action: 'dismiss',
      buttonText: 'Ok',
      hidden: true,
      code,
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
      code,
    }
  }
  if (code === 'custom_audience_tos_not_accepted') {
    const adAccountId = context.ad_account_id.replace('act_', '')
    return {
      message: copy[code](),
      action: 'link',
      buttonText: 'Accept Terms on Facebook',
      href: `https://www.facebook.com/customaudiences/app/tos/?act=${adAccountId}`,
      fbLink: true,
      hidden,
      code,
    }
  }

  return {
    message: defaultMessage,
    action: 'dismiss',
    buttonText: 'Ok',
    hidden,
    code,
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
  if (code === 'custom_audience_tos_not_accepted') return 8
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
  const sortedErrors = sortArrayByKey(errorsFiltered, 'priority')
  return sortedErrors
}
