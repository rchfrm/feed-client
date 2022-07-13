/* eslint-disable quotes */

export default {
  outro: `We’ll show you historical data once you’ve been using **Feed** for a week or so.`,

  spendSummary: (days, spend) => `In the last ${days} days, you've **spent ${spend}**`,

  impressionSummary: (totalImpressions) => {
    if (totalImpressions === 0) return '.'
    return `, and your posts were seen **${totalImpressions}** times.`
  },
}
