import { abbreviateNumber, capitalise } from '@/helpers/utils'

export default {
  nodeLabel: (name, platform, approximateCount, retentionDays) => {
    const dictionary = {
      7: 'week',
      28: 'month',
      365: 'year',
    }

    if (name.includes('Lookalike')) {
      return `**${abbreviateNumber(approximateCount)}** similar to your ${capitalise(platform)} followers`
    }

    if (['1y', '28d', '7d'].some((period) => name.includes(period))) {
      return `**${abbreviateNumber(approximateCount)}** engaged on ${capitalise(platform)} last ${dictionary[retentionDays]}`
    }

    if (name.includes('followers')) {
      return `**${abbreviateNumber(approximateCount)}** followers on ${capitalise(platform)}`
    }
  },
}
