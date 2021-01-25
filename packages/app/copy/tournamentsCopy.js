/* eslint-disable quotes, import/prefer-default-export */
import * as ROUTES from '@/app/constants/routes'

export const metricTooltips = {}

export const copy = {
  // If landing on T page without ad type  or audience ID
  noQueryDefined: `No audience or ad type has been specified.
  
Please [visit the results page](${ROUTES.RESULTS}) to make your selection.`,

  noTournamentAds: `This tournament does not contain any ads.

  This might be because the budget is too low, or there aren't enough approved ads ready to go. Try opting in a few more posts/stories on the posts page.`,

  noTournaments: (tournamentType) => `There aren't any tournaments for this audience!

This might be because the budget has been too low, or there haven't yet been any approved ads ready to go. Try opting in a few more ${tournamentType} on the posts page.`,
}
