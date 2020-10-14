import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'

import PostsLinksList from '@/app/PostsLinksList'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import usePostsStore from '@/app/hooks/usePostsStore'

import sidePanelStyles from '@/app/SidePanel.module.css'

const PostsLinks = ({
  useSelectMode,
}) => {
  const { fetchLinks, savedLinks } = usePostsStore()
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // const [savedLinks, setSavedLinks] = React.useState([])
  const [errorFetchingLinks, setErrorFetchingLinks] = React.useState(null)
  // Set to loading on mount
  React.useEffect(() => {
    if (!savedLinks) {
      setSidePanelLoading(true)
    }
  }, [setSidePanelLoading, savedLinks])
  // Load links on mount
  useAsyncEffect(async (isMounted) => {
    setSidePanelLoading(true)
    const { error } = await fetchLinks()
    if (!isMounted()) return
    setSidePanelLoading(false)
    if (error) {
      setErrorFetchingLinks(error)
    } else {
      setErrorFetchingLinks(null)
    }
  }, [])

  if (!savedLinks && !errorFetchingLinks) return null

  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Saved Links</h2>
      {errorFetchingLinks ? (
        <Error error={errorFetchingLinks} />
      ) : (
        <PostsLinksList
          savedLinks={savedLinks}
          useSelectMode={useSelectMode}
        />
      )}
    </section>
  )
}

PostsLinks.propTypes = {
  useSelectMode: PropTypes.bool,
}

PostsLinks.defaultProps = {
  useSelectMode: false,
}


export default PostsLinks
