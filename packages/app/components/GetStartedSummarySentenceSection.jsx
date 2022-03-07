import React from 'react'
import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

const GetStartedSummarySentenceSection = ({
  section,
  text,
  isComplete,
  color,
  hasBorder,
  className,
  children,
}) => {
  const { steps, currentStep, goToStep } = React.useContext(WizardContext)

  const isActive = steps[currentStep].section === section
  const isInActive = !isActive && !isComplete

  const getBorderColorClassName = () => {
    if (isComplete) {
      return `border-${color}`
    }

    if (isActive) {
      return 'border-black'
    }

    return 'border-grey-2'
  }

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
      <span className={[
        hasBorder ? `${getBorderColorClassName()} mb-2 py-1 px-3 border-2 border-solid rounded-full` : null,
        className,
      ].join(' ')}
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
  color: PropTypes.string,
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
