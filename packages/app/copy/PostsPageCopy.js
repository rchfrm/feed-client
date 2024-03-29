/* eslint-disable quotes */
import { getIntegrationInfo } from '@/helpers/integrationHelpers'

export const getPostTypePlural = (type) => {
  if (type === 'post') return 'posts'
  if (type === 'reels') return 'reels'
  if (type === 'story') return 'stories'

  return 'posts'
}

export default {
  noPostsCopy: {
    // If no posts when filtering to all
    all: () => `No posts.`,

    // If no posts when filtered
    filtered: () => {
      return `Looks like there are no posts that match the filters you've selected.`
    },
  },

  spendingPaused: 'Your campaigns are paused. Set a budget from the controls page to start running ads.',

  // POST SETTINGS
  // --------------
  globalConnectionsIntro: `Add the links that you'd like to use in your ads.

Adding links to your profiles on _Twitter_, _YouTube_, _Soundcloud_, and _Spotify_ will also enable **Feed** to track the number of followers you have on the Results page. `,

  globalConnectionsTooltipSlides: [
    `Set the default link used in every ad by clicking the asterisk (*) to the left of the link. You can still set different links on individual posts.`,
    `The other icons are suggested links, but you can use any field for any link.`,
  ],

  globalStatusConfirmation: (postType) => `Are you sure?

  This will change which current and future ${getPostTypePlural(postType)} are automatically promotable.

  Those you've manually switched on or off won't be affected.

**This process might take a while, so please don't refresh the page.**

Do you want to continue?`,

  linkTrackingIntro: `Should UTM parameters be added automatically to the end of links?`,

  // Warning when turning off active post
  disablePostWarning: (isPostActive, campaignType) => {
    if (isPostActive) {
      return `Ads created from this post will soon stop running to ${campaignType === 'all' ? 'Grow & Nurture' : 'Convert'} audiences.`
    }

    return 'By turning off this post there will be no posts available to run ads with. Do you want to pause the budget instead?'
  },

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
  postSettingsIntro: (campaignType) => `Settings for the ${campaignType === 'all' ? '"Grow & Nurture"' : '"Convert"'} part of the funnel. Here you can decide whether to enable this post for ${campaignType === 'all' ? 'grow & nurture' : 'conversions'} campaigns, and which link, call to action and caption to use.`,
  postLinkSetting: 'Which link should be used when this post is made into an ad?',
  postCallToActionSetting: 'Which call to action should be used when this post is made into an ad?',
  editCaption: "Edit the text used in this ad. The text of the original post <span className='bold underline'>won't</span> be affected.",
  confirmEdit: (type) => `**Update ${type}**

Editing the ${type} will put this post back into review, and it will temporarily move to 'In Review'.

Facebook's approval process usually takes less than 24 hours, and the post will run again once approved.

Are you sure you want to continue?`,

  // RESULTS SIDEPANEL
  resultsDescription: 'Performance data showing how well this post did as an ad. Results and score are aggregated across the difference audiences that see the ad.',

  // LINKS
  confirmDeleteFolder: `**Are you sure**?

Deleting a folder will delete all the links inside it.`,

  confirmDeleteUsedLinkFolder: (itemType) => {
    if (itemType === 'folder') {
      return `**This folder contains a link that is currently selected on at least one post that hasn't yet run as an ad ('Not Run').**

If you delete it, the post will revert to using the default link. Are you sure you want to continue?`
    }
    return `**This link is currently selected on at least one post.**

    If you delete it, Running and Inactive posts with this link will continue to use it. Not Run posts using this link will revert to the default link.

    Are you sure you want to continue?`
  },

  checkSaveAsIntegration: (platform) => {
    const intro = `It looks like you're trying to add an integration link.`
    if (platform === 'spotify') {
      return `${intro}

Do you want to add **Spotify** as an integration instead?

This way you can use the link in your ads, and track follower and listener data on the Results page, and include Spotify listeners in your audience calculation on the Controls page?`
    }
    const { title: platformTitle } = getIntegrationInfo({ platform })
    return `${intro}

Do you want to add **${platformTitle}** as an integration instead?

This way you can use the link in your ads and track follower and listener data on the Results page?`
  },

  confirmPrioritizePost: (isPrioritized, isArchived) => {
    if (isPrioritized) {
      return `**Remove priority status from this post?**

This post may stop running if outperformed by a non-priority post.

Would you like to continue?`
    }

    if (isArchived) {
      return `**Make this a priority post?**

Feed will run this post again straight away. Once it has been approved, some ads that are currently running might get turned off.

Would you like to continue?`
    }

    return `**Make this a priority post?**

Feed will turn this post into an ad straight away. Once it has been approved, some ads that are currently running might get turned off.

Would you like to continue?`
  },
  conversionsToggleAlert: (canRunConversions) => {
    if (! canRunConversions) {
      return 'Would you like to set-up conversion campaigns now?'
    }
  },
  connectWithFacebookCard: "See your most engaging Facebook and Instagram posts and start running ads.",
  connectWithFacebookBlock: (page) => {
    const connectToString = 'Connect to Facebook & Instagram to see your'

    if (page === 'posts') {
      return `${connectToString} most engaging posts and start running ads.`
    }

    return `${connectToString} insights about your pages.`
  },
  captionNotEditableReason: (post) => {
    const base = 'The caption is not editable because'

    if (post.postType === 'story' && post.platform !== 'custom') return `${base} this is a story.`
    if (! post.isPromotable) return `${base} the post is not promotable.`

    return ''
  },
}
