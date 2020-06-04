/* eslint-disable quotes */
import * as ROUTES from '@/constants/routes'

export default {
  intro: `On this page you can view insights from your following across different platforms 📈.

  You can view a combination of metrics, or select just one to see more detail.
  `,
  outro: `Can’t see one of your accounts? Just add it on the [account page](${ROUTES.CONNECTIONS}).

  We’ll show you historical data for the platforms you’ve selected once you’ve been using the app long enough. Think there should be historical data? Try selecting only the platform you want to see.
  `,

  spendSummary: (days, spend) => `In the last ${days} days, you've **spent ${spend}**`,

  impressionSummary: (totalImpressions) => {
    if (totalImpressions === 0) return '.'
    return `, and your posts were seen **${totalImpressions}** times.`
  },
}
