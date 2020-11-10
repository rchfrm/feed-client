import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import Button from '@/elements/Button'
import RadioButton from '@/elements/RadioButton'

// eslint-disable-next-line
import usePostsSidePanel from '@/app/hooks/usePostsSidePanel'
import useOpenIntegrationsPanel from '@/app/hooks/useOpenIntegrationsPanel'

import { removeProtocolFromUrl } from '@/helpers/utils'

const PostsLinksIntegrations = ({
  integrations,
  className,
  useSelectMode,
}) => {
  const { goToPostLinks } = usePostsSidePanel()
  const openIntegrationsPanel = useOpenIntegrationsPanel({
    goBack: goToPostLinks,
  })
  return (
    <>
      <ul
        className={[
          'pt-3 mb-8',
          className,
        ].join(' ')}
      >
        {integrations.map((integration) => {
          const { platform, href, title } = integration
          const text = `${title} account` || 'not connnected'
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
              <p className="flex items-top mb-0">
                <span
                  className={['mr-5', !href ? 'opacity-50' : null].join(' ')}
                  style={{
                    transform: 'translateY(0.05rem)',
                  }}
                >
                  <PlatformIcon
                    platform={platform}
                    className="w-6 h-auto"
                  />
                </span>
                {useSelectMode ? (
                  <RadioButton
                    value={href}
                    name={text}
                    label={text}
                    checked={false}
                    onChange={() => {}}
                    className="mb-0"
                  />
                ) : (
                  <>
                    <span
                      className={[
                        'inline-flex flex-col',
                      ].join(' ')}
                    >
                      {text}
                      {/* LINK PREVIEW */}
                      <a
                        className="block pt-1 text-xs text-grey-3 truncate w-full"
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {removeProtocolFromUrl(href)}
                      </a>
                    </span>
                  </>
                )}
              </p>
            </li>
          )
        })}
      </ul>
      {!useSelectMode && (
        <Button
          version="green small"
          onClick={openIntegrationsPanel}
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
