/* eslint-disable quotes */
const primaryCTAText = 'Request Access'
export const blogSlug = '/blog'

export default {
  navigation: {
    headerLinks: [
      {
        text: `Pricing`,
        href: `/pricing`,
      },
    ],
    options: [
      `[What's Feed?](#features)`,
      '[Pricing](/pricing)',
      `[Blog](/blog)`,
      '[About us](/blog/why-we-are-building-feed)',
    ],
    primaryCTAText,
    secondaryCTAText: `Log in`,
  },

  header: 'Add real people to your audience',
  description: 'Feed automates **Meta** campaigns: taking care of audience creation, campaign set up and continuous optimisation.\n\nThe platform maximises your budget to reach real, engaged people. No bots.',
  features: [
    {
      id: 'feature-1',
      header: 'Get started in minutes',
      copy: 'Once you connect Feed to your ad account, you can start running campaigns in minutes.\n\nNo need to manually set up audiences or campaigns.',
    },
    {
      id: 'feature-2',
      header: 'Unique insights',
      copy: 'Feed provides unique insight into your audience. Breakdown follower growth by age, gender, city and country.\n\nSo you can hone in on what works best.',
    },
    {
      id: 'feature-3',
      header: 'Clear, shareable reports',
      copy: 'Our reports show the impact of your campaigns in a format and language that\'s clear and simple.\n\nAllowing you to share them with the whole team.',
    },
    {
      id: 'feature-4',
      header: 'Promote organic posts',
      copy: 'The algorithm analyses existing social media posts to identify what has potential as an ad.\n\nThis means there\'s no need to create new content or get additional sign off.',
    },
    {
      id: 'feature-5',
      header: 'Always-on testing process',
      copy: 'Creatives are continuously tested against each other to identify the best performers. Those that don\'t perform are swapped for the next creative in the queue every 48 hours.\n\nYou can decide the order or let Feed optimise for you.',
    },
  ],

  mailchimp: {
    placeholder: `Enter email`,
    marketingLabel: `Marketing Permissions`,
    marketingP: `Tick the box to confirm you're happy to receive emails from us.`,
    unsubscribe: `Unsubscribe whenever you like by clicking the link in one of our emails.\n\nRead our privacy policy [here](https://archform.ltd/privacy/).`,
    privacy: `Our mailing list is managed by Mailchimp, by clicking sign up you acknowledge that your details will be transferred to them for processing.\n\nFind MailChimp's privacy policy [here](https://mailchimp.com/legal/privacy/).`,
  },

  footer: {
    socials: [
      {
        name: `Instagram`,
        href: `https://instagram.com/feed.hq`,
      },
      {
        name: `LinkedIn`,
        href: `https://www.linkedin.com/company/feedhq/`,
      },
    ],
    legalCopy: {
      colophon: `**Feed**`,
    },
  },
}
