// IMPORT PACKAGES
import React from 'react'
import { NavLink } from 'react-router-dom'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../../contexts/Navigation'
import { UserContext } from '../../contexts/User'
import { ArtistContext } from '../../contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
import SignOutLink from '../SignOut'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
// IMPORT HELPERS
// IMPORT STYLES
import './navigation.css'

function Navigation() {
  const { navState } = React.useContext(NavigationContext)
  const { user } = React.useContext(UserContext)

  const className = navState.visible ? '' : 'hidden'

  return (
    <nav className={className}>

      <PageHeader heading="Feed" />

      {user.id ? <NavigationAuth /> : <NavigationNonAuth />}

    </nav>
  )
}

function ArtistOptions(props) {
  const { artist } = React.useContext(ArtistContext)

  const { artists } = props
  const artistOptions = artists.map(artist => {
    return (
      <option key={artist.id} value={artist.id}>{artist.name}</option>
    )
  })

  return (
    <select value={artist.id} onChange={props.onChange}>{artistOptions}</select>
  )
}

function NavigationAuth() {
  const { user } = React.useContext(UserContext)
  const { storeArtist } = React.useContext(ArtistContext)
  const { navDispatch } = React.useContext(NavigationContext)

  const handleChange = e => {
    storeArtist(e.target.value)
      .then(() => {
        navDispatch({
          type: 'hide',
        })
      })
      .catch(err => {
        // TODO : Handle and log errors
        console.log(err)
      })
  }

  return (
    <div>
      <ul>
        {user.artists.length > 1
          ? <li><ArtistOptions onChange={handleChange} artists={user.artists} /></li>
          : ''}
        <li>
          <NavLink to={ROUTES.HOME} activeClassName="currentPage">home</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.POSTS} activeClassName="currentPage">your posts</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.RESULTS} activeClassName="currentPage">results</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.ACCOUNT} activeClassName="currentPage">account</NavLink>
        </li>
        <li>
          <NavLink to={ROUTES.FAQ} activeClassName="currentPage">faq</NavLink>
        </li>
        <li className="penultimateLi">
          <SignOutLink />
        </li>
        <li>
          <a href="http://archform.ltd/">archForm</a>
        </li>
      </ul>
    </div>
  )
}

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <NavLink exact to={ROUTES.LOG_IN} activeClassName="currentPage">log in</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.SIGN_UP} activeClassName="currentPage">sign up</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.PRICES} activeClassName="currentPage">pricing</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.TERMS} activeClassName="currentPage">terms</NavLink>
      </li>
      <li className="penultimateLi">
        <NavLink to={ROUTES.FAQ} activeClassName="currentPage">faq</NavLink>
      </li>
      <li>
        <a href="http://archform.ltd/">archForm</a>
      </li>
    </ul>
  </div>
)

export default Navigation
