import React from 'react'

import useAsyncEffect from 'use-async-effect'

const useCrossTabCommunication = (messageName) => {
  const sysendPackage = React.useRef(null)
  const [sysendLoaded, setSysendLoaded] = React.useState(false)
  const [messageBroadcast, setMessageBroadcast] = React.useState('')
  const [messagePayload, setMessagePayload] = React.useState(null)
  const [hasBroadcasted, setHasBroadcasted] = React.useState(false)
  // LOAD SYSEND
  useAsyncEffect(async () => {
    sysendPackage.current = (await import('sysend')).default
    setSysendLoaded(true)
  }, [])

  React.useEffect(() => {
    if (!sysendLoaded) return
    const { current: sysend } = sysendPackage
    sysend.on(messageName, (payload) => {
      setMessageBroadcast(messageName)
      setMessagePayload(payload)
    })
    return () => {
      sysend.off(messageName)
    }
  }, [sysendLoaded, messageName])

  const broadcastMessage = React.useCallback((payload = null) => {
    if (!sysendLoaded) return
    const { current: sysend } = sysendPackage
    setHasBroadcasted(true)
    sysend.broadcast(messageName, payload)
  }, [messageName, sysendLoaded])

  return { messageBroadcast, messagePayload, broadcastMessage, hasBroadcasted }
}

export default useCrossTabCommunication
