import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'

import { ArtistContext } from '@/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'

// IMPORT ELEMENTS
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import NotificationItem from '@/app/NotificationItem'

import { fetchNotifications } from '@/app/helpers/notificationsHelpers'

const runFetchNotifications = ({ artistId, itemsPerPage }) => {
  return fetchNotifications(artistId, itemsPerPage)
}

// WHEN TO UPDATE POSTS
const updateDataConditions = (newProps, oldProps) => {
  // console.log('newProps', newProps)
  // console.log('oldProps', oldProps)
  // console.log('***')
  const { artistId: newArtistId, loadingMore } = newProps
  const { artistId: oldArtistId, loadingMore: alreadyLoadingMore } = oldProps
  if (loadingMore && !alreadyLoadingMore) return true
  if (newArtistId !== oldArtistId) return true
  return false
}

// REDUCER
const initialState = []
const itemsReducer = (draftState, postsAction) => {
  const { type: actionType, payload = {} } = postsAction
  const {
    newItems,
  } = payload
  switch (actionType) {
    case 'replace-items':
      return newItems
    case 'reset-items':
      return initialState
    case 'add-items':
      draftState.push(...newItems)
      break
    default:
      return draftState
  }
}


const NotificationsLoader = ({ listClass }) => {
  const [notifications, setNotifications] = useImmerReducer(itemsReducer, initialState)
  const [error, setError] = React.useState(null)
  // FOR LOADING
  // Import artist context
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const itemsPerPage = 20
  const isEndOfItems = React.useRef(false)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const isInitialLoad = React.useRef(true)
  const [cursor, setCursor] = React.useState('')
  // Run this to fetch posts when the artist changes
  const { isPending } = useAsync({
    promiseFn: runFetchNotifications,
    watchFn: updateDataConditions,
    // The variable(s) to pass to promiseFn
    artistId,
    limit: itemsPerPage,
    isEndOfItems,
    loadingMore,
    cursor,
    // When fetch finishes
    onResolve: ({ res: { notifications }, error }) => {
      // Turn off global loading
      toggleGlobalLoading(false)
      // HANDLE ERROR
      if (error) {
        console.error('error fetching notifications', error)
        setError(error)
        setLoadingMore(false)
        isEndOfItems.current = true
        return
      }
      // Handle result...
      if (!notifications.length) {
        isEndOfItems.current = true
        setLoadingMore(false)
        // Handle no posts on initial load
        if (isInitialLoad.current) {
          setNotifications({ type: 'reset-items' })
        }
        // Define initial load
        isInitialLoad.current = false
        return
      }
      // Update afterCursor
      const lastItem = notifications[notifications.length - 1]
      console.log('lastItem', lastItem)
      // If loading extra posts
      if (loadingMore) {
        // Stop loading
        setLoadingMore(false)
        // Update posts
        setNotifications({
          type: 'add-items',
          payload: {
            newItems: notifications,
          },
        })
        return
      }
      // If replacing artist posts
      setNotifications({
        type: 'replace-items',
        payload: {
          newItems: notifications,
        },
      })
      // Define initial load
      isInitialLoad.current = false
    },
  })

  if (isPending && isInitialLoad.current) {
    return (
      <div className="pt-10 pb-10">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <Error error={error} />
      {/* LIST */}
      <div
        className={['breakout--width', listClass].join(' ')}
      >
        {notifications.map((notification) => {
          const { id } = notification
          return <NotificationItem key={id} notification={notification} />
        })}
      </div>
    </div>
  )
}

NotificationsLoader.propTypes = {
  listClass: PropTypes.string,
}

NotificationsLoader.defaultProps = {
  listClass: null,
}


export default NotificationsLoader
