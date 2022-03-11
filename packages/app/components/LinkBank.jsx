import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'

import LinkBankList from '@/app/LinkBankList'
import LinkBankIntegrations from '@/app/LinkBankIntegrations'
import ControlsContentSection from '@/app/ControlsContentSection'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import { splitLinks } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  fetchData: state.fetchData,
  nestedLinks: state.nestedLinks,
  isControlsLoading: state.isControlsLoading,
  linkBankError: state.linkBankError,
})

const LinkBank = () => {
  const { fetchData, nestedLinks, isControlsLoading, linkBankError } = useControlsStore(getControlsStoreState, shallow)
  const { artist: { hasSetupProfile } } = React.useContext(ArtistContext)

  const { looseLinks, linkFolders, integrationLinks } = React.useMemo(() => {
    return splitLinks(nestedLinks)
  }, [nestedLinks])
  const { setSidePanelLoading } = React.useContext(SidePanelContext)
  // Set to loading on mount
  React.useEffect(() => {
    if (isControlsLoading) {
      setSidePanelLoading(true)
    }
  }, [setSidePanelLoading, isControlsLoading])
  // Load links on mount
  useAsyncEffect(async () => {
    if (!isControlsLoading) return
    setSidePanelLoading(true)
    await fetchData()
    setSidePanelLoading(false)
  }, [isControlsLoading])

  if (isControlsLoading && !linkBankError) return null

  return (
    <section>
      <h2>Link Bank</h2>
      {linkBankError && (
        <Error error={linkBankError} className="mb-8" />
      )}
      {!!nestedLinks.length && (
        <ControlsContentSection action="add to the link bank">
          <section className="mb-10">
            <LinkBankList
              looseLinks={looseLinks}
              linkFolders={linkFolders}
              isDisabled={!hasSetupProfile}
            />
          </section>
          {!!integrationLinks.length && (
            <section>
              <h3>Integration Links</h3>
              <LinkBankIntegrations
                integrationLinks={integrationLinks}
              />
            </section>
          )}
        </ControlsContentSection>
      )}
    </section>
  )
}

LinkBank.propTypes = {
}

LinkBank.defaultProps = {
}


export default LinkBank
