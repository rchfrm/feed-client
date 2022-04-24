import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PixelSelector from '@/app/PixelSelector'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import { setPixel } from '@/app/helpers/settingsHelpers'

import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertFacebookPixel = ({
  shouldSave,
  setShouldSave,
}) => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const [error, setError] = React.useState(null)

  const { artistId, setArtist } = React.useContext(ArtistContext)

  const saveFacebookPixel = async (pixelId) => {
    const { newIntegrations, error } = await setPixel(artistId, pixelId)

    if (error) {
      setError(error)
      return
    }

    // Update artist context
    setArtist({
      type: 'update-integrations',
      payload: {
        integrations: newIntegrations,
      },
    })
  }

  useAsyncEffect(async () => {
    if (shouldSave) {
      await saveFacebookPixel(facebookPixel)

      setShouldSave(false)
    }
  }, [shouldSave, setShouldSave, facebookPixel])

  return (
    <>
      <h2>{copy.alertSelectPixelTitle}</h2>
      <MarkdownText markdown={copy.alertSelectPixelDescription} className="text-grey-3 italic" />
      <Error error={error} />
      <PixelSelector
        updateParentPixel={setFacebookPixel}
        trackLocation="GetStartedFacebookPixelSelector"
        shouldSaveOnChange={false}
        shouldShowPixelCopier={false}
        hasNoPixelOption={false}
        className="w-full mb-4"
      />
    </>
  )
}

ObjectiveSettingsChangeAlertFacebookPixel.propTypes = {
  shouldSave: PropTypes.bool.isRequired,
  setShouldSave: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlertFacebookPixel.defaultProps = {
}

export default ObjectiveSettingsChangeAlertFacebookPixel
