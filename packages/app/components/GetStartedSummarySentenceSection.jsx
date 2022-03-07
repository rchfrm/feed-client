import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import { WizardContext } from '@/app/contexts/WizardContext'

import { getSectionColor } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedSummarySentenceSection = ({
  section,
  text,
  isComplete,
  hasBorder,
  className,
  children,
}) => {
  const { steps, currentStep, goToStep, wizardState, setWizardState } = React.useContext(WizardContext)
  const { sectionColors } = wizardState
  const sectionColor = sectionColors?.[section]
  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective: storedObjective, platform: storedPlatform } = JSON.parse(getLocalStorage('getStartedWizard')) || {}

  const objective = optimizationPreferences?.objective || storedObjective
  const platform = optimizationPreferences?.platform || storedPlatform

  const [color, setColor] = React.useState('')

  const isActive = steps[currentStep].section === section
  const isInActive = !isActive && !isComplete

  const setSectionColor = () => {
    const color = getSectionColor(objective, platform, section, sectionColors)

    setWizardState({
      type: 'set-state',
      payload: {
        sectionColors: {
          ...sectionColors,
          [section]: color,
        },
      },
    })
    setColor(color)
  }

  React.useEffect(() => {
    if (!hasBorder || (sectionColor && section !== 'objective')) return

    if (isComplete) {
      setSectionColor()
      return
    }

    if (isActive) {
      setColor(brandColors.textColor)
      return
    }

    setColor(brandColors.greyLight)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBorder, isActive, objective, platform, isComplete, section, sectionColor])

  React.useEffect(() => {
    // If there is a color set in the wizard state, update local color state
    if (sectionColor) {
      setColor(sectionColor)
    }
  }, [sectionColor])

  React.useEffect(() => {
    // Make sure that the section color isn't equal to the changeable objective section color
    if (sectionColor && section !== 'objective' && sectionColor === sectionColors.objective) {
      setSectionColor()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionColors, section, sectionColor])

  const goToSection = () => {
    // We can't navigate to a section that isn't completed yet
    if (!isComplete) {
      return
    }

    const firstStepOfSection = steps.find((step) => step.section === section).id

    goToStep(firstStepOfSection)
  }

  return (
    <div
      role="button"
      onClick={goToSection}
      className={[
        'flex items-center',
        isInActive ? 'text-grey-2 pointer-events-none' : 'text-black',
      ].join(' ')}
    >
      {text && <span className="whitespace-pre mb-2">{text}</span>}
      <span
        className={[
          hasBorder ? 'mb-2 py-1 px-3 border-2 border-solid rounded-full' : null,
          className,
        ].join(' ')}
        style={{ borderColor: color }}
      >
        {children}
      </span>
    </div>
  )
}

GetStartedSummarySentenceSection.propTypes = {
  section: PropTypes.string.isRequired,
  text: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  className: PropTypes.string,
  hasBorder: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

GetStartedSummarySentenceSection.defaultProps = {
  text: '',
  className: '',
  hasBorder: true,
}

export default GetStartedSummarySentenceSection
