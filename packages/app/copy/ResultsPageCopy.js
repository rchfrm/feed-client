import { formatNumber } from '@/helpers/utils'

export default {
  newAudienceOnPlatformDescription: (relativeValue) => `The total number that have engaged with your posts has grown **${relativeValue}%**.`,
  newAudienceUnawareEngagedDouble: (currValue, prevValue) => `**${formatNumber(currValue)} engaged** with your posts, versus ${formatNumber(prevValue)} last month.`,
  newAudienceUnawareReachDouble: (currValue, prevValue) => `**${formatNumber(currValue)} saw your posts**, versus ${formatNumber(prevValue)} last month.`,
  newAudienceUnawareEngagedSingle: (currValue) => `**${formatNumber(currValue)} engaged** with your posts.`,
  newAudienceUnawareReachSingle: (currValue) => `**${formatNumber(currValue)} saw your posts.**`,
  existingAudienceDescription: (adsValue, organicValue) => `Feed reached **${adsValue}%** of your audience, versus your
  organic posts which reached **${organicValue}%** on average.`,

  postDescription: (type) => {
    if (type === 'growth') {
      return `The post that engaged the
      most new people:`
    }
    return `The post that reached the most people
    from your existing audience:`
  },
  postDescriptionMobile: (type, value) => {
    if (type === 'growth') {
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
}
