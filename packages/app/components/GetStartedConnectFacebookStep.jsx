import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import useControlsStore from '@/app/stores/controlsStore'
import useSaveLinkToLinkBank from '@/app/hooks/useSaveLinkToLinkBank'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import ButtonHelp from '@/elements/ButtonHelp'

import { getLocalStorage } from '@/helpers/utils'
import { updateArtist } from '@/app/helpers/artistHelpers'
import { getLinkByPlatform } from '@/app/helpers/linksHelpers'

import copy from '@/app/copy/connectProfilesCopy'
import * as ROUTES from '@/app/constants/routes'


const getControlsStoreState = (state) => ({
  nestedLinks: state.nestedLinks,
})

const GetStartedConnectFacebookStep = ({ scopes }) => {
  const { nestedLinks } = useControlsStore(getControlsStoreState)
  const saveLinkToLinkBank = useSaveLinkToLinkBank()

  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const data = JSON.parse(getLocalStorage('getStartedWizard'))

    if (!data) return

    const { platform, defaultLink } = data
    let link = ''

    // If user has provided a link then save it to the linkbank
    if (defaultLink) {
      const { savedLink, error } = await saveLinkToLinkBank(defaultLink)

      if (error) {
        return
      }

      link = savedLink
    } else {
      // Otherwise get the link from the linkbank based on previously chosen platform (either Facebook or Instagram)
      link = getLinkByPlatform(nestedLinks, platform)
    }

    await updateArtist(artistId, { ...data, defaultLink: link.id })
  }, [])

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Firstly, connect your Instagram via Facebook.</h3>
      <div className="flex flex-1 flex-column justify-center items-center">
        <ConnectFacebookButton
          redirectPath={ROUTES.GET_STARTED}
          scopes={scopes}
          buttonText="Continue with Facebook"
          className="w-96 mb-16"
          trackComponentName="GetStartedConnectFacebookStep"
        />
        <button onClick={next}>Next...</button>
        <ButtonHelp
          content={copy.helpText}
          text="The permissions we ask for"
          label="Permissions help"
          trackComponentName="GetStartedConnectFacebookStep"
        />
      </div>
    </div>
  )
}

GetStartedConnectFacebookStep.propTypes = {
}

GetStartedConnectFacebookStep.defaultProps = {
}

export default GetStartedConnectFacebookStep
