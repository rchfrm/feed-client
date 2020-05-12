import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from './elements/MarkdownText'
import copy from '../copy/AccountPageCopy'

const AccountConnectionsSummary = ({ className, onReady }) => {
  React.useEffect(onReady, [])
  return (
    <div className={className}>
      <MarkdownText markdown={copy.connectionsSummary} />
    </div>
  )
}

AccountConnectionsSummary.propTypes = {
  className: PropTypes.string,
  onReady: PropTypes.func.isRequired,
}

AccountConnectionsSummary.defaultProps = {
  className: '',
}

export default AccountConnectionsSummary
