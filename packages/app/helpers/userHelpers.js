import produce from 'immer'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'

export const sortUserArtists = (user) => {
  return produce(user, draft => {
    const { artists } = draft
    draft.artists = sortArtistsAlphabetically(Object.values(artists))
    return draft
  })
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
