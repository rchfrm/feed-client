// IMPORT PACKAGES
import React from 'react'

// IMPORT ASSETS
// IMPORT COMPONENTS
// IMPORT CONSTANTS
// IMPORT CONTEXTS
import { AuthContext } from './Auth'
import { ArtistContext } from './Artist'
// IMPORT ELEMENTS
// IMPORT HELPERS
import server from '../helpers/server'
import helper from '../helpers/helper'
// IMPORT PAGES
// IMPORT STYLES

const initialNotificationsState = {}
const NotificationsContext = React.createContext(initialNotificationsState)
NotificationsContext.displayName = 'NotificationsContext'
const notificationsReducer = (notificationsState, notificationsAction) => {
  switch (notificationsAction.type) {
    case 'add-notification': {
      return {
        ...notificationsState,
        [notificationsAction.payload.notification.id]: notificationsAction.payload.notification,
      }
    }
    case 'add-notifications': {
      return {
        ...notificationsState,
        ...notificationsAction.payload.notifications,
      }
    }
    case 'reset': {
      return initialNotificationsState
    }
    default:
      throw new Error(`Unable to find ${notificationsAction.type} in notificationsReducer`)
  }
}

function NotificationsProvider({ children }) {
  const { artist } = React.useContext(ArtistContext)
  const { getToken } = React.useContext(AuthContext)

  const [notifications, setNotifications] = React.useReducer(notificationsReducer, initialNotificationsState)
  const [loading, setLoading] = React.useState(true)

  const getOrganisationNotifications = React.useCallback(async organisationId => {
    const path = `organizations/${organisationId}/notifications`
    const token = await getToken()
    const result = await server.getRequest(path, token)
    return result
  }, [getToken])

  React.useEffect(() => {
    // If the dependencies change, set this to false,
    // and cancel adding notifications to state
    let current = true

    // Exit if the artist hasn't loaded yet
    if (!artist.organization) { return }

    // Make a call to get notifications associated with the artist's organisation
    setLoading(true)
    getOrganisationNotifications(artist.organization.id)
      .then(res => {
        if (current) {
          setNotifications({
            type: 'add-notifications',
            payload: {
              notifications: helper.arrToObjById(res),
            },
          })
        }
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

    return () => {
      // If the selected artist changes, prevent any server responses being added to state,
      // and reset notifications state
      current = false
      setNotifications({ type: 'reset' })
    }
  }, [artist.organization, getOrganisationNotifications])

  const value = {
    loading,
    notifications,
    numberOfNotifications: Object.keys(notifications).length,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

const NotificationsConsumer = NotificationsContext.Consumer

export { NotificationsContext, NotificationsProvider, NotificationsConsumer }
