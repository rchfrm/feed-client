import React from 'react'

const useHasOverflow = (ref, callback) => {
  const [hasOverflow, setHasOverflow] = React.useState(undefined)

  React.useLayoutEffect(() => {
    const { current } = ref

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight

      setHasOverflow(hasOverflow)

      if (callback) callback(hasOverflow)
    }

    if (current) {
      setTimeout(() => trigger())
    }
  }, [callback, ref])

  return hasOverflow
}

export default useHasOverflow
