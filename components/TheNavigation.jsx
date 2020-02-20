// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import SignOutLink from './SignOutLink'
import ActiveLink from './ActiveLink'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
// IMPORT STYLES

const ArchformLinkItem = () => {
  return (
    <li>
      <a href="http://archform.ltd/">archForm</a>
    </li>
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

  const { HOME, POSTS, RESULTS, ACCOUNT, FAQ } = ROUTES

  const links = [
    {
      href: HOME,
      title: 'home',
    },
    {
      href: POSTS,
      title: 'your posts',
    },
    {
      href: RESULTS,
      title: 'results',
    },
    {
      href: ACCOUNT,
      title: 'account',
    },
    {
      href: FAQ,
      title: 'faq',
    },
  ]

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
    <>
      <ul>
        {user.artists.length > 1
          ? <li><ArtistOptions onChange={handleChange} artists={user.artists} /></li>
          : ''}
        {links.map(({ href, title }) => {
          return (
            <li key={href}>
              <ActiveLink href={href}><a>{ title }</a></ActiveLink>
            </li>
          )
        })}
        <li>
          <SignOutLink />
        </li>
        <ArchformLinkItem />
      </ul>
    </>
  )
}

const NavigationNonAuth = () => {
  const { LOGIN, SIGN_UP, PRICES, TERMS, FAQ } = ROUTES

  const links = [
    {
      href: LOGIN,
      title: 'log in',
    },
    {
      href: SIGN_UP,
      title: 'sign up',
    },
    {
      href: PRICES,
      title: 'pricing',
    },
    {
      href: TERMS,
      title: 'terms',
    },
    {
      href: FAQ,
      title: 'faq',
    },
  ]

  return (
    <>
      <ul>
        {links.map(({ href, title }) => {
          return (
            <li key={href}>
              <ActiveLink href={href}><a>{ title }</a></ActiveLink>
            </li>
          )
        })}
        <ArchformLinkItem />
      </ul>
    </>
  )
}

function Navigation() {
  const { navState } = React.useContext(NavigationContext)
  const { user } = React.useContext(UserContext)

  const className = navState.visible ? 'TheNavigation' : 'TheNavigation hidden'

  return (
    <nav className={className}>

      <PageHeader heading="Feed" />

      {user.id ? <NavigationAuth /> : <NavigationNonAuth />}

    </nav>
  )
}

export default Navigation
