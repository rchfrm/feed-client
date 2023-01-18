import React from 'react'
import PropTypes from 'prop-types'

import PencilIcon from '@/icons/PencilIcon'
import brandColors from '@/constants/brandColors'
import ButtonNew from '@/elements/ButtonNew'

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
      'text-grey-dark',
      className,
    ].join(' ')}
    >
      <p className="break-all mb-0">{value}</p>
      <ButtonNew
        size="small"
        className={[
          'text-offwhite',
        ].join(' ')}
        onClick={() => setIsEditMode(! isEditMode)}
        trackComponentName={trackComponentName}
      >
        <PencilIcon className="w-4 h-auto mr-1" fill={brandColors.offwhite} />
        Edit
      </ButtonNew>
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
