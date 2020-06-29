import React from 'react'
import { useAsync } from 'react-async'
import { useImmerReducer } from 'use-immer'

import { UserContext } from '@/contexts/UserContext'

import * as server from '@/admin/helpers/adminServer'

const fetcher = (serverFunction) => async ({ cursor }) => {
  // eslint-disable-next-line
  const items = await server[serverFunction](cursor)
  console.log('items', items)
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

const useGetPaginated = (serverFunction) => {
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
    // When fetch finishes
    onResolve: (newItems) => {
      // Handle result...
      if (!newItems || !newItems.length) {
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
      const { _links: { after: afterLink } } = finalItem
      if (!afterLink) return setFinishedLoading(true)
      const { href: cursorHref } = afterLink
      const [, cursor] = cursorHref.split('after=')
      if (!cursor) return setFinishedLoading(true)
      setCursor(cursor)
    },
  })

  return { items, isPending, error, finishedLoading }
}

export default useGetPaginated
