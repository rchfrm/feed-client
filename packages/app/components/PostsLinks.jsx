import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'

import PostsLinksList from '@/app/PostsLinksList'
// eslint-disable-next-line
import PostsLinksIntegrations from '@/app/PostsLinksIntegrations'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import useControlsStore from '@/app/stores/controlsStore'
import { splitLinks } from '@/app/helpers/linksHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

const getControlsStoreState = (state) => ({
  fetchLinks: state.fetchLinks,
  nestedLinks: state.nestedLinks,
  linksLoading: state.linksLoading,
  linkBankError: state.linkBankError,
})

const PostsLinks = () => {
  const { fetchLinks, nestedLinks, linksLoading, linkBankError } = useControlsStore(getControlsStoreState, shallow)
  const { looseLinks, linkFolders, integrationLinks } = React.useMemo(() => {
    return splitLinks(nestedLinks)
  }, [nestedLinks])
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // Set to loading on mount
  React.useEffect(() => {
    if (linksLoading) {
      setSidePanelLoading(true)
    }
  }, [setSidePanelLoading, linksLoading])
  // Load links on mount
  useAsyncEffect(async () => {
    if (!linksLoading) return
    setSidePanelLoading(true)
    await fetchLinks()
    setSidePanelLoading(false)
  }, [linksLoading])

  if (linksLoading && !linkBankError) return null

  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Links</h2>
      {linkBankError && (
        <Error error={linkBankError} className="mb-8" />
      )}
      {!!nestedLinks.length && (
        <div>
          <section className="mb-10">
            <PostsLinksList
              looseLinks={looseLinks}
              linkFolders={linkFolders}
            />
          </section>
          {!!integrationLinks.length && (
            <section>
              <h3>Integration Links</h3>
              <PostsLinksIntegrations
                integrationLinks={integrationLinks}
              />
            </section>
          )}
        </div>
      )}
    </section>
  )
}

PostsLinks.propTypes = {
}

PostsLinks.defaultProps = {
}


export default PostsLinks
