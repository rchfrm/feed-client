export const getMissingPermissionsList = (missingPermissions) => {
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

const getMissingPagesCopy = () => "It might also be that you don't have any pages on Facebook yet, create those first and come back to Feed in order to connect them."

export default {
  missing_permission_scope: (missingPermissions, hasOnlyMissingPages) => {
    const permissionList = getMissingPermissionsList(missingPermissions)
    const missingPagesText = hasOnlyMissingPages ? getMissingPagesCopy() : ''
    return `In order to promote your posts, we need the following permissions from Facebook...
  
The ability to:
    
${permissionList}

${missingPagesText}
    
Click 'Continue with Facebook' to grant those permissions.`
  },
  email_not_confirmed: (email) => `**Confirm your email**

  We want to make sure our emails about your account are reaching you.

  You should have received an email from us, click the link to verify your email address:

  **${email}**

  In case it didn’t come through, you can either edit your email or get a new link using the buttons below.`,
}
