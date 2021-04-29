import React from 'react'
import PropTypes from 'prop-types'

import TickIcon from '@/icons/TickIcon'

import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'

const NotificationCurrentInfoContent = ({
  title,
  description,
  descriptionHtml,
  date,
  isComplete,
  buttonEl,
  sidepanelLayout,
}) => {
  const hasButton = !sidepanelLayout
  const copy = isComplete ? 'Thanks!' : description
  return (
    <div className={hasButton ? 'pb-12' : null}>
      {!sidepanelLayout && isComplete && (
        <TickIcon
          className="absolute top-0 right-0 h-4 w-auto mr-5 mt-4"
          fill={brandColors.green}
        />
      )}
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
        {sidepanelLayout && isComplete && (
          <TickIcon
            fill={brandColors.green}
            style={{
              height: '0.5em',
              width: 'auto',
              marginRight: '0.5em',
              display: 'inline-block',
              transform: 'translateY(-0.1em)',
            }}
          />
        )}
        {title}
      </h3>
      {descriptionHtml && !isComplete ? (
        <div className="text--block" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      ) : (
        <MarkdownText markdown={copy} />
      )}
      {/* BUTTON (for not sidepanel layout) */}
      {hasButton && buttonEl}
    </div>
  )
}

NotificationCurrentInfoContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionHtml: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  buttonEl: PropTypes.node,
  sidepanelLayout: PropTypes.bool.isRequired,
}

NotificationCurrentInfoContent.defaultProps = {
  buttonEl: null,
}


export default NotificationCurrentInfoContent
