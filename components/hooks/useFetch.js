import React from 'react'
import { AuthContext } from '../contexts/Auth'

// CONTINUE FROM, WHY IS THIS RUNNING 3 TIMES ON ACCOUNT PAGE??

const useFetch = (url) => {
  const { getToken } = React.useContext(AuthContext)

  const [response, setResponse] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchData = React.useCallback(async url => {
    const token = await getToken()
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.ok) {
      const result = await res.json()
      return result
    }
    throw new Error(res.statusText)
  }, [getToken])

  React.useEffect(() => {
    // Exit if there is already a response
    if (response) { return }

    // Exit if already loading
    if (isLoading) { return }

    // Exit if there is an error
    if (error) { return }

    setIsLoading(true)
    fetchData(url)
      .then(response => {
        setResponse(response)
        setIsLoading(false)
      })
      .catch(error => {
        setError(error)
        setIsLoading(false)
      })
  }, [error, fetchData, isLoading, response, url])

  return { response, error, isLoading }
}

export default useFetch
