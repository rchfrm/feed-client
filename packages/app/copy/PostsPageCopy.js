/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'
import { getIntegrationInfo } from '@/helpers/integrationHelpers'

export default {
  noPostsCopy: {
    // If no posts when filtering to all
    all: () => `Looks like you haven’t posted on Facebook or Instagram yet. When you do start posting, your posts will appear here.`,

    // No active posts with budget
    activeWithBudget: (inactiveTitle) => `**Feed** is setting up your posts for promotion. There may be a delay whilst your ads await approval.

Been waiting a while? Check you have posts opted in for promotion in the _${inactiveTitle}_ tab.`,

    // No active posts without budget
    activeNoBudget: () => `Currently, none of your posts are running as ads because you don’t have a budget set. Get started by entering a daily budget [here](${ROUTES.CONTROLS}).`,

    // Archive
    archive: () => `After you’ve been using Feed for a little while, posts that have previously run as ads will appear here.`,

    // If no posts when filtered
    other: (promotionStatus) => {
      return `There are currently no posts in the ${promotionStatus} state. Maybe try a different category.`
    },

    // All and New user
    allNewUser: () => `**Feed** is fetching your posts - please wait a few moments and then click the button to refresh the page.`,

    // All and Old user
    allOldUser: () => `Looks like you haven’t posted on Facebook or Instagram yet. When you do start posting, your posts will appear here.`,
  },

  noDefaultLinkWarning: `**You need to set the default link used in your ads before they can run.**

You can _**add links**_ via the Links button below and _**set a default link**_ in Settings`,

  // POST SETTINGS
  // --------------
  globalToggleIntro: `Should all posts be opted-in for promotion by default?`,

  globalConnectionsIntro: `Add the links that you'd like to use in your ads.

Adding links to your profiles on _Twitter_, _YouTube_, _Soundcloud_, and _Spotify_ will also enable **Feed** to track the number of followers you have on the Insights page. `,

  globalConnectionsTooltipSlides: [
    `Set the default link used in every ad by clicking the asterisk (*) to the left of the link. You can still set different links on individual posts.`,
    `The other icons are suggested links, but you can use any field for any link.`,
  ],

  globalStatusConfirmation: `Are you sure?

Changing this will update the current status on all your current and future posts.

Posts you've manually switched on or off won't be affected.

**This process might take a while, so please don’t refresh the page.**

Do you want to continue?`,

  linkTrackingIntro: `Should UTM parameters be added automatically to the end of links?`,

  // Warning when turning off active post
  postStatusConfirmation: `Ads created from this post will soon stop running to all audiences.

  This post will not be eligible to run as an ad in the future.`,

  defaultLinkIntro: `By default, which link should be used in ads? This determines where people go when they click one of your ads.`,

  facebookPixelIntro: `Your Facebook Pixel can be used to track purchases and other events on your website. Find [instructions on how to install a Pixel here](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).`,

  // FILTER TOOLTIPS
  // ----------------
  filterTooltips: {
    active: (title) => `#### ${title}

Posts that are currently running as ads to at least one audience.`,

    inactive: (title) => `#### ${title}

Posts that Feed hasn't yet made into ads. For the best results select as many as possible.`,

    archived: (title) => `#### ${title}

1. Posts that have run as ads previously, but are not currently running as ads.
2. Feed turns off posts that don’t perform as well automatically.
3. Posts can also appear here if you stop it running manually, or if people have been shown the ad too many times.`,
  },


  // TOGGLE TOOLTIPS
  // ----------------
  toggleTooltipSlides: {
    inactive: [
      `This switch indicates whether Feed can promote the post…`,

      `Initially, the post will follow your default promotion setting.

To override this, slide the switch to the right to let Feed promote the post, or left to prevent Feed promoting this post.`,

      `You can change your default settings using the ‘Post Settings’ button at the top of the posts page.

By default, Feed won’t promote posts older than 28 days unless you opt them in.`,
    ],
    active: [
      `To switch off a post that's currently running, slide to the left. The post will stop being promoted within 15 minutes.`,

      `N.B. Once you have manually stopped a post running, you may not be able to start it again.`,
    ],
  },

  // SCORE TOOLTIPS:
  scoreTooltip: {
    organic: [
      `This shows how popular the post is with your existing following. The higher the number, the more popular the post.`,
      `Feed prioritises posts with a higher Organic Score when deciding which ads to create.`,
      `The score takes into account different types of data, including likes, comments and views.`,
    ],
    paid: [
      `This shows how well this post is performing as an ad. A higher number means better performance.`,
      `It is an aggregate of the scores across the different audiences that see the ad.`,
      `Feed automatically keeps the best performing posts running and turns off those that don’t do as well.`,
      `The score takes into account different types of data, such as clicks, likes and views.`,
    ],
  },

  // SETTINGS SIDEPANEL
  postLinkSetting: 'Which link should be used when this post is made into an ad?',
  editCaption: `Edit the caption used in this ad.`,
  confirmEditCaption: `**This feature is being tested!**

Editing the caption will put this post back into review, and it will temporarily move to 'Inactive'.

There may be a delay before this post can start running again.

If you need to make sure this post starts running as soon as it's approved, [email us](mailto:help@tryfeed.co).

Are you sure you want to continue?`,

  // METRICS SIDEPANEL
  metricsDescription: {
    paid: 'Performance data showing how well this post did as an ad. Metrics and score are aggregated across the difference audiences that see the ad.',
    organic: 'Performance data showing how well this post performed with your existing following.',
  },


  // LINKS
  confirmDeleteFolder: `**Are you sure**?

Deleting a folder will delete all the links inside it.`,

  confirmDeleteUsedLinkFolder: (itemType) => {
    if (itemType === 'folder') {
      return `**This folder contains a link that is currently selected on at least one post that hasn't yet run as an ad ('Not Run').**

If you delete it, the post will revert to using the default link. Are you sure you want to continue?`
    }
    return `**This link is currently selected on at least one post that hasn't yet run as an ad ('Not Run').**

If you delete it, these posts will revert to the default link. Are you sure you want to continue?`
  },

  integrationLinksIntro: `Integrations are what Feed uses to connect with and show you data from other platforms.`,

  getLinkDisabledReason: ({ isPostActive, isPostArchived, isLinkAdCreative }) => {
    if (isPostActive) return 'Link not editable because this ad is currently running.'
    if (isPostArchived) return 'Link not editable because this ad has been turned off.'
    if (isLinkAdCreative) return 'Link not editable because this post has been turned into an ad and will begin running soon.'
    return ''
  },

  // LINK TRACKING
  linkTrackingExplanation: (defaultLink = 'www.artistname.com') => `UTM parameters are automatically added to the links used in your ads. This means you can track how many people Feed is sending to your website, and what they do when they get there.

Here's an example of what a link will look like:

> _${defaultLink}?utm_source=feed&utm_medium=social_

Soon we'll be letting you track this within the Feed platform, but if you already have access to Google Analytics for the website(s) your ads link to, you can view information about the people visiting via Feed's ads by going to Acquisition > All Traffic > Source/Medium.
`,


  checkSaveAsIntegration: (platform) => {
    const intro = `It looks like you're trying to add an integration link.`
    if (platform === 'spotify') {
      return `${intro}

Do you want to add **Spotify** as an integration instead?

This way you can use the link in your ads, and track follower and listener data on the Insights page, and include Spotify listeners in your audience calculation on the Controls page?`
    }
    const { title: platformTitle } = getIntegrationInfo({ platform })
    return `${intro}

Do you want to add **${platformTitle}** as an integration instead?

This way you can use the link in your ads and track follower and listener data on the Insights page?`
  },

  // CONVERSIONS INTEREST
  conversionsInterestCopy: `Are you looking for more sales of tickets, vinyl or other products and to generate a return from your Feed budget?

If so, we're looking for people to join our trials for this feature and work with Nick and Joshua (the co-founders of Feed) directly on a campaign.

[Fill in this form](https://docs.google.com/forms/d/e/1FAIpQLSd4PRRgbyFc0jVYODiBMvX-e24XzFf93QhFhv5CAoGoaeIM2g/viewform) and we'll be in touch.`,

}
