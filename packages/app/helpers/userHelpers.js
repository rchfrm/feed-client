import produce from 'immer'
import { sortArtistsAlphabetically } from '@/app/helpers/artistHelpers'

export const sortUserArtists = (user) => {
  return produce(user, draft => {
    const { artists } = draft
    draft.artists = sortArtistsAlphabetically(artists)
    return draft
  })
}
