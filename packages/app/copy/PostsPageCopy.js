/* eslint-disable quotes */
import * as ROUTES from '@/app/constants/routes'

export default {
  noPostsCopy: {
    // If no posts when filtering to all
    all: () => `Looks like you haven’t posted on Facebook or Instagram yet. When you do start posting, your posts will appear here.`,

    // No active posts with budget
    activeWithBudget: (inactiveTitle) => `**Feed** is setting up your posts for promotion. There may be a delay whilst your ads await approval.

Been waiting a while? Check you have posts opted in for promotion in the _${inactiveTitle}_ tab.`,

    // No active posts without budget
    activeNoBudget: () => `Currently, none of your posts are running as ads because you don’t have a budget set. Get started by entering a daily budget [here](${ROUTES.BUDGET}).`,

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


  globalToggleIntro: `Make all posts eligible for promotion by default:`,

  globalConnectionsIntro: `Add the links that you'd like to use in your ads.
  
Adding links to your profiles on _Twitter_, _YouTube_, _Soundcloud_, and _Spotify_ will also enable **Feed** to track the number of followers you have on the Insights page. `,

  globalConnectionsTooltipSlides: [
    `Set the default link used in every ad by clicking the asterisk (*) to the left of the link. You can still set different links on individual posts.`,
    `The other icons are suggested links, but you can use any field for any link.`,
  ],

  globalStatusConfirmation: `Changing this will update the current status on all your current and future posts.
  
  **This process might take a while, so please don’t refresh the page.**

  Do you want to continue?`,

  // Warning when turning off active post
  postStatusConfirmation: `Ads created from this post will soon stop running to all audiences. This post will not be eligible to run as an ad in the future.`,


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
    triple: [
      `This switch indicates whether Feed can promote the post...`,

      `When centered, the post will follow your default setting. A green outline means it's eligible for promotion, a red outline means it's not.`,

      `Slide right to override your default settings and let Feed promote this post.`,

      `Slide left to override your default settings and prevent Feed from promoting this post.`,

      `You can change your default settings using the ‘Post Settings’ button at the top of the posts page.`,
    ],
    double: [
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

  metricsTooltips: {
    paid: {},
    organic: {},
  },
}
