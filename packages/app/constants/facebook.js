import * as ROUTES from '@/app/constants/routes'

const facebook = {
  OAUTH_URL: 'https://www.facebook.com/v12.0/dialog/oauth',
  APP_ID: '617771208738795',
  REDIRECT_URL: `${process.env.react_app_url}${ROUTES.CONNECT_ACCOUNTS}`,
}

export default facebook
