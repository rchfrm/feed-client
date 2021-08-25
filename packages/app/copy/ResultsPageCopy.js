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
  reachDescription: (adsValue, organicValue) => `Feed’s ads reached upto **${adsValue}%** of your audience,
  compared with organic reach of upto **${organicValue}%**.`,
  postDescription: (type, [valueA, valueB]) => {
    if (type === 'growth') {
      return `The most engaging post added
      **${valueA} new people** to your audience.`
    }
    return `**${valueA} people reached**, ${valueB}% of your
    audience by one post alone.`
  },
  postDescriptionMobile: (type, [valueA]) => {
    if (type === 'growth') {
      return `**${valueA}** new people engaged`
    }
    return `**${valueA}** people reached`
  },
}
