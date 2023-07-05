import { abbreviateNumber, capitalise } from '@/helpers/utils'

const dictionary = {
  28: 'month',
  365: 'year',
}

export default {
  audiencesLabel: ({ name, approximateCount, retentionDays, platform }) => {
    const baseString = `**${abbreviateNumber(approximateCount)}**`

    if (['1y', '28d'].some((period) => name.includes(period))) {
      return `${baseString} engaged on ${capitalise(platform)} last ${dictionary[retentionDays]}`
    }

    if (name.includes('followers')) {
      return `${baseString} followers on ${capitalise(platform)}`
    }

    if (name.includes('Website Visitors')) {
      return `${baseString} website visitors`
    }
  },
  lookalikesAudiencesLabel: ({ name, approximateCount, countries }) => {
    const baseString = `**${abbreviateNumber(approximateCount)}** similar to`

    const getCountriesString = (countries) => {
      if (countries.length === 1) {
        return `${countries[0]}`
      }

      if (countries.length > 3) {
        return `${countries.length} countries`
      }

      const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
      return formatter.format(countries)
    }

    if (['1y', '28d'].some((period) => name.includes(period))) {
      return `${baseString} people who have engaged with you in ${getCountriesString(countries)}`
    }

    if (name.includes('Ig followers')) {
      return `${baseString} your Instagram followers in ${getCountriesString(countries)}`
    }

    if (name.includes('Website Visitors')) {
      return `${baseString} your website visitors in ${getCountriesString(countries)}`
    }
  },
}
