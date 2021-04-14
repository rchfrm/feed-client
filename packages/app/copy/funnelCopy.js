/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

const audienceProps = {
  growA: {
    title: 'Grow A',
    tooltip: ``,
    description: 'Find new audiences, build an engaged audience on social media.',
    noAds: {
      posts: () => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
      stories: (minBudget) => `**No ads running**. [Opt in more stories](${ROUTES.POSTS}?postStatus=not-run) and ensure budget is ${minBudget} to enable this audience and boost performance.
      `,
    },
  },
  growB: {
    title: 'Grow B',
    tooltip: ``,
    description: 'Find new audiences likely to visit your website or streaming profile.',
    noAds: {
      posts: (minBudget) => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.`,
      stories: (minBudget) => `**No ads running**. [Opt in more stories](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.
      `,
    },
  },
  nurture: {
    title: 'Nurture',
    tooltip: ``,
    description: 'Invest in the relationships with your engaged audience using retargeting.',
    noAds: {
      posts: () => `**No ads running**. [Opt in more posts](${ROUTES.POSTS}?postStatus=not-run) to enable this audience and boost performance.`,
      stories: (minBudget) => `**No ads running**. [Opt in more stories](${ROUTES.POSTS}?postStatus=not-run) and make sure your budget is set to ${minBudget} to enable this audience and boost performance.`,
    },
  },
  hot: {
    title: 'hot',
    description: 'Coming soon bro',
  },
}

export default {
  // FUNNEL VIZ INTRO TEXT
  funnelVizIntroText: `Review which ads are currently running to different audience types and see which are performing best.`,
  // NO ACTIVE ADS TEXT
  noActiveAds: (postsType) => `**You have no ads running.** Unpause Feed and set a budget from the [Controls page](${ROUTES.CONTROLS}) and opt in some ${postsType} on the [posts page](${ROUTES.POSTS}?postStatus=not-run) to get started.`,
  // AUDIENCE TEXT
  ...audienceProps,
  // NEED HELP TEXT
  needHelp: `Feed helps you find new audiences, keep your whole following engaged and ultimately grow income from your biggest supporters.

This page shows what ads are currently running and to which audiences. There is a description of each audience below. 

### ${audienceProps.growA.title}
  
People who haven’t heard of you yet, but are likely to engage. Feed grows an [audience of people who have engaged with you](${ROUTES.INSIGHTS}?dataset=instagram_engaged_1y), and over time via Nurture turns those people into followers and drives deeper engagement.

### ${audienceProps.growB.title}

People who haven’t heard about you before, but are likely to visit your website or an external channel/streaming profile. People who do this automatically fall into your [engaged audience](${ROUTES.INSIGHTS}?dataset=instagram_engaged_1y).

### ${audienceProps.nurture.title}

Feed empowers you to invest in the relationships with your [engaged audience](${ROUTES.INSIGHTS}?dataset=instagram_engaged_1y) to create your biggest supporters. This isn’t just your followers and people you can reach organically, but anyone who has engaged with you before. Keep the conversation going and get more posts in front of your engaged audience to build followers, website visitors and customers/superfans over time.`,

}
