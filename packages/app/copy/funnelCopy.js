/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

const audienceProps = {
  growA: {
    title: 'Grow A',
    tooltip: ``,
    description: 'Find new audiences, build an engaged audience on social media.',
    noAds: () => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
  },
  growB: {
    title: 'Grow B',
    tooltip: ``,
    description: 'Find new audiences likely to visit your website or streaming profile.',
    noAds: (minBudget) => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.`,
  },
  nurture: {
    title: 'Nurture',
    tooltip: ``,
    description: 'Invest in the relationships with your engaged audience using retargeting.',
    noAds: () => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
  },
  hot: {
    title: 'hot',
    description: 'Coming soon bro',
  },
}

export default {
  // FUNNEL VIZ INTRO TEXT
  funnelVizIntroText: `Review which ads are currently running to difference audience types and see which are performing best.`,
  // NO ACTIVE ADS TEXT
  noActiveAds: `**You have no ads running.** Unpause Feed and set a budget from the [Controls page](${ROUTES.CONTROLS}) and opt in some posts on the [posts page](${ROUTES.POSTS}?postStatus=not-run) to get started.`,
  // AUDIENCE TEXT
  ...audienceProps,
  // NEED HELP TEXT
  needHelp: `Feed helps you find new audiences, keep them engaged, develop the relationship with your fans and grow revenue from your biggest supporters.

### ${audienceProps.growA.title}
  
People who haven’t heard of you yet, but are likely to engage. Feed grows an [audience of people who have engaged with you](${ROUTES.INSIGHTS}?dataset=instagram_engaged_1y), and over time via Nurture turns those people into followers who stream your music and buy tickets, records and merch.

### ${audienceProps.growB.title}

People who haven’t heard about you before, but are likely to visit your website or streaming profile. People who do automatically fall into your [engaged audience](${ROUTES.INSIGHTS}?dataset=instagram_engaged_1y).

### ${audienceProps.nurture.title}

Feed empowers you to invest in the relationships with your [engaged audience](${ROUTES.INSIGHTS}?dataset=instagram_engaged_1y) to create your biggest supporters. This isn’t only your followers and people you can’t reach organically, but anyone who has engaged with you before. Keep the conversation going, get more posts in front of your engaged audience and build followers and fans over time.`,

}
