/* eslint-disable quotes */

export default {
  // Text at top of page when adding additional accounts
  connectProfilesIntro: `Connect your Facebook and Instagram pages to Feed.`,

  // If profiles have already been loaded but need more
  findMoreProfiles: `Have other Facebook and Instagram pages you’d like to connect to Feed?`,

  connectProfilesDescription: (isFindMore) => {
    if (isFindMore) {
      return `Click the button below to be taken to Facebook to update your permissions. Make sure to select 'Edit Settings' and tick the box next to the relevant pages.`
    }

    return `This gives Feed access to your Facebook and Instagram accounts in order to:

  * view and analyse your posts
  * set-up ad campaigns and audience targeting
  * promote your posts
  * report back on results

  Please make sure you opt in to all permissions shown, as Feed needs them to work properly. You'll remain in control of all ads and posts.`
  },
  confirmAccounts: 'Confirm the Facebook and Instagram accounts that should be connected to Feed, which country they are based in and the ad account to use.',
  noAdAccountsError: `No ad accounts were found, and one is needed to use Feed. Please log in to Facebook to create one.

  There's more information about how to do this [here](https://www.facebook.com/business/help/910137316041095?id=420299598837059).`,
  helpText: `## Facebook and Instagram

  ### Permissions

  When you connect Feed to Facebook and Instagram, it’ll ask for 10 permissions. All are necessary for Feed to work! Below is an overview of how we use each one.

You can revoke these at any time from your Facebook.

**Manage ads for ad accounts that you have access to**
> <span className="text-xs">To create and run ads on your behalf.<span>

**Receive your email address**

> <span className="text-xs">To use as your account email / username and send you notifications.<span>

**Access profile and posts from the Instagram account connected to your Page**

> <span className="text-xs">To show your Instagram posts and stories within Feed, and turn the most effective ones into ads.<span>

**Access insights for the Instagram account connected to your Page**

> <span className="text-xs">To be able to analyse your Instagram posts and stories to identify the ones most likely to be effective as ads.<span>

**Show a list of the Pages you manage**

> <span className="text-xs">So you can choose which ones to connect to Feed.<span>

**Access your Page and App insights**

> <span className="text-xs">Similar to the Instagram equivalent above, to be able to analyse your Facebook posts and stories to identify the ones most likely to be effective as ads.<span>

**Read content posted on the Page**

> <span className="text-xs">Similar to the Instagram equivalent above, to show your Facebook posts and stories within Feed.<span>

**Manage accounts, settings and webhooks for a Page**

> <span className="text-xs">This goes with the previous permission, to allow Feed to show your Facebook posts and stories within Feed.<span>

**Read user content on your Page**

> <span className="text-xs">This refers to things like comments on your posts, and helps Feed analyse the most engaging posts in order to better predict which will be most effective as ads.<span>

**Create and manage ads for your Page**

> <span className="text-xs">The final one, to allow Feed to turn your most effective Facebook posts and stories into ads.<span>`,
}
