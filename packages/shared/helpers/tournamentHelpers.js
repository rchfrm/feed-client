import brandColors from '@/constants/brandColors'

// AUDIENCE and TOURNMANET PROPS
// ------------------------------
export const audienceTypes = [
  {
    id: 'remind_traffic',
    title: 'Warm',
    color: brandColors.red,
    activeTextColor: brandColors.white,
  },
  {
    id: 'entice_traffic',
    title: 'Cool',
    color: brandColors.soundcloud.bg,
    activeTextColor: brandColors.soundcloud.text,
  },
  {
    id: 'entice_engage',
    title: 'Cold',
    color: brandColors.twitter.bg,
    activeTextColor: brandColors.twitter.text,
  },
]

export const tournamentTypes = [
  { id: 'posts', title: 'Posts' },
  { id: 'stories', title: 'Stories' },
]


// FILTER TOURNAMENTS BY ADSET (and POST TYPE)
// ------------------------------------------
/**
 * @param {array} [tournaments]
 * @param {string} [audienceId]
 * @returns {array}
 */
export const filterTournaments = (tournaments, audienceId) => {
  console.log('audienceId', audienceId)
  return tournaments.filter(({ adset: { identifier } }) => identifier === audienceId)
}
