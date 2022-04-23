import React from 'react'

import PixelSelector from '@/app/PixelSelector'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertFacebookPixel = ({
  data,
  setData,
  shouldStoreData,
  setShouldStoreData,
}) => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)

  React.useEffect(() => {
    if (shouldStoreData) {
      setData({ ...data, facebookPixel })
      setShouldStoreData(false)
    }
  }, [shouldStoreData, setShouldStoreData, data, setData, facebookPixel])

  return (
    <>
      <h3>{copy.alertSelectPixelTitle}</h3>
      <MarkdownText markdown={copy.alertSelectPixelDescription} />
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

export default ObjectiveSettingsChangeAlertFacebookPixel
