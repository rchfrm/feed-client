import { useRef, useEffect } from 'react'

// From here:
// https://dev.to/tusharkashyap63/use-refs-to-check-if-a-component-is-still-mounted-2gk7

const useIsMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })

  return isMounted.current
}

export default useIsMounted
