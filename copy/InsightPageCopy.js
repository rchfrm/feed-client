/* eslint-disable quotes */
import * as ROUTES from '@/constants/routes'

export default {
  outro: `Can’t see one of your accounts? Just add it via ‘Post settings’ on the [posts page](${ROUTES.POSTS}).

We’ll show you historical data once you’ve been using Feed for a week or so.`,

  spendSummary: (days, spend) => `In the last ${days} days, you've **spent ${spend}**`,

  impressionSummary: (totalImpressions) => {
    if (totalImpressions === 0) return '.'
    return `, and your posts were seen **${totalImpressions}** times.`
  },
}
