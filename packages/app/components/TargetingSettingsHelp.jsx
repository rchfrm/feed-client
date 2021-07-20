import React from 'react'
import PropTypes from 'prop-types'

import ButtonHelp from '@/elements/ButtonHelp'

import copy from '@/app/copy/targetingPageCopy'

const TargetingSettingsHelp = ({ desktopVersion }) => {
  return (
    <div className={['w-full mt-10 flex justify-end'].join(' ')}>
      <ButtonHelp
        content={copy.helpText}
        text="Need help with this page?"
        reverseText={desktopVersion}
        label="Targeting help"
      />
    </div>
  )
}

TargetingSettingsHelp.propTypes = {
  desktopVersion: PropTypes.bool,
}

TargetingSettingsHelp.defaultProps = {
  desktopVersion: false,
}


export default TargetingSettingsHelp
