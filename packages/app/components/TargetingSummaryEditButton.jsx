import React from 'react'
import PropTypes from 'prop-types'

import PencilIcon from '@/icons/PencilIcon'

import brandColors from '@/constants/brandColors'

const TargetingSummaryEditButton = ({ setCurrentView, className }) => {
  return (
    <a
      className={[
        'flex items-center',
        'no-underline',
        'px-3 py-1',
        'bg-green text-white',
        'rounded-full',
        className,
      ].join(' ')}
      style={{ paddingBottom: '0.3rem' }}
      role="button"
      onClick={() => {
        setCurrentView('customise')
      }}
    >
      <PencilIcon className="h-4 mr-1" fill={brandColors.white} />
      <strong>Edit</strong>
    </a>
  )
}

TargetingSummaryEditButton.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingSummaryEditButton.defaultProps = {
  className: null,
}


export default TargetingSummaryEditButton
