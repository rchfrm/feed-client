import React from 'react'
// import PropTypes from 'prop-types'

import useNotificationsStore from '@/app/store/notificationsStore'

import { ArtistContext } from '@/contexts/ArtistContext'
import { UserContext } from '@/contexts/UserContext'

const getFetchAndSetNotifications = state => state.fetchAndSetNotifications

const NotificationsHandler = ({}) => {
  // Get Artist ID
  const { artistId } = React.useContext(ArtistContext)
  // Get user
  const { user } = React.useContext(UserContext)
  // Get function to fetch notifications
  const fetchAndSetNotifications = useNotificationsStore(getFetchAndSetNotifications)
  // Fetch notifications when artist changes
  React.useEffect(() => {
    if (!artistId || !user.id) return
    const { id: userId } = user
    // Fetch and set notifications
    fetchAndSetNotifications({ artistId, userId })
  }, [artistId, user.id, fetchAndSetNotifications])
  return null
}

NotificationsHandler.propTypes = {

}

export default NotificationsHandler
