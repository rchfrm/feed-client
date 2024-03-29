import React from 'react'
// import PropTypes from 'prop-types'

import useNotificationsStore from '@/app/stores/notificationsStore'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { UserContext } from '@/app/contexts/UserContext'
import { AuthContext } from '@/contexts/AuthContext'

import { getUserOrganizations } from '@/app/helpers/userHelpers'

const getFetchAndSetNotifications = (state) => state.fetchAndSetNotifications

const NotificationsHandler = ({}) => {
  // READ CONTEXTS
  const { artistId } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)
  const { auth } = React.useContext(AuthContext)
  // Get function to fetch notifications
  const fetchAndSetNotifications = useNotificationsStore(getFetchAndSetNotifications)
  // Fetch notifications when artist changes
  React.useEffect(() => {
    if (! artistId || ! user.id) return
    const { id: userId } = user
    const orgs = getUserOrganizations(user)
    const organizationIds = orgs.map(({ id }) => id)
    // Fetch and set notifications
    fetchAndSetNotifications({ artistId, userId, organizationIds, auth })
  // eslint-disable-next-line
  }, [artistId, user.id, fetchAndSetNotifications])
  return null
}

NotificationsHandler.propTypes = {

}

export default NotificationsHandler
