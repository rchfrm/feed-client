import React from 'react'
import PropTypes from 'prop-types'

import useControlsStore from '@/app/stores/controlsStore'

import { WizardContext } from '@/app/contexts/WizardContext'

import { getObjectiveColor } from '@/app/helpers/artistHelpers'
import { getLocalStorage } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const getControlsStoreState = (state) => ({
  optimizationPreferences: state.optimizationPreferences,
})

const GetStartedSummarySentenceSection = ({
  section,
  text,
  color,
  isComplete,
  hasBorder,
  className,
  children,
}) => {
  const { steps, currentStep, goToStep, wizardState, setWizardState } = React.useContext(WizardContext)
  const { sectionColors } = wizardState
  const objectiveSectionColor = sectionColors?.objective

  const { optimizationPreferences } = useControlsStore(getControlsStoreState)
  const { objective: storedObjective, platform: storedPlatform } = JSON.parse(getLocalStorage('getStartedWizard')) || {}

  const objective = optimizationPreferences?.objective || storedObjective
  const platform = optimizationPreferences?.platform || storedPlatform

  const [borderColor, setBorderColor] = React.useState('')

  const isActive = steps[currentStep].section === section
  const isInActive = !isActive && !isComplete

  const setSectionColor = (color) => {
    const newColor = color || getObjectiveColor(objective, platform, section, sectionColors)

    setWizardState({
      type: 'set-state',
      payload: {
        key: 'sectionColors',
        value: { [section]: newColor },
      },
    })
    setBorderColor(newColor)
  }

  React.useEffect(() => {
    if (!hasBorder) return

    if (isComplete) {
      setSectionColor(color)
      return
    }

    if (isActive) {
      setBorderColor(brandColors.textColor)
      return
    }

    setBorderColor(brandColors.greyLight)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBorder, isActive, objective, platform, isComplete, section])

  React.useEffect(() => {
    if (section !== 'objective') {
      // Make sure that the section color isn't equal to the changeable objective section color
      if (borderColor === objectiveSectionColor) {
        setSectionColor(brandColors.instagram.bg)
      }

      // Restore original color if color no longer is equal to the objective color
      if (borderColor !== color && color !== objectiveSectionColor) {
        setSectionColor(color)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [borderColor, objectiveSectionColor])

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
        style={{ borderColor }}
      >
        {children}
      </span>
    </div>
  )
}

GetStartedSummarySentenceSection.propTypes = {
  section: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  className: PropTypes.string,
  hasBorder: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

GetStartedSummarySentenceSection.defaultProps = {
  text: '',
  color: '',
  className: '',
  hasBorder: true,
}

export default GetStartedSummarySentenceSection
