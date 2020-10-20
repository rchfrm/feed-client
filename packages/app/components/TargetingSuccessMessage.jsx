import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingSuccessMessage = ({
  settingsSavedInitial,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <h3 className={['h2 text-green font-body'].join(' ')}>Success!</h3>
      <MarkdownText
        className={['mb-0 pb-2'].join(' ')}
        markdown={copy.successMessage(settingsSavedInitial)}
      />
    </div>
  )
}

TargetingSuccessMessage.propTypes = {
  settingsSavedInitial: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TargetingSuccessMessage.defaultProps = {
  className: null,
}


export default TargetingSuccessMessage
