import React from 'react'

import PixelSelector from '@/app/PixelSelector'

const ObjectiveSettingsChangeAlertFacebookPixel = () => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)

  React.useEffect(() => {
    console.log(facebookPixel)
  }, [facebookPixel])

  return (
    <>
      <h3>Select your Facebook Pixel</h3>
      <p>This is the pixel that you have installed on your website(s) for this profile. Don't worry if you haven't installed a pixel yet, there's no harm in including one in your ads anyway.</p>
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
