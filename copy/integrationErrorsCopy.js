/* eslint-disable quotes */

const getMissingPermissionsList = (missingPermissions) => {
  const permissionsTextArray = missingPermissions.map((permission) => {
    if (permission === 'email') return '- View your email address'
    if (permission === 'read_insights') return '- Access your page and app insights'
    if (permission === 'manage_pages') return '- Manage your pages'
    if (permission === 'pages_show_list') return '- Show a list of the Pages you manage'
    if (permission === 'ads_management') return '- Manage your ads'
    if (permission === 'instagram_basic') return '- Access profile and posts from the Instagram account connect to your page'
    if (permission === 'instagram_manage_insights') return '- Access insights for the Instagram account connected to your page'
    return ''
  })
  return permissionsTextArray.join('\n')
}

export default {
  expired_access_token: () => 'We need to relink your Facebook account, click ‘Continue with Facebook’ to get started.',

  missing_permission_scope: (missingPermissions) => `In order to promote your posts, we need the following permissions from Facebook...
  
  The ability to:

  ${getMissingPermissionsList(missingPermissions)}
  
Click ‘Continue with Facebook’ to grant those permissions.`,

  ad_account_closed: (artist) => `Your ad account (with the ID ${artist.integrations.facebook.adaccount_id}) is marked as closed. So that Feed can promote your posts, you’ll need to create a new ad account on Facebook.

  First, if you haven’t done so already, set up [Facebook Business Manager](https://www.facebook.com/business/help/1710077379203657?id=180505742745347).

  Secondly, follow the instructions to ‘Create a new ad account’ [here](https://www.facebook.com/business/help/910137316041095?id=420299598837059)
  
  And finally, send us an email with the ID of the ad account and your name.

  [...where is the ID of my ad account?](https://www.facebook.com/business/help/1492627900875762)
  
  If you have any issues at all, also please send us an email and we’ll do all we can to help!`,


  ad_account_disabled: (artist) => `Your ad account (with the ID ${artist.integrations.facebook.adaccount_id}) is marked as disabled. So that Feed can promote your posts, you’ll need to login to Facebook and follow the instructions to re-enable your ad account.

  Visit [Ads Manager](https://www.facebook.com/adsmanager/manage/) and follow the instructions in the red box at the top of the page.`,


  unpaid_invoice: (artist) => `You have an unpaid invoice on your ad account (with the ID ${artist.integrations.facebook.adaccount_id}). So that Feed can promote your posts, you’ll need to login to Facebook and pay the outstanding amount.

  Visit the [Billing section](https://www.facebook.com/ads/manager/billing/) of Ads Manager to pay now.`,

  ad_account_no_funding_source: (artist) => `There are no payment details on your ad account (with the ID ${artist.integrations.facebook.adaccount_id}). So that Feed can promote your posts, click ‘Add payment details’ below to add a card or another method of payment to your Facebook ad account.`,

  no_instagram_business: () => `There is no Instagram business ID associated with this account`,

  instagram_page_not_linked: () => `Your Facebook page and Instagram account are not quite fully linked. It’s a quick fix, and you can [add your Instagram account to your Facebook page](https://www.facebook.com/business/help/898752960195806) in just a few minutes.`,

}
