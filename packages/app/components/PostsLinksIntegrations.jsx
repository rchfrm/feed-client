import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import Button from '@/elements/Button'
import PlatformIcon from '@/icons/PlatformIcon'
import PencilIcon from '@/icons/PencilIcon'
import MarkdownText from '@/elements/MarkdownText'

import { removeProtocolFromUrl } from '@/helpers/utils'

import * as ROUTES from '@/app/constants/routes'
import brandColors from '@/constants/brandColors'

import copy from '@/app/copy/PostsPageCopy'

const PostsLinksIntegrations = ({
  integrationLinks,
  className,
}) => {
  const goToIntegrations = () => {
    Router.push(ROUTES.CONTROLS_INTEGRATIONS)
  }
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
      <Button
        version="x-small green icon"
        onClick={goToIntegrations}
      >
        <PencilIcon fill={brandColors.bgColor} style={{ height: '1rem' }} />
        Edit Integrations
      </Button>
    </div>
  )
}

PostsLinksIntegrations.propTypes = {
  integrationLinks: PropTypes.array.isRequired,
  className: PropTypes.string,
}

PostsLinksIntegrations.defaultProps = {
  className: null,
}


export default PostsLinksIntegrations
