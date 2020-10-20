import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'

const IntegrationsPanelIntegration = ({ integration, className }) => {
  const { title, platform, accountId, link, color } = integration
  const isPopulated = accountId
  return (
    <li
      className={[
        'mb-6 last:mb-0',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'flex items-center',
        ].join(' ')}
      >
        <PlatformIcon
          platform={platform}
          className="h-6 w-auto pr-5"
          title={title}
          style={null}
        />
        {isPopulated ? accountId : (
          <span className="text-grey-3">not connected</span>
        )}
      </div>
    </li>
  )
}

IntegrationsPanelIntegration.propTypes = {
  integration: PropTypes.object.isRequired,
  className: PropTypes.string,
}

IntegrationsPanelIntegration.defaultProps = {
  className: null,
}


export default IntegrationsPanelIntegration
