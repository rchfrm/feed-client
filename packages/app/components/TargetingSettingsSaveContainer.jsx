import React from 'react'
import PropTypes from 'prop-types'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'
import useBreakpointTest from '@/hooks/useBreakpointTest'

import Button from '@/elements/Button'

import { SidePanelContext } from '@/contexts/SidePanelContext'

import { getSaveDisabledReason } from '@/app/helpers/targetingHelpers'

import copy from '@/app/copy/targetingPageCopy'

const TargetingSettingsSaveContainer = ({
  disableSaving,
  initialTargetingState,
  targetingState,
  saveTargetingSettings,
  children,
}) => {
  const { setSidePanelButton, sidePanelOpen: isSidepanelOpen } = React.useContext(SidePanelContext)
  const isDesktopLayout = useBreakpointTest('md')
  const isMobileAndIsSidePanelOpen = ! isDesktopLayout && isSidepanelOpen
  // GET SAVE FUNCTION
  const saveTargeting = useSaveTargeting({ initialTargetingState, targetingState, saveTargetingSettings })

  const saveButton = React.useMemo(() => (
    <Button
      className={[
        'w-full',
        isMobileAndIsSidePanelOpen ? 'border-offwhite border-solid border-0 border-t-4' : null,
      ].join(' ')}
      onClick={() => saveTargeting('settings')}
      isDisabled={!! disableSaving}
      trackComponentName="TargetingSettingsSaveContainer"
    >
      {disableSaving ? (
        getSaveDisabledReason(disableSaving)
      ) : copy.saveSettingsButton}
    </Button>
  ), [disableSaving, saveTargeting, isMobileAndIsSidePanelOpen])

  React.useEffect(() => {
    if (isMobileAndIsSidePanelOpen) {
      setSidePanelButton(saveButton)
    }
  }, [isMobileAndIsSidePanelOpen, setSidePanelButton, saveButton])

  if (isMobileAndIsSidePanelOpen) return null

  return (
    <div
      className={[
        'pt-5 pb-10',
        disableSaving ? 'border-r-0 border-l-0 border-b-0 border-t-2' : 'border-0',
      ].join(' ')}
    >
      <div className="mb-5">
        {saveButton}
      </div>
      {/* EXTRA CONTENT */}
      {children}
    </div>
  )
}

TargetingSettingsSaveContainer.propTypes = {
  disableSaving: PropTypes.string,
  initialTargetingState: PropTypes.object.isRequired,
  targetingState: PropTypes.object.isRequired,
  saveTargetingSettings: PropTypes.func.isRequired,
  children: PropTypes.node,
}

TargetingSettingsSaveContainer.defaultProps = {
  disableSaving: '',
  children: null,
}


export default TargetingSettingsSaveContainer
