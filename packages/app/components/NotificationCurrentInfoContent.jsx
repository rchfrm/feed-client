import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const NotificationCurrentInfoContent = ({
  title,
  description,
  date,
  isComplete,
  buttonEl,
  sidepanelLayout,
}) => {
  const hasButton = !sidepanelLayout
  const copy = isComplete ? '**Resolved!**' : description
  return (
    <div className={hasButton ? 'pb-12' : null}>
      <p
        className={[
          'text-sm text-grey-3',
          'mb-3',
          sidepanelLayout ? 'mt-3' : null,
        ].join(' ')}
      >
        {date}
      </p>
      <h3
        className={[
          sidepanelLayout ? 'h2' : null,
        ].join(' ')}
      >
        {title}
      </h3>
      <MarkdownText markdown={copy} />
      {/* BUTTON (for not sidepanel layout) */}
      {hasButton && buttonEl}
    </div>
  )
}

NotificationCurrentInfoContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  buttonEl: PropTypes.node,
  sidepanelLayout: PropTypes.bool.isRequired,
}

NotificationCurrentInfoContent.defaultProps = {
  buttonEl: null,
}


export default NotificationCurrentInfoContent
