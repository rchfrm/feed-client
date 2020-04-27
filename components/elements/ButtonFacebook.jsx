import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

import Button from './Button'
import FacebookIcon from '../icons/FacebookIcon'

const ButtonFacebook = ({
  version,
  className,
  style,
  onClick,
  children,
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      style={style}
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

ButtonFacebook.propTypes = {
  version: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

ButtonFacebook.defaultProps = {
  version: '',
  className: '',
  style: {},
  onClick: () => {},
}


export default ButtonFacebook
