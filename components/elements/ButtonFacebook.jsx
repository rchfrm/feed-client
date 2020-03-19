import React from 'react'
import PropTypes from 'prop-types'

import brandColors from '../../constants/brandColors'

import FacebookIcon from '../icons/FacebookIcon'

const ButtonFacebook = ({
  width: widthProp,
  marginBottom,
  className,
  onClick,
  children,
}) => {
  const width = typeof widthProp === 'string' ? widthProp : ''
  const widthPercentage = typeof widthProp === 'number' ? widthProp : ''
  const classes = ['button', 'button--facebook', width, className]

  return (
    <button
      className={classes.join(' ')}
      onClick={onClick}
      style={{
        width: `${widthPercentage}%`,
        marginBottom,
      }}
    >
      <FacebookIcon
        fill={brandColors.white}
        width="20"
      />
      {children}
    </button>
  )
}

ButtonFacebook.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  marginBottom: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

ButtonFacebook.defaultProps = {
  width: '',
  marginBottom: '',
  onClick: () => {},
  className: '',
}


export default ButtonFacebook
