import React from 'react'
import PropTypes from 'prop-types'

import useAlertModal from '@/hooks/useAlertModal'

import copy from '@/app/copy/targetingPageCopy'

const TargetingPickerHelper = ({ className }) => {
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

TargetingPickerHelper.propTypes = {
  className: PropTypes.string,
}

TargetingPickerHelper.defaultProps = {
  className: null,
}


export default TargetingPickerHelper
