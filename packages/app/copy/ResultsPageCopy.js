import brandColors from '@/constants/brandColors'

export const postResultsConfig = [
  {
    type: 'growth',
    color: brandColors.blue,
  },
  {
    type: 'reach',
    color: brandColors.green,
  },
  {
    type: 'convert',
    color: brandColors.redLight,
  },
]

export default {
  audienceSizeDescription: (relativeValue) => `The total number that have engaged with your posts has grown **${relativeValue}%**.`,
  reachDescription: (adsValue, organicValue) => `Feed reached **${adsValue}%** of your audience, versus your
  organic posts which reached **${organicValue}%** on average.`,

  postDescription: (type) => {
    if (type === 'growth') {
      return `The post that engaged the
      most new people:`
    }
    return `The post that reached the most people
    from your existing audience:`
  },
  postDescriptionMobile: (type, [valueA]) => {
    if (type === 'growth') {
      return `**${valueA}** new people engaged`
    }
    return `**${valueA}** people reached`
  },
  statsNoData: 'Feed is setting up your ads',
  postsStatsNoData: `Once you’ve been using Feed for a few weeks,
  your most effective ads, and a month to month
  comparison will appear here.`,
}
