import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'

import PostsLinksList from '@/app/PostsLinksList'

import { ArtistContext } from '@/contexts/ArtistContext'
import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import * as postsHelpers from '@/app/helpers/postsHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

const PostsLinks = ({ updateLinks }) => {
  const { artistId } = React.useContext(ArtistContext)
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  const [savedLinks, setSavedLinks] = React.useState([])
  const [errorFetchingLinks, setErrorFetchingLinks] = React.useState(null)
  // Set to loading on mount
  React.useEffect(() => {
    setSidePanelLoading(true)
  }, [setSidePanelLoading])
  // Load links on mount
  useAsyncEffect(async (isMounted) => {
    setSidePanelLoading(true)
    const { links, error } = await postsHelpers.fetchSavedLinks(artistId, 'dummy')
    if (!isMounted()) return
    setSidePanelLoading(false)
    if (error) {
      setErrorFetchingLinks(error)
    } else {
      setErrorFetchingLinks(null)
      setSavedLinks(links)
    }
  }, [])
  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Saved Links</h2>
      <PostsLinksList savedLinks={savedLinks} />
      {errorFetchingLinks && (
        <Error error={errorFetchingLinks} />
      )}
    </section>
  )
}

PostsLinks.propTypes = {
  updateLinks: PropTypes.func.isRequired,
}

export default PostsLinks
