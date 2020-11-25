import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import sidePanelStyles from '@/app/SidePanel.module.css'

const NotificationCurrentInfoContent = ({
  title,
  description,
  ctaText,
  isActionable,
  isDismissible,
  sidepanelLayout,
}) => {
  const hasButton = !sidepanelLayout
  return (
    <div className={hasButton ? 'pb-12' : null}>
      <h3
        className={[
          sidepanelLayout ? sidePanelStyles.SidePanel__Header : null,
          sidepanelLayout ? 'h2' : null,
        ].join(' ')}
      >
        {title}
      </h3>
      <p>{description}</p>
      {/* BUTTON (for not sidepanel layout) */}
      {hasButton && (
        <Button
          className="w-full absolute left-0 bottom-0 rounded-t-none"
          version="green"
        >
          {ctaText}
        </Button>
      )}
    </div>
  )
}

NotificationCurrentInfoContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sidepanelLayout: PropTypes.bool.isRequired,
  ctaText: PropTypes.string.isRequired,
  isActionable: PropTypes.bool.isRequired,
  isDismissible: PropTypes.bool.isRequired,
}

export default NotificationCurrentInfoContent
