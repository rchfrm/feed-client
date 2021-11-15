/* eslint-disable quotes */

const getMissingPermissionsList = (missingPermissions) => {
  const permissionsTextArray = missingPermissions.map((permission) => {
    if (permission === 'email') return '- View your email address'
    if (permission === 'read_insights') return '- Access your page and app insights'

    if (permission === 'pages_manage_ads') return '- Manage ads on your pages'
    if (permission === 'pages_manage_metadata') return '- Manage metadata on your pages'
    if (permission === 'pages_read_engagement') return '- Read engagement on your pages'
    if (permission === 'pages_read_user_content') return '- Read user content on your pages'

    if (permission === 'pages_show_list') return '- Show a list of the Pages you manage'
    if (permission === 'ads_management') return '- Manage your ads'
    if (permission === 'instagram_basic') return '- Access profile and posts from the Instagram account connect to your page'
    if (permission === 'instagram_manage_insights') return '- Access insights for the Instagram account connected to your page'
    return ''
  })
  return permissionsTextArray.join('\n')
}

const getMissingPagesCopy = () => `It might also be that you don't have any pages on Facebook yet, create those first and come back to Feed in order to connect them.`

export default {
  facebook_expired_access_token: () => 'We need to relink your Facebook account, click ‘Relink Facebook’ to get started.',

  facebook_missing_permissions: (missingPermissions, hasOnlyMissingPages) => {
    const permissionList = getMissingPermissionsList(missingPermissions, hasOnlyMissingPages)
    const missingPagesText = hasOnlyMissingPages ? getMissingPagesCopy() : ''
    return `In order to promote your posts, we need the following permissions from Facebook...
  
The ability to:
    
${permissionList}

${missingPagesText}
    
Click ‘Continue with Facebook’ to grant those permissions.`
  },


  facebook_ad_account_closed: (facebookIntegration) => `Your ad account (with the ID ${facebookIntegration.adaccount_id}) is marked as closed. So that Feed can promote your posts, you’ll need to create a new ad account on Facebook.

  First, if you haven’t done so already, set up [Facebook Business Manager](https://www.facebook.com/business/help/1710077379203657?id=180505742745347).

  Secondly, follow the instructions to ‘Create a new ad account’ [here](https://www.facebook.com/business/help/910137316041095?id=420299598837059)
  
  And finally, send us an email with the ID of the ad account and your name.

  [...where is the ID of my ad account?](https://www.facebook.com/business/help/1492627900875762)
  
  If you have any issues at all, also please send us an email and we’ll do all we can to help!`,


  facebook_ad_account_disabled: (facebookIntegration) => `Your ad account (with the ID ${facebookIntegration.adaccount_id}) is marked as disabled. So that Feed can promote your posts, you’ll need to login to Facebook and follow the instructions to re-enable your ad account.

  Visit [Ads Manager](https://www.facebook.com/adsmanager/manage/) and follow the instructions in the red box at the top of the page.`,


  unpaid_invoice: (facebookIntegration) => `You have an unpaid invoice on your ad account (with the ID ${facebookIntegration.adaccount_id}). So that Feed can promote your posts, you’ll need to login to Facebook and pay the outstanding amount.

  Visit the [Billing section](https://www.facebook.com/ads/manager/billing/) of Ads Manager to pay now.`,

  facebook_ad_account_no_funding_source: (facebookIntegration) => `There are no payment details on your ad account (with the ID ${facebookIntegration.adaccount_id}). So that Feed can promote your posts, click ‘Add payment details’ below to add a card or another method of payment to your Facebook ad account.`,

  instagram_business_not_connected: () => `There is no Instagram business ID associated with this account`,

  instagram_page_not_linked: () => `Your Facebook page and Instagram account are not quite fully linked. It’s a quick fix, and you can [add your Instagram account to your Facebook page](https://www.facebook.com/business/help/898752960195806) in just a few minutes.`,

  facebook_non_discrimination_policy: () => `Please accept Facebook's Non-Discrimination Policies.

  You'll need to do this before Feed can start running your ads.`,

  facebook_custom_audience_tos: () => `Please accept Facebook's Custom Audience Terms of Service.

  You'll need to do this before Feed can start running your ads.`,

  email_not_confirmed: (email) => `**Confirm your email**

  We want to make sure our emails about your account are reaching you.

  You should have received an email from us, click the link to verify your email address:

  **${email}**

  In case it didn’t come through, you can either edit your email or get a new link using the buttons below.`,
}
