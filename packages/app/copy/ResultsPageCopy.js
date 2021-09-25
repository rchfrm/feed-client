import * as ROUTES from '@/app/constants/routes'
import { formatNumber } from '@/helpers/utils'

export default {
  newAudienceOnPlatformMainDescription: (relativeValue) => `The total number that have engaged with your posts has grown **${relativeValue}%**.`,
  newAudienceUnawareFallbackEngagedDouble: (currValue, prevValue) => `**${formatNumber(currValue)} engaged** with your posts, versus ${formatNumber(prevValue)} last month.`,
  newAudienceUnawareFallbackReachDouble: (currValue, prevValue) => `**${formatNumber(currValue)} saw your posts**, versus ${formatNumber(prevValue)} last month.`,
  newAudienceUnawareFallbackEngagedSingle: (currValue) => `**${formatNumber(currValue)} engaged** with your posts.`,
  newAudienceUnawareFallbackReachSingle: (currValue) => `**${formatNumber(currValue)} saw your posts.**`,
  existingAudienceMainDescription: (adsValue, organicValue) => `Feed reached **${adsValue}%** of your audience, versus your
  organic posts which reached **${organicValue}%** on average.`,
  existingAudienceFallbackSingle: (currValue) => `Feed has reached **${formatNumber(currValue)}** within your existing audience.`,
  existingAudienceFallbackDouble: (currValue, prevValue) => `Feed has reached **${formatNumber(currValue)}** within your existing audience, versus **${formatNumber(prevValue)}** last month.`,

  postDescription: (type) => {
    if (type === 'engaged') {
      return `The post that engaged the
      most new people:`
    }
    return `The post that reached the most people
    from your existing audience:`
  },
  postDescriptionMobile: (type, value) => {
    if (type === 'engaged') {
      return `**${value}** new people engaged`
    }
    return `**${value}** people reached`
  },
  statsNoData: 'Feed is setting up your ads',
  postsStatsNoData: `Once you’ve been using Feed for a few weeks,
  your most effective ads, and a month to month
  comparison will appear here.`,
  conversionsActivatorTitle: 'Use Feed to generate sales or sign-ups outside Facebook & Instagram.',
  conversionsActivatorDescription: 'Get started with generating sales or sign-ups!',
  noResultsData: `There is currently no results data available. Set a budget and start promoting your posts [here](${ROUTES.CONTROLS})!`,
}
