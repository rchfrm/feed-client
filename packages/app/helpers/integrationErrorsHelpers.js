import copy from '@/app/copy/integrationErrorsCopy'
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
    id,
    topic,
    description,
    hidden,
  } = error

  // Get facebook integration
  const facebookIntegration = artist ? getArtistIntegrationByPlatform(artist, 'facebook') : null

  if (topic === 'facebook-missing-permissions') {
    return {
      message: description,
      action: 'fb_reauth',
      buttonText: 'Continue with Facebook',
      hidden,
      topic,
    }
  }

  if (topic === 'facebook-expired-access-token' || topic === 'facebook-page-permission-error') {
    return {
      message: description,
      action: 'fb_reauth',
      buttonText: 'Relink Facebook',
      hidden,
      topic,
    }
  }

  if (topic === 'facebook-ad-account-closed') {
    return {
      message: description,
      action: 'link',
      buttonText: 'Email us',
      href: 'mailto:help@tryfeed.co?subject=New ad account, old one closed',
      topic,
    }
  }

  if (topic === 'facebook-ad-account-disabled') {
    return {
      message: description,
      action: 'link',
      buttonText: 'Facebook Ads Manager',
      href: 'https://facebook.com/adsmanager/manage/',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'facebook-ad-account-no-funding-source') {
    return {
      message: description,
      action: 'link',
      buttonText: 'Add payment details',
      href: 'https://www.facebook.com/ads/manager/billing/',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'instagram-business-not-connected') {
    return {
      id,
      message: description,
      action: 'dismiss',
      buttonText: 'Ok',
      hidden,
      topic,
    }
  }

  if (topic === 'facebook-non-discrimination-policy') {
    return {
      message: description,
      action: 'link',
      buttonText: 'Accept on Facebook',
      href: 'https://www.facebook.com/certification/nondiscrimination',
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'facebook-custom-audience-tos') {
    return {
      message: description,
      action: 'link',
      buttonText: 'Accept Terms on Facebook',
      href: `https://www.facebook.com/customaudiences/app/tos/?act=${facebookIntegration?.accountId}`,
      fbLink: true,
      hidden,
      topic,
    }
  }

  if (topic === 'email-not-confirmed') {
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
