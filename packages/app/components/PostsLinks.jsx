import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'

import PostsLinksList from '@/app/PostsLinksList'
// eslint-disable-next-line
import PostsLinksIntegrations from '@/app/PostsLinksIntegrations'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import usePostsStore from '@/app/hooks/usePostsStore'

import sidePanelStyles from '@/app/SidePanel.module.css'

const PostsLinks = ({
  useSelectMode,
}) => {
  const { fetchLinks, nestedLinks, looseLinks, integrations, linksLoading } = usePostsStore()
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // const [savedLinks, setSavedLinks] = React.useState([])
  const [errorFetchingLinks, setErrorFetchingLinks] = React.useState(null)
  // Set to loading on mount
  React.useEffect(() => {
    if (linksLoading) {
      setSidePanelLoading(true)
    }
  }, [setSidePanelLoading, linksLoading])
  // Load links on mount
  useAsyncEffect(async (isMounted) => {
    setSidePanelLoading(true)
    const { error } = await fetchLinks() || {}
    if (!isMounted()) return
    setSidePanelLoading(false)
    if (error) {
      setErrorFetchingLinks({ message: `Error fetching links. ${error.message}` })
    } else {
      setErrorFetchingLinks(null)
    }
  }, [])

  if (linksLoading && !errorFetchingLinks) return null

  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Links</h2>
      {errorFetchingLinks ? (
        <Error error={errorFetchingLinks} />
      ) : (
        <div>
          <section className="mb-10">
            <PostsLinksList
              nestedLinks={nestedLinks}
              looseLinks={looseLinks}
              useSelectMode={useSelectMode}
            />
          </section>
          {!!integrations.length && (
            <section>
              <h3>Integration Links</h3>
              <PostsLinksIntegrations
                integrations={integrations}
                useSelectMode={useSelectMode}
              />
            </section>
          )}
        </div>
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
