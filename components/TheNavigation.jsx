// IMPORT PACKAGES
import React from 'react'
// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Select from './elements/Select'
// IMPORT COMPONENTS
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


function ArtistOptions({ currentArtistId, artists, handleChange }) {
  const artistOptions = artists.map(({ id: value, name }) => {
    return { value, name }
  })

  return (
    <Select
      className={styles.select}
      handleChange={handleChange}
      selectedValue={currentArtistId}
      options={artistOptions}
      name="Selected Profile"
      label="Selected Profile"
      version="box white small sans"
    />
  )
}

function NavigationLinks({ links }) {
  return links.map(({ href, title, external }) => {
    return (
      <li key={href}>
        {external
          ? <a href={href} target="_blank" rel="noopener noreferrer">{ title }</a>
          : <ActiveLink href={href}><a>{ title }</a></ActiveLink>}
      </li>
    )
  })
}

function NavigationAuth() {
  const { user } = React.useContext(UserContext)
  const { artist, storeArtist } = React.useContext(ArtistContext)
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

  const handleChange = (e) => {
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
          ? (
            <li>
              <ArtistOptions
                handleChange={handleChange}
                artists={user.artists}
                currentArtistId={artist.id}
              />
            </li>
          )
          : null}

        <NavigationLinks links={links} />

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
        <NavigationLinks links={links} />
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
