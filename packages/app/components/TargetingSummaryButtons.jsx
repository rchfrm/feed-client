import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingSummaryButtons = ({
  toggleMobileBudget,
  setCurrentView,
  isDesktopLayout,
  className,
}) => {
  return (
    <section className={[className].join(' ')}>
      <h3 className="h2">Edit Campaign</h3>
      {/* BUDGET BUTTON (for mobile) */}
      {!isDesktopLayout && (
        <Button
          className="w-full mb-5"
          onClick={toggleMobileBudget}
        >
          Edit Budget
        </Button>
      )}
      {/* CUSTOM SETTINGS BUTTON */}
      <Button
        className="w-full mb-5"
        onClick={() => {
          setCurrentView('customise')
        }}
      >
        Custom Settings
      </Button>
      {/* PAUSE BUTTON */}
      <Button
        version="red"
        className="w-full"
      >
        Pause Campaign
      </Button>
    </section>
  )
}

TargetingSummaryButtons.propTypes = {
  toggleMobileBudget: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  isDesktopLayout: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TargetingSummaryButtons.defaultProps = {
  className: null,
}


export default TargetingSummaryButtons
