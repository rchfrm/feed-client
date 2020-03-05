import React from 'react'
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import Feed from './elements/Feed'
import server from './helpers/server'
// IMPORT ELEMENTS
import Button from './elements/Button'
import Spinner from './elements/Spinner'


function FacebookButton(props) {
  const { accessToken, handleClick, updated } = props

  const spinnerStyle = { justifyContent: 'initial' }

  if (updated) {
    return <p>Thanks!</p>
  }

  if (accessToken) {
    return <Spinner colour="#4267B2" style={spinnerStyle} width={25} />
  }
  return (
    <Button
      version="facebook"
      onClick={handleClick}
      width={100}
    >
      Continue with Facebook
    </Button>
  )
}


const RelinkFacebook = () => {
  const { accessToken, getToken, relinkFacebook } = React.useContext(AuthContext)
  const { user } = React.useContext(UserContext)
  const { artist } = React.useContext(ArtistContext)
  const [updating, setUpdating] = React.useState(false)
  const [updated, setUpdated] = React.useState(false)

  const divStyle = {
    width: '90%',
    marginBottom: '2em',
    padding: '0 5%',
  }
  const pStyle = {
    fontWeight: 400,
  }

  const handleClick = async e => {
    e.preventDefault()
    await relinkFacebook()
  }

  React.useEffect(() => {
    // Don't do anything if a request has already been made
    if (updating) {
      return
    }
    // If there is an access token, and the user has access to at least one artists,
    // create an array of artist IDs that the user is owner for
    if (accessToken && user.artists.length > 0) {
      const userArtists = []
      user.artists.forEach(artist => {
        if (artist.role === 'owner') {
          userArtists.push(artist.id)
        }
      })

      if (userArtists.length === 0) {
        return
      }
      // If the user is owner of at least one artist,
      // send the updated access token to the server
      setUpdating(true)
      getToken()
        .then(token => {
          server.updateAccessToken(userArtists, accessToken, token)
            .then(() => {
              setUpdated(true)
            })
        })
    }
  }, [accessToken, getToken, updating, user.artists])

  // If the selected artist is
  // London Sinfonietta (Y8uCfxBZkAVcpokW4S4b) or
  // Bamboo smoke (z86bIwfwlIXwEtmKIML6) or
  // Marcus McCoan (4FwK6p6y9xhpxZSGW2fR) or
  // Rob Godfrey (vpdEYAT65K8gVcIuLpvO),
  // show instructions on relinking Facebook
  if (
    artist.id === 'Y8uCfxBZkAVcpokW4S4b'
    || artist.id === '4FwK6p6y9xhpxZSGW2fR'
    || artist.id === 'vpdEYAT65K8gVcIuLpvO'
    || artist.id === 'z86bIwfwlIXwEtmKIML6'
  ) {
    return (
      <div style={divStyle}>
        <h2>Relink Facebook</h2>
        <h4>
          We need to refresh the link between
          {' '}
          <Feed />
          {' '}
          and your Facebook account. When you follow the 'Continue with Facebook' button below, you'll be taken to Facebook where you can authorise
          <Feed />
          's access.
        </h4>
        <p style={pStyle}>We ask for certain permissions so that we can show you your data and promote posts on your behalf, we'll never post anything without your approval.</p>
        <FacebookButton accessToken={accessToken} handleClick={handleClick} updated={updated} />
      </div>
    )
  }

  return <></>
}

export default RelinkFacebook
