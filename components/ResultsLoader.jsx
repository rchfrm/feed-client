// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Feed from './elements/Feed'
import Button from './elements/Button'
import Spinner from './elements/Spinner'
// IMPORT PAGES
import { PromotePostsButton } from './page/HomePage'
import Results from './ResultsAll'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColours from '../constants/brandColours'
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES

const initialPostsState = {
  active: {},
  archive: {},
}
const postsReducer = (postsState, postsAction) => {
  switch (postsAction.type) {
    case 'add-assets':
      return {
        ...postsState,
        [postsAction.payload.type]: {
          ...postsState[postsAction.payload.type],
          ...postsAction.payload.assets,
        },
      }
    case 'no-assets':
      return {
        ...postsState,
        [postsAction.payload.type]: {},
      }
    case 'set-promotion-enabled':
      return {
        ...postsState,
        [postsAction.payload.type]: {
          ...postsState[postsAction.payload.type],
          [postsAction.payload.id]: {
            ...postsState[postsAction.payload.type][postsAction.payload.id],
            promotion_enabled: postsAction.payload.promotion_enabled,
          },
        },
      }
    case 'reset-posts':
      return initialPostsState
    default:
      throw new Error(`Could not find ${postsAction.type} in postsReducer`)
  }
}

function NoResults({ dailyBudget }) {
  const handleClick = e => {
    e.preventDefault()
    Router.push(ROUTES.POSTS)
  }

  if (dailyBudget > 0) {
    return (
      <div
        className="fill-height ninety-wide"
        style={{ justifyContent: 'initial' }}
      >
        <h3>
          <Feed />
          {' '}
          is setting up your posts for promotion.
        </h3>
        <p>
          There may be a delay whilst posts await approval, once promotions have started you'll be able to see your results here.
        </p>
      </div>
    )
  }

  return (
    <div
      className="fill-height"
      style={{ justifyContent: 'initial' }}
    >
      <h3 className="ninety-wide" style={{ flex: 'auto' }}>
        <Feed />
        {' '}
        hasn't started promoting your posts yet, get started by entering a daily budget&nbsp;
        <Button version="text" onClick={handleClick}>here</Button>
        .
      </h3>
      <PromotePostsButton dailyBudget={dailyBudget} />
    </div>
  )
}


function ResultsLoader() {
// DEFINE STATES
  const [posts, setPosts] = React.useReducer(postsReducer, initialPostsState)
  const [active, setActive] = React.useState({
    loading: false,
    complete: false,
  })
  const [archive, setArchive] = React.useState({
    loading: false,
    complete: false,
  })
  const [, setError] = React.useState(null)
  // TODO : Display errors somewhere
  // END DEFINE STATES

  // IMPORT CONTEXTS
  const { getToken } = React.useContext(AuthContext)
  const { artist, artistLoading } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // RESET STATE IF NEW SELECTED ARTIST
  React.useEffect(() => {
    setActive({
      loading: false,
      complete: false,
    })
    setArchive({
      loading: false,
      complete: false,
    })
    setPosts({ type: 'reset-posts' })
  }, [artist.id])
  // END RESET STATE IF NEW SELECTED ARTIST

  const getAssets = React.useCallback(async promotion_status => {
    const token = await getToken()
      .catch((err) => {
        throw (err)
      })
    // return result
    const assets = await server.getAssets(artist.id, promotion_status, token)
    return assets
  }, [artist.id, getToken])

  // GET ACTIVE ASSETS FROM SERVER
  React.useEffect(() => {
    // Return if there is no selected artist
    if (!artist.id) {
      return
    }

    // Return if a request is already happening
    if (active.loading) {
      return
    }

    // Return if a request has completed
    if (active.complete) {
      return
    }

    setActive({
      ...active,
      loading: true,
    })

    getAssets('active')
      .then(assets => {
        setPosts({
          type: 'add-assets',
          payload: {
            type: 'active',
            assets: helper.arrToObjById(assets),
          },
        })
        setActive({
          loading: false,
          complete: true,
        })
      })
      .catch(err => {
        setPosts({
          type: 'no-assets',
          payload: {
            type: 'active',
          },
        })
        setActive({
          loading: false,
          complete: true,
        })
        setError(err)
      })
  }, [active, artist.id, getAssets, posts.active])
  // END GET ACTIVE ASSETS FROM SERVER

  // GET ARCHIVED ASSETS FROM SERVER
  React.useEffect(() => {
    // Return if there is no selected artist
    if (!artist.id) {
      return
    }

    // Return if a request is already happening
    if (archive.loading) {
      return
    }

    // Return if a request has completed
    if (archive.complete) {
      return
    }

    setArchive({
      ...archive,
      loading: true,
    })

    getAssets('archived')
      .then(assets => {
        setPosts({
          type: 'add-assets',
          payload: {
            type: 'archive',
            assets: helper.arrToObjById(assets),
          },
        })
        setArchive({
          loading: false,
          complete: true,
        })
      })
      .catch(err => {
        setPosts({
          type: 'no-assets',
          payload: {
            type: 'archive',
          },
        })
        setArchive({
          loading: false,
          complete: true,
        })
        setError(err)
      })
  }, [archive, artist.id, getAssets, posts.archive])
  // END GET ARCHIVED ASSETS FROM SERVER

  // RETURN
  if (artistLoading || active.loading || archive.loading) {
  // If artist is loading, or both active and archived posts are loading, show spinner
    return <Spinner width={50} colour={brandColours.green.hex} />
  } if (
    Object.keys(posts.active).length === 0
    && Object.keys(posts.archive).length === 0
  ) {
  // If the active and archived endpoints have been called,
    // but there are no posts, show NoResults
    return <NoResults dailyBudget={artist.daily_budget} />
  }
  // Otherwise, show Results components
  return (
    <div style={{ width: '100%' }}>
      {/* Active posts */}
      <Results active posts={posts.active} setPosts={setPosts} />
      {/* Archived posts */}
      <Results active={false} posts={posts.archive} setPosts={setPosts} />
    </div>
  )

// END RETURN
}

export default ResultsLoader
