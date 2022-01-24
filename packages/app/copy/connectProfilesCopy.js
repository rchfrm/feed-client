/* eslint-disable quotes */

export default {
  // Text at top of page when adding additional accounts
  connectProfilesIntro: `Connect your Facebook and Instagram pages to Feed.`,

  // If profiles have already been loaded but need more
  findMoreProfiles: `Want to connect more Facebook and Instagram pages to Feed? Click the button below to update your permissions.`,

  connectProfilesDescription: (isFindMore) => {
    if (isFindMore) {
      return `**Make sure to choose <span className="text-insta">'Edit Settings'</span> when you get to Facebook, and tick the boxes next to the relevant pages.**`
    }

    return `This links Feed to Facebook and Instagram so you can:

  * analyse your posts to understand what works
  * view insights on engagement, reach and other metrics

  Please opt in to all permissions shown, as Feed needs them to work properly.

  **You’ll remain fully in control, and Feed will never post anything on your behalf.**`
  },
  confirmAccounts: 'Confirm the Facebook and Instagram accounts that should be connected to Feed.',
  connectCardTitle: 'Can’t find the page you’re looking for?',
  connectCardDescription: 'Click “Connect more” and make sure to choose <span className="text-insta font-bold">"Edit Settings"</span>, then tick the boxes next to the relevant pages.',
  noAdAccountsError: `No ad accounts were found, and one is needed to use Feed. Please log in to Facebook to create one.

  There's more information about how to do this [here](https://www.facebook.com/business/help/910137316041095?id=420299598837059).`,
  helpText: `## Facebook and Instagram

  ### Permissions

  When you connect Feed to Facebook and Instagram, it will ask for the below permissions. All are necessary for Feed to work!

You can revoke these from at any time from Facebook. Feed will never post anything on Facebook & Instagram..

**Show a list of the Pages**  
<span className="text-xs">So you can choose which ones to connect to Feed.<span>

**Read content posted on the Page**  
<span className="text-xs">To show your Facebook posts and stories within Feed.<span>

**Access Instagram profile and posts**  
<span className="text-xs">To show and give insights about your Instagram posts and stories within Feed.<span>

**Access Instagram insights**  
<span className="text-xs">To show you insights about your Instagram posts and engagement.<span>

**Access your Page and App insights**  
<span className="text-xs">To show you insights about your Facebook posts and engagement.<span>`,
}
