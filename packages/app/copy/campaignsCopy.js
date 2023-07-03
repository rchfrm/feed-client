import { abbreviateNumber, capitalise } from '@/helpers/utils'

export default {
  nodeLabel: ({ name, platform, approximateCount, retentionDays, countries }) => {
    const dictionary = {
      28: 'month',
      365: 'year',
    }

    const getCountriesString = (countries) => {
      if (countries.length === 1) {
        return `${countries[0]}`
      }

      if (countries.length > 3) {
        return `${countries.length} countries`
      }

      return `${countries.join(',')}`
    }

    const getPlatformString = (platform) => {
      if (! platform) {
        return 'people who have'
      }

      return `your ${capitalise(platform)} followers`
    }

    if (name.includes('Lookalike')) {
      return `**${abbreviateNumber(approximateCount)}** similar to ${getPlatformString(platform)} in ${getCountriesString(countries)}`
    }

    if (['1y', '28d', '7d'].some((period) => name.includes(period))) {
      return `**${abbreviateNumber(approximateCount)}** engaged on ${capitalise(platform)} last ${dictionary[retentionDays]}`
    }

    if (name.includes('followers')) {
      return `**${abbreviateNumber(approximateCount)}** followers on ${capitalise(platform)}`
    }
  },
}
