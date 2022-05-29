import referralAmounts from '@/constants/referralAmounts'
import { formatCurrency } from '@/helpers/utils'

const getReferralAmount = (currencyCode) => {
  const referralAmount = referralAmounts[currencyCode]
  const currency = referralAmount ? currencyCode : 'GBP'

  return formatCurrency(referralAmount || 75, currency, true)
}

export default getReferralAmount
