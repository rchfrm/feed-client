import React from 'react'
// import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'
import useAsyncEffect from 'use-async-effect'

import Error from '@/elements/Error'

import LinkBankList from '@/app/LinkBankList'
import LinkBankIntegrations from '@/app/LinkBankIntegrations'
import DisabledSection from '@/app/DisabledSection'

import { SidePanelContext } from '@/contexts/SidePanelContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import { splitLinks, dummyLinks } from '@/app/helpers/linksHelpers'
import { dummyIntegrationLinks } from '@/helpers/integrationHelpers'

const getControlsStoreState = (state) => ({
  fetchData: state.fetchData,
  nestedLinks: state.nestedLinks,
  isControlsLoading: state.isControlsLoading,
  linkBankError: state.linkBankError,
})

const LinkBank = () => {
  const { fetchData, nestedLinks, isControlsLoading, linkBankError } = useControlsStore(getControlsStoreState, shallow)
  const { artistId, artist: { hasSetUpProfile, hasGrowthPlan } } = React.useContext(ArtistContext)

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

  if (artistId && isControlsLoading && !linkBankError) return null

  return (
    <section>
      <h2>Link Bank</h2>
      {linkBankError && (
        <Error error={linkBankError} className="mb-8" />
      )}
      <DisabledSection
        section="linkbank"
        isDisabled={!hasGrowthPlan || !hasSetUpProfile}
      >
        <section className="mb-10">
          <LinkBankList
            looseLinks={hasSetUpProfile ? looseLinks : dummyLinks}
            linkFolders={linkFolders}
            isDisabled={!hasSetUpProfile}
          />
        </section>
        <section>
          <h3>Integration Links</h3>
          <LinkBankIntegrations
            integrationLinks={hasSetUpProfile ? integrationLinks : dummyIntegrationLinks}
          />
        </section>
      </DisabledSection>
    </section>
  )
}

LinkBank.propTypes = {
}

LinkBank.defaultProps = {
}


export default LinkBank
