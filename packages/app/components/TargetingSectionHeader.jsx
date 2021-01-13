import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'
import MarkdownText from '@/elements/MarkdownText'

const TargetingSectionHeader = ({
  header,
  description,
  tooltipMessage,
  className,
}) => {
  return (
    <>
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
      {description && (
        <MarkdownText markdown={description} className="-mt-2 pb-1" />
      )}
    </>
  )
}

TargetingSectionHeader.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string,
  tooltipMessage: PropTypes.string,
  className: PropTypes.string,
}

TargetingSectionHeader.defaultProps = {
  description: '',
  tooltipMessage: '',
  className: null,
}


export default TargetingSectionHeader
