import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { capitalise } from '@/helpers/utils'
import useBreakpointTest from '@/hooks/useBreakpointTest'

const PostSettingsPreview = ({
  previewLinks,
  campaignType,
}) => {
  const isDesktopLayout = useBreakpointTest('sm')

  const backgroundColorClass = {
    engage: 'bg-twitter',
    nurture: 'bg-green',
    sales: 'bg-red',
  }

  const { sales: salesLink, ...growAndNurtureLinks } = previewLinks || {}
  const sortedPreviewLinks = Object.entries(previewLinks).sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <div className="flex flex-column w-full mb-10">
      <h3 className="font-bold text-lg">{campaignType === 'all' && Object.keys(growAndNurtureLinks).length > 1 ? 'Previews' : 'Preview'}</h3>
      <ul className="mb-0">
        {sortedPreviewLinks.map(([key, value]) => {
          const shouldShowPreviewLink = (campaignType === 'all' && key !== 'sales') || (campaignType === 'conversions' && key === 'sales')

          if (shouldShowPreviewLink) {
            return (
              <li key={key} className="flex items-center pl-4 mb-2">
                <span className={[
                  'inline-block mr-2 h-4 w-4 rounded-full',
                  backgroundColorClass[key],
                ].join(' ')}
                />
                {isDesktopLayout && (`${capitalise(key)} ad: `)}
                <Link href={value} target="_blank" className="ml-1">
                  {isDesktopLayout ? value : `${capitalise(key)} ad`}
                </Link>
              </li>
            )
          }
          return null
        })}
      </ul>
    </div>
  )
}

PostSettingsPreview.propTypes = {
  previewLinks: PropTypes.object,
  campaignType: PropTypes.string.isRequired,
}

PostSettingsPreview.defaultProps = {
  previewLinks: null,
}

export default PostSettingsPreview
