import React from 'react'

import brandColors from '../../constants/brandColors'

import Button from './Button'
import FacebookIcon from '../icons/FacebookIcon'

const ButtonFacebook = (props) => {
  const { version, children } = props
  return (
    <Button
      {...props}
      version={['facebook', 'icon', version].join(' ')}
    >
      <FacebookIcon
        fill={brandColors.white}
        width="20"
      />
      {children}
    </Button>
  )
}

export default ButtonFacebook
