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

export const getErrorResponse = ({ error, artist, email }) => {
  if (!error) return
  const {
    topic,
    subcode = '',
    context = '',
    description,
    hidden,
  } = error

  // Get facebook integration
  const facebookIntegration = artist ? getArtistIntegrationByPlatform(artist, 'facebook') : null

  if (topic === 'facebook_missing_permissions') {
    const missingPermissions = context
    const hasOnlyMissingPages = testForMissingPages(missingPermissions)
    return {
      message: copy[topic](missingPermissions, hasOnlyMissingPages),
      action: 'fb_reauth',
      buttonText: 'Continue with Facebook',
      missingPermissions,
      hidden,
      topic,
    }
  }

  if (topic === 'facebook_expired_access_token' || topic === 'facebook_page_permission_error') {
    return {
      message: copy.facebook_expired_access_token(),
      action: 'fb_reauth',
      buttonText: 'Relink Facebook',
      hidden,
      topic,
    }
  }

  if (topic === 'facebook_ad_account_closed') {
    return {
      message: copy[topic](facebookIntegration),
      action: 'link',
      buttonText: 'Email us',
      href: 'mailto:help@tryfeed.co?subject=New ad account, old one closed',
      topic,
    }
  }

  if (topic === 'facebook_ad_account_disabled') {
    return {
      message: copy[topic](facebookIntegration),
      action: 'link',
      buttonText: 'Facebook Ads Manager',
      href: 'https://facebook.com/adsmanager/manage/',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'ad_account_error' && subcode === 'UNSETTLED') {
    return {
      message: copy.unpaid_invoice(facebookIntegration),
      action: 'link',
      buttonText: 'Facebook Billing',
      href: 'https://www.facebook.com/ads/manager/billing/',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'facebook_ad_account_no_funding_source') {
    return {
      message: copy[topic](facebookIntegration),
      action: 'link',
      buttonText: 'Add payment details',
      href: 'https://www.facebook.com/ads/manager/billing/',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'instagram_business_not_connected') {
    return {
      message: copy[topic](),
      action: 'dismiss',
      buttonText: 'Ok',
      hidden: true,
      topic,
    }
  }

  if (topic === 'instagram_page_not_linked') {
    return {
      message: copy[topic](),
      action: 'link',
      buttonText: 'Link Instagram Account',
      href: 'https://www.facebook.com/business/help/898752960195806',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'facebook_non_discrimination_policy') {
    return {
      message: copy[topic](),
      action: 'link',
      buttonText: 'Accept on Facebook',
      href: 'https://www.facebook.com/certification/nondiscrimination',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'facebook_custom_audience_tos') {
    const adAccountId = context.ad_account_id.replace('act_', '')
    return {
      message: copy[topic](),
      action: 'link',
      buttonText: 'Accept Terms on Facebook',
      href: `https://www.facebook.com/customaudiences/app/tos/?act=${adAccountId}`,
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'email_not_confirmed') {
    return {
      message: copy[topic](email.email),
      action: 'email_confirmation',
      buttonText: 'Edit email',
      emailType: email.type,
      hidden,
      topic,
    }
  }

  return {
    message: description,
    action: 'dismiss',
    buttonText: 'Ok',
    hidden,
    topic,
  }
}

const handleInstaErrors = (errors) => {
  const missingInstaBusinessIndex = errors.findIndex(({ topic }) => topic === 'instagram_business_not_connected')
  const missingInstaIdIndex = errors.findIndex(({ topic }) => topic === 'instagram_page_not_linked')
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
  const { topic, subcode = '' } = error
  if (topic === 'facebook-expired-access-token') return 0
  if (topic === 'facebook-missing-permissions') return 1
  if (topic === 'facebook-ad-account-closed') return 2
  if (topic === 'facebook-ad-account-disabled') return 3
  if (topic === 'ad_account_error' && subcode === 'UNSETTLED') return 4
  if (topic === 'instagram-business-not-connected') return 5
  if (topic === 'facebook-ad-account-no-funding-source') return 6
  if (topic === 'instagram_page_not_linked') return 7
  if (topic === 'facebook-non-discrimination-policy') return 8
  if (topic === 'facebook-custom-audience-tos') return 9
  return 999
}

export const formatErrors = (errors) => {
  // Loop through and format all errors
  const formattedErrors = errors.map((error) => {
    const priority = getIntegrationErrorPriority(error)

    return {
      ...error,
      priority,
      topic: error.topic.replace(/-/g, '_'),
      hidden: false,
    }
  })
  // Remove instagram business
  const errorsFiltered = handleInstaErrors(formattedErrors)
  // Sort error by priority
  const sortedErrors = sortArrayByKey(errorsFiltered, 'priority')
  return sortedErrors
}
