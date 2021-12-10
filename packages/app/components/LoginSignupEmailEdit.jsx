import React from 'react'
import PropTypes from 'prop-types'

import PencilIcon from '@/icons/PencilIcon'
import brandColors from '@/constants/brandColors'
import Button from '@/elements/Button'

const LoginSignupEmailEdit = ({ email, isEmailEdit, setIsEmailEdit }) => {
  return (
    <div className="w-full flex items-center justify-between mb-4 text-grey-3">
      <p className="mb-0">{email}</p>
      <Button
        version="small icon"
        className={[
          'h-8',
          'bg-insta',
          'rounded-full text-xs',
        ].join(' ')}
        onClick={() => setIsEmailEdit(!isEmailEdit)}
        trackComponentName="LoginSignupEmailEdit"
      >
        <PencilIcon fill={brandColors.white} />
        Edit
      </Button>
    </div>
  )
}

LoginSignupEmailEdit.propTypes = {
  email: PropTypes.string.isRequired,
  isEmailEdit: PropTypes.bool.isRequired,
  setIsEmailEdit: PropTypes.func.isRequired,
}

LoginSignupEmailEdit.defaultProps = {
}

export default LoginSignupEmailEdit
