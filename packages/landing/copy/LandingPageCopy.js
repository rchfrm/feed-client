/* eslint-disable quotes */
const primaryCTAText = 'Request Access'
export const blogSlug = '/blog'
export const jobSlug = '/jobs'

export default {
  navigation: {
    headerLinks: [
      {
        text: `What's Feed?`,
        href: `#features`,
      },
      {
        text: `About Us`,
        href: `/blog/why-we-are-building-feed`,
      },
      {
        text: `Blog`,
        href: blogSlug,
      },
      {
        text: `Pricing`,
        href: `/pricing`,
      },
      {
        text: 'FAQs',
        href: 'https://app.tryfeed.co/faqs',
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
