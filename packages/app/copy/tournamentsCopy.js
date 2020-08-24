/* eslint-disable quotes */

export default {
  noTournamentAds: `This tournament does not contain any ads.

  This might be because the budget is too low, or there aren't enough approved ads ready to go. Try opting in a few more posts/stories on the posts page.`,

  noTournaments: (tournamentType) => `There aren't any tournaments for this audience!

This might be because the budget has been too low, or there haven't yet been any approved ads ready to go. Try opting in a few more ${tournamentType} on the posts page.`,

  // METRICS TOOLTIPS
  metricTooltips: {},

  // FILTER TOOLTIPS
  // ----------------
  filterTooltips: {
    remind_traffic: (title) => `#### ${title}

1. People who have engaged with your Facebook and Instagram before, but not recently. 
2. This audience also includes people who don’t follow you yet, but have engaged with a post or ad.
3. Over time, Feed aims to turn your warm audience into followers, fans and customers.`,

    entice_traffic: (title) => `#### ${title}

1. An audience of people with similar interests to your Warm audience who are likely to click on an ad in order to find out more.
2. This is an audience of ‘new’ people who haven’t heard of you before.`,

    entice_engage: (title) => `#### ${title}

1. People with similar interests to your Warm audience who are likely to engage with what you’re doing
2. This is an audience of ‘new’ people who haven’t heard of you before.`,
  },
}
