import React from 'react'
import PropTypes from 'prop-types'

import TooltipIcon from '@/icons/TooltipIcon'

const ButtonTooltip = ({ className }) => {
  return (
    <button className={['button', 'button--tooltip', className].join(' ')}>
      <TooltipIcon />
    </button>
  )
}

ButtonTooltip.propTypes = {
  className: PropTypes.string,
}

ButtonTooltip.defaultProps = {
  className: '',
}


export default ButtonTooltip
