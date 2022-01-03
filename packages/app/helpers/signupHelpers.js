import Router from 'next/router'

import * as utils from '@/helpers/utils'

import * as ROUTES from '@/app/constants/routes'

export const redirectPage = (newPathname, currentPathname, useRejectedPagePath = false) => {
  const rejectedPagePath = useRejectedPagePath ? utils.getLocalStorage('rejectedPagePath') : ''
  const newPagePath = rejectedPagePath || newPathname
  if (newPathname === currentPathname) return false
  Router.push(newPagePath)
  return true
}

// KICK TO LOGIN (if necessary)
export const kickToLogin = ({ initialPathname, initialFullPath, setRejectedPagePath }) => {
  // Only kick to login if user is on restricted page
  if (ROUTES.restrictedPages.includes(initialPathname)) {
    setRejectedPagePath(initialFullPath)
    return redirectPage(ROUTES.LOGIN, initialPathname)
  }
  return false
}
