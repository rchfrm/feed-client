import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingSettingsSaveContainer = ({
  disableSaving,
  targetingState,
  saveCampaignSettings,
  cancelUpdateSettings,
}) => {
  return (
    <div
      className={[
        'fixed bottom-0 right-0 w-1/2',
        'pl-20 pr-14 pb-10',
        disableSaving ? 'border-r-0 border-l-0 border-b-0 border-t-2' : 'border-0',
      ].join(' ')}
    >
      <div className="mb-5">
        <Button
          version="green"
          className="w-full"
          onClick={() => saveCampaignSettings(targetingState)}
          disabled={!!disableSaving}
        >
          {disableSaving ? (
            <>
              {disableSaving === 'budget' ? 'Budget is too small' : 'Select at least one location'}
            </>
          ) : 'Save Campaign Settings'}
        </Button>
      </div>
      {/* BACK BUTTON */}
      <div className="flex justify-end">
        <Button
          className="w-40"
          version="black small"
          onClick={cancelUpdateSettings}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

TargetingSettingsSaveContainer.propTypes = {
  disableSaving: PropTypes.string,
  targetingState: PropTypes.object.isRequired,
  saveCampaignSettings: PropTypes.func.isRequired,
  cancelUpdateSettings: PropTypes.func.isRequired,
}

TargetingSettingsSaveContainer.defaultProps = {
  disableSaving: '',
}


export default TargetingSettingsSaveContainer
