import React from 'react'
import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'

import { UserContext } from '@/admin/contexts/UserContext'

import * as server from '@/admin/helpers/adminServer'

const fetcher = (serverFunction) => async ({ cursor, args }) => {
  const requestArgs = cursor ? [cursor, ...args] : [null, ...args]
  // eslint-disable-next-line import/namespace
  const items = await server[serverFunction].apply(null, requestArgs)
  return items
}

const reducer = (draftState, action) => {
  const {
    type: actionType,
    payload: {
      newItems,
    },
  } = action
  switch (actionType) {
    case 'add-items':
      draftState.push(...newItems)
      break
    default:
      return draftState
  }
}

const useGetPaginated = (serverFunction = '', args = []) => {
  const [items, udpateItems] = useImmerReducer(reducer, [])
  const [cursor, setCursor] = React.useState('')
  const [finishedLoading, setFinishedLoading] = React.useState(false)
  const { user } = React.useContext(UserContext)

  const fetcherFunction = React.useMemo(() => {
    return fetcher(serverFunction)
  }, [serverFunction])

  const { isPending, error } = useAsync({
    promiseFn: fetcherFunction,
    watchFn: (newProps, oldProps) => {
      const { userId: newUser, cursor: newCursor } = newProps
      const { userId: oldUser, cursor: oldCursor } = oldProps
      if (newUser !== oldUser) return true
      if (newCursor !== oldCursor) return true
      return false
    },
    // The variable(s) to pass to promiseFn
    token: user ? user.token : null,
    userId: user ? user.id : null,
    cursor,
    args,
    // When fetch finishes
    onResolve: (newItems) => {
      // Handle result...
      if (! newItems || ! newItems.length) {
        setFinishedLoading(true)
        return
      }
      // Update artists
      udpateItems({
        type: 'add-items',
        payload: {
          newItems,
        },
      })
      // Update cursor
      const finalItem = newItems[newItems.length - 1]
      const { after: afterLink } = finalItem._links || {}
      if (! afterLink) return setFinishedLoading(true)
      const { href: cursorHref } = afterLink
      const [, cursor] = cursorHref.split('after=')
      if (! cursor) return setFinishedLoading(true)
      setCursor(cursor)
    },
  })

  return { data: items, isPending, error, finishedLoading }
}

export default useGetPaginated
