/* eslint-disable quotes */

export default {
  noTournamentAds: `This tournament does not contain any ads.

  This might be because the budget is too low, or there aren't enough approved ads ready to go. Try opting in a few more posts/stories on the posts page.`,

  noTournaments: (tournamentType) => `There aren't any tournaments for this audience!

This might be because the budget has been too low, or there haven't yet been any approved ads ready to go. Try opting in a few more ${tournamentType} on the posts page.`,
}
