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
  existingAudienceFallbackDouble: (prevValue, currValue) => `Feed has reached **${formatNumber(currValue)}** within your existing audience, versus **${formatNumber(prevValue)}** last month.`,
  conversionMainDescription: (roas) => `Feed’s conversion ads generated **${roas}x** more in sales than was spent.`,
  conversionFallbackSalesDouble: (currValue, prevValue) => `Feed’s conversion ads generated ${currValue} in sales versus ${prevValue} last month.`,
  conversionFallbackSalesSingle: (currValue) => `Feed’s conversion ads generated ${currValue} in sales.`,
  conversionFallbackOptimisationEvents: 'Feed’s conversion ads generated 68 [optimisation events].',
  conversionFallbackLandingPageViews: (currValue) => `${currValue} people have visited your website as a result of seeing [optimisation event detail].`,
  conversionFallbackOutboundClicks: (currValue) => `${currValue} people clicked through to your website as a result of seeing [optimisation event detail].`,
  conversionFallbackReach: (currValue) => `${currValue} people saw [optimisation event detail].`,
  postDescription: (type) => {
    if (type === 'engage') {
      return `The post that engaged the
      most new people:`
    }
    if (type === 'reach') {
      return `The post that reached the most people
      from your existing audience:`
    }
    return `The post that generated the
    most sales:`
  },
  postLabelText: (type) => {
    if (type === 'engage') {
      return 'engaged'
    }
    if (type === 'reach') {
      return 'reached'
    }
    return 'in sales'
  },
  postDescriptionMobile: (type, value) => {
    if (type === 'engage') {
      return `**${value}** new people engaged`
    }
    if (type === 'reach') {
      return `**${value}** people reached`
    }
    return `**${value}** in sales`
  },
  statsNoData: 'Feed is setting up your ads',
  postsStatsNoData: (isSpendingPaused) => {
    if (isSpendingPaused) {
      return `Your spending is currently paused. [Resume](${ROUTES.CONTROLS}) in order to see your most effective posts here.`
    }

    return `Once you’ve been using Feed for a few weeks,
  your most effective ads, and a month to month
  comparison will appear here.`
  },
  conversionsActivatorTitle: 'Use Feed to generate sales or sign-ups outside Facebook & Instagram.',
  conversionsActivatorDescription: 'Get started with generating sales or sign-ups!',
  noResultsData: `There is currently no results data available. Set a budget and start promoting your posts [here](${ROUTES.CONTROLS})!`,
}
