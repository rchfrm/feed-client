import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { capitalise } from '@/helpers/utils'

const PostCardSettingsPreview = ({
  links,
}) => {
  const backgroundColorClass = {
    engage: 'bg-blue',
    nurture: 'bg-green',
    sales: 'bg-red',
  }

  return (
    <div className="flex flex-column w-full mb-10">
      <h3 className="font-bold text-lg">{Object.keys(links).length > 1 ? 'Previews' : 'Preview'}</h3>
      <ul className="mb-0">
        {Object.entries(links).map(([key, value]) => (
          <li key={value} className="flex items-center pl-6 mb-2">
            <span className={[
              'inline-block mr-2 h-4 w-4 rounded-full',
              backgroundColorClass[key],
            ].join(' ')}
            />
            {capitalise(key)} preview:
            <Link href={value}>
              <a target="_blank" className="ml-1">{value}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

PostCardSettingsPreview.propTypes = {
  links: PropTypes.object,
}

PostCardSettingsPreview.defaultProps = {
  links: null,
}

export default PostCardSettingsPreview
