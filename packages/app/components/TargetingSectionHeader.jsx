import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

const TargetingSectionHeader = ({
  header,
  tooltipMessage,
  className,
}) => {
  return (
    <h4 className={['font-body', className].join(' ')}>
      <strong>{header}</strong>
      {tooltipMessage && (
        <TooltipButton
          copy={tooltipMessage}
          direction="top"
          buttonStyle={{
            transform: 'translateY(0.62rem)',
          }}
        />
      )}
    </h4>
  )
}

TargetingSectionHeader.propTypes = {
  header: PropTypes.string.isRequired,
  tooltipMessage: PropTypes.string,
  className: PropTypes.string,
}

TargetingSectionHeader.defaultProps = {
  tooltipMessage: '',
  className: null,
}


export default TargetingSectionHeader
