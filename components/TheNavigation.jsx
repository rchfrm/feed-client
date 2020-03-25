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
import styles from './TheNavigation.module.css'


function ArtistOptions({ artists, onChange }) {
  const { artist } = React.useContext(ArtistContext)

  const artistOptions = artists.map(artist => {
    return (
      <option key={artist.id} value={artist.id}>{artist.name}</option>
    )
  })

  return (
    <div className="select--small  select--sans">
      <select
        className={['select--box', styles.select].join(' ')}
        value={artist.id}
        onChange={onChange}
      >
        {artistOptions}
      </select>
    </div>
  )
}

function NavigationAuth() {
  const { user } = React.useContext(UserContext)
  const { storeArtist } = React.useContext(ArtistContext)
  const { navDispatch } = React.useContext(NavigationContext)

  const links = [
    {
      href: ROUTES.POSTS,
      title: 'posts & budget',
    },
    {
      href: ROUTES.RESULTS,
      title: 'results',
    },
    {
      href: ROUTES.INSIGHTS,
      title: 'insights',
    },
    {
      href: ROUTES.ACCOUNT,
      title: 'account',
    },
    {
      href: ROUTES.FAQ,
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
      </ul>
    </>
  )
}

const NavigationNonAuth = () => {
  const { LOGIN, SIGN_UP, PRICING, FAQ } = ROUTES
  const termsLink = 'https://archform.ltd/terms/'

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
      href: PRICING,
      title: 'pricing',
    },
    {
      href: termsLink,
      title: 'terms',
      external: true,
    },
    {
      href: FAQ,
      title: 'faq',
    },
  ]

  return (
    <>
      <ul>
        {links.map(({ href, title, external }) => {
          return (
            <li key={href}>
              {external
                ? <a href={href} target="_blank" rel="noopener noreferrer">{ title }</a>
                : <ActiveLink href={href}><a>{ title }</a></ActiveLink>}
            </li>
          )
        })}
      </ul>
    </>
  )
}

function TheNavigation() {
  const { navState } = React.useContext(NavigationContext)
  const { user } = React.useContext(UserContext)

  const className = navState.visible ? 'TheNavigation' : 'TheNavigation hidden'

  return (
    <nav className={className}>

      <PageHeader heading="Feed" />

      {user && user.id ? <NavigationAuth /> : <NavigationNonAuth />}

    </nav>
  )
}

export default TheNavigation
