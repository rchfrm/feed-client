import React from 'react'
import PropTypes from 'prop-types'

import { gsap } from 'gsap'

import useBrowserStore from '@/hooks/useBrowserStore'
import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import Button from '@/elements/Button'

import TargetingPausedWarning from '@/app/TargetingPausedWarning'

import { getSaveDisabledReason } from '@/app/helpers/targetingHelpers'

const TargetingSettingsSaveContainer = ({
  disableSaving,
  targetingState,
  saveCampaignSettings,
  cancelUpdateSettings,
  budgetRef,
}) => {
  const { width: windowWidth } = useBrowserStore()
  const containerRef = React.useRef(null)
  React.useEffect(() => {
    const { current: budgetEl } = budgetRef
    if (!budgetEl) return
    const { height: budgetHeight, top: budgetTop } = budgetEl.getBoundingClientRect()
    // Set position
    const { current: containerEl } = containerRef
    const positionProps = {
      top: budgetTop + budgetHeight,
      opacity: 1,
    }
    gsap.set(containerEl, positionProps)
  }, [budgetRef, windowWidth])
  // GET SAVE FUNCTION
  const saveTargeting = useSaveTargeting({ targetingState, saveCampaignSettings })
  return (
    <div
      className={[
        'fixed right-0 w-1/2',
        'pt-5 pl-20 pr-14 pb-10',
        'opacity-0',
        disableSaving ? 'border-r-0 border-l-0 border-b-0 border-t-2' : 'border-0',
      ].join(' ')}
      ref={containerRef}
    >
      {/* PAUSED WARNING */}
      {targetingState.paused && (
        <TargetingPausedWarning
          className="col-span-12 col-start-1 mb-6"
          hideButton
        />
      )}
      <div className="mb-5">
        <Button
          version="green"
          className="w-full"
          onClick={() => saveTargeting('settings')}
          disabled={!!disableSaving}
        >
          {disableSaving ? (
            getSaveDisabledReason(disableSaving)
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
  budgetRef: PropTypes.object.isRequired,
}

TargetingSettingsSaveContainer.defaultProps = {
  disableSaving: '',
}


export default TargetingSettingsSaveContainer
