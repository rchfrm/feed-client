import React from 'react'
import PropTypes from 'prop-types'

import sidePanelStyles from '@/app/SidePanel.module.css'

const NotificationCurrentInfoContent = ({
  title,
  description,
  sidepanelLayout,
}) => {
  return (
    <div>
      <h3
        className={[
          sidepanelLayout ? sidePanelStyles.SidePanel__Header : null,
          sidepanelLayout ? 'h2' : null,
        ].join(' ')}
      >
        {title}
      </h3>
      <p>{description}</p>
    </div>
  )
}

NotificationCurrentInfoContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  sidepanelLayout: PropTypes.bool.isRequired,
}

export default NotificationCurrentInfoContent
