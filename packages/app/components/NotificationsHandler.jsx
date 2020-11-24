import React from 'react'
// import PropTypes from 'prop-types'

import useNotificationsStore from '@/app/store/notificationsStore'

import { ArtistContext } from '@/contexts/ArtistContext'

const getFetchAndSetNotifications = state => state.fetchAndSetNotifications

const NotificationsHandler = ({}) => {
  // Get IDs
  const { artistId } = React.useContext(ArtistContext)
  // Get function to fetch notifications
  const fetchAndSetNotifications = useNotificationsStore(getFetchAndSetNotifications)
  // Fetch notifications when artist changes
  React.useEffect(() => {
    if (!artistId) return
    // Fetch and set notifications
    fetchAndSetNotifications({ artistId })
  }, [artistId, fetchAndSetNotifications])
  return null
}

NotificationsHandler.propTypes = {

}

export default NotificationsHandler
