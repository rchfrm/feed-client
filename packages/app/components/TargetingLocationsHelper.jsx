import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/targetingPageCopy'

const TargetingLocationsHelper = ({ className }) => {
  const { showAlert } = useAlertModal()
  const onClick = () => {
    showAlert({ copy: copy.locationsHelperText })
  }
  return (
    <div className={[className, 'text--block'].join(' ')}>
      <p>
        <a role="button" onClick={onClick}>
          Can't find the location you're looking for?
        </a>
      </p>
    </div>
  )
}

TargetingLocationsHelper.propTypes = {
  className: PropTypes.string,
}

TargetingLocationsHelper.defaultProps = {
  className: null,
}


export default TargetingLocationsHelper
