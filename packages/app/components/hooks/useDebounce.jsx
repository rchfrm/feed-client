import React from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
