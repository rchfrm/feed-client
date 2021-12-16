import produce from 'immer'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'
import * as utils from '@/helpers/utils'

export const sortUserArtists = (user) => {
  return produce(user, draft => {
    draft.artists = sortArtistsAlphabetically(Object.values(user.artists))
  })
}

export const isForcedEmailConfirmation = (user) => {
  const isNewUser = utils.testTimeDiff(user.createdAt, 'hours', 24)
  const isForcedEmailConfirmation = isNewUser && user.is_email_verification_needed && !user.email_verified
  return isForcedEmailConfirmation
}

/**
 * @param {object} user
 * @param {string} orgTypes 'owned' | 'all'
 * @returns {array}
 */
export const getUserOrganizations = (user, orgTypes = 'owned') => {
  const { organizations } = user
  return Object.values(organizations).reduce((orgs, org) => {
    const { role } = org
    // If handling all org types, add Org to array
    if (orgTypes === 'all') return [...orgs, org]
    // Else only add if owned or admin
    if (role === 'owner' || role === 'admin') return [...orgs, org]
    // Else skip org
    return orgs
  }, [])
}
