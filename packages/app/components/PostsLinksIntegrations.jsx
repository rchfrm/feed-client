import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@/elements/Icon'
import Button from '@/elements/Button'

import brandColors from '@/constants/brandColors'

const PostsLinksIntegrations = ({ className, useSelectMode }) => {
  const integrations = [
    {
      type: 'instagram',
      href: 'https://instagram.com/houseboat',
    },
    {
      type: 'youtube',
      href: 'https://youtube.com/houseboat',
    },
    {
      type: 'spotify',
      href: null,
    },
  ]
  return (
    <>
      <ul
        className={[
          'pt-3 mb-8',
          'text-lg',
          className,
        ].join(' ')}
      >
        {integrations.map((integration) => {
          const { type: platform, href } = integration
          const { bg: color } = brandColors[platform]
          return (
            <li
              key={platform}
              className={[
                'mb-6 last:mb-0',
                !href ? 'text-grey-3' : null,
              ].join(' ')}
            >
              <p className="flex items-center mb-0">
                <span className={['mr-5', !href ? 'opacity-50' : null].join(' ')}>
                  <Icon
                    version={integration.type}
                    color={color}
                    width="1.5rem"
                  />
                </span>
                {href || 'not connected'}
              </p>
            </li>
          )
        })}
      </ul>
      {!useSelectMode && (
        <Button
          version="green small"
        >
          Edit Integrations
        </Button>
      )}
    </>
  )
}

PostsLinksIntegrations.propTypes = {
  className: PropTypes.string,
  useSelectMode: PropTypes.bool.isRequired,
}

PostsLinksIntegrations.defaultProps = {
  className: null,
}


export default PostsLinksIntegrations
