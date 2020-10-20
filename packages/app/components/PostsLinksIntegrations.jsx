import React from 'react'
import PropTypes from 'prop-types'

import Icon from '@/elements/Icon'
import Button from '@/elements/Button'
import RadioButton from '@/elements/RadioButton'

import brandColors from '@/constants/brandColors'

const PostsLinksIntegrations = ({
  integrations,
  className,
  useSelectMode,
}) => {
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
          const text = href || 'not connnected'
          if (useSelectMode && !href) return null
          return (
            <li
              key={platform}
              className={[
                useSelectMode ? 'mb-8' : 'mb-6',
                'last:mb-0',
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
                {useSelectMode ? (
                  <RadioButton
                    value={href}
                    name={href}
                    label={href}
                    checked={false}
                    onChange={() => {}}
                    className="mb-0"
                  />
                ) : text}
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
  integrations: PropTypes.array.isRequired,
  className: PropTypes.string,
  useSelectMode: PropTypes.bool.isRequired,
}

PostsLinksIntegrations.defaultProps = {
  className: null,
}


export default PostsLinksIntegrations
