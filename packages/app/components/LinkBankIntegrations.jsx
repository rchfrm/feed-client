import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import MarkdownText from '@/elements/MarkdownText'

import { removeProtocolFromUrl } from '@/helpers/utils'

import copy from '@/app/copy/PostsPageCopy'

const LinkBankIntegrations = ({
  integrationLinks,
  className,
}) => {
  return (
    <div>
      <MarkdownText markdown={copy.integrationLinksIntro} />
      <ul
        className={[
          'pt-3 mb-8',
          className,
        ].join(' ')}
      >
        {integrationLinks.map((integration) => {
          const { platform, href, titleVerbose, isDefaultLink } = integration
          const text = titleVerbose || 'not connnected'
          return (
            <li
              key={platform}
              className={[
                'mb-6',
                'last:mb-0',
                !href ? 'text-grey-3' : null,
              ].join(' ')}
            >
              <p className="flex items-top mb-0">
                <span
                  className={['mr-5', !href ? 'opacity-50' : null].join(' ')}
                  style={{
                    transform: 'translateY(0.1rem)',
                  }}
                >
                  <PlatformIcon
                    platform={platform}
                    className="w-5 h-auto"
                  />
                </span>

                <span
                  className={[
                    'block w-full overflow-hidden',
                  ].join(' ')}
                >
                  {text}
                  {isDefaultLink && (
                  <span className="inline-flex text-green pl-2 text-sm">
                    <strong className="pr-1" style={{ transform: 'translateY(0.2em)' }}>*</strong>
                    <strong>default link</strong>
                  </span>
                  )}
                  {/* LINK PREVIEW */}
                  {href ? (
                    <a
                      className="block pt-1 text-xs text-grey-3 truncate w-full"
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {removeProtocolFromUrl(href)}
                    </a>
                  ) : (
                    <span className="block pt-1 text-xs text-grey-3 truncate w-full">
                      not connected
                    </span>
                  )}
                </span>
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

LinkBankIntegrations.propTypes = {
  integrationLinks: PropTypes.array.isRequired,
  className: PropTypes.string,
}

LinkBankIntegrations.defaultProps = {
  className: null,
}


export default LinkBankIntegrations
