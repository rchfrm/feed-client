import React from 'react'
import PropTypes from 'prop-types'

import sidePanelStyles from '@/app/SidePanel.module.css'

const NotificationCurrentInfoContent = ({
  title,
  description,
  buttonEl,
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
      {hasButton && buttonEl}
    </div>
  )
}

NotificationCurrentInfoContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonEl: PropTypes.node,
  sidepanelLayout: PropTypes.bool.isRequired,
}

NotificationCurrentInfoContent.defaultProps = {
  buttonEl: null,
}


export default NotificationCurrentInfoContent
