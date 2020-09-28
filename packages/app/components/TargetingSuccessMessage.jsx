import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingSuccessMessage = ({ className }) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3 className={['h3 text-green font-body'].join(' ')}>Success!</h3>
      <MarkdownText
        className={['mb-0 pb-2'].join(' ')}
        markdown={copy.successMessage}
      />
    </div>
  )
}

TargetingSuccessMessage.propTypes = {
  className: PropTypes.string,
}

TargetingSuccessMessage.defaultProps = {
  className: null,
}


export default TargetingSuccessMessage
