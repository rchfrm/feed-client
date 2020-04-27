import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

import Button from './Button'
import FacebookIcon from '../icons/FacebookIcon'

const ButtonFacebook = ({
  width: widthProp,
  className,
  onClick,
  children,
  version,
}) => {
  const width = typeof widthProp === 'string' ? widthProp : ''

  return (
    <Button
      className={className}
      onClick={onClick}
      width={width}
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
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
}

ButtonFacebook.defaultProps = {
  width: '',
  marginBottom: '',
  onClick: () => {},
  className: '',
  version: '',
}


export default ButtonFacebook
