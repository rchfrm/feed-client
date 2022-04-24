import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import PixelSelector from '@/app/PixelSelector'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertFacebookPixelSelector = ({
  saveFacebookPixel,
  error,
  shouldSave,
  setShouldSave,
}) => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)

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

ObjectiveSettingsChangeAlertFacebookPixelSelector.propTypes = {
  saveFacebookPixel: PropTypes.func.isRequired,
  error: PropTypes.object,
  shouldSave: PropTypes.bool.isRequired,
  setShouldSave: PropTypes.func.isRequired,
}

ObjectiveSettingsChangeAlertFacebookPixelSelector.defaultProps = {
  error: null,
}

export default ObjectiveSettingsChangeAlertFacebookPixelSelector
