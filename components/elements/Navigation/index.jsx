// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
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
import * as ROUTES from '../../../constants/routes'
// IMPORT HELPERS
// IMPORT STYLES

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

function ArtistOptions({ artists, onChange }) {
  const { artist } = React.useContext(ArtistContext)

  const artistOptions = artists.map(artist => {
    return (
      <option key={artist.id} value={artist.id}>{artist.name}</option>
    )
  })

  return (
    <select value={artist.id} onChange={onChange}>{artistOptions}</select>
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
          <Link href={ROUTES.HOME} activeClassName="currentPage">home</Link>
        </li>
        <li>
          <Link href={ROUTES.POSTS} activeClassName="currentPage">your posts</Link>
        </li>
        <li>
          <Link href={ROUTES.RESULTS} activeClassName="currentPage">results</Link>
        </li>
        <li>
          <Link href={ROUTES.ACCOUNT} activeClassName="currentPage">account</Link>
        </li>
        <li>
          <Link href={ROUTES.FAQ} activeClassName="currentPage">faq</Link>
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
        <Link href={ROUTES.LOG_IN} activeClassName="currentPage">log in</Link>
      </li>
      <li>
        <Link href={ROUTES.SIGN_UP} activeClassName="currentPage">sign up</Link>
      </li>
      <li>
        <Link href={ROUTES.PRICES} activeClassName="currentPage">pricing</Link>
      </li>
      <li>
        <Link href={ROUTES.TERMS} activeClassName="currentPage">terms</Link>
      </li>
      <li className="penultimateLi">
        <Link href={ROUTES.FAQ} activeClassName="currentPage">faq</Link>
      </li>
      <li>
        <a href="http://archform.ltd/">archForm</a>
      </li>
    </ul>
  </div>
)

export default Navigation
