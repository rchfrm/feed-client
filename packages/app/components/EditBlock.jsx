import React from 'react'
import PropTypes from 'prop-types'

import PencilIcon from '@/icons/PencilIcon'
import brandColors from '@/constants/brandColors'
import Button from '@/elements/Button'

const EditBlock = ({
  value,
  isEditMode,
  setIsEditMode,
  trackComponentName,
  className,
}) => {
  return (
    <div className={[
      'w-full',
      'flex items-center justify-between',
      'text-grey-3',
      className,
    ].join(' ')}
    >
      <p className="break-all mb-0">{value}</p>
      <Button
        version="small icon"
        className={[
          'h-8 ml-3',
          'bg-insta',
          'rounded-full',
        ].join(' ')}
        onClick={() => setIsEditMode(! isEditMode)}
        trackComponentName={trackComponentName}
      >
        <PencilIcon fill={brandColors.white} />
        Edit
      </Button>
    </div>
  )
}

EditBlock.propTypes = {
  value: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
  trackComponentName: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EditBlock.defaultProps = {
  className: '',
}

export default EditBlock
