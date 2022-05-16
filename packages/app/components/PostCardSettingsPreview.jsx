import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardSettingsPreview = ({
  urls,
}) => {
  return (
    <div className="flex flex-column w-full">
      <h3 className="font-bold text-lg">Preview</h3>
      <ul>
        {urls.map((url) => (
          <li key={url} className="flex items-center pl-6">
            <span className="inline-block mr-2 h-4 w-4 bg-red rounded-full" />
            Engage preview:
            <Link href={url}>
              <a target="_blank" className="ml-1">{url}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

PostCardSettingsPreview.propTypes = {
  urls: PropTypes.array.isRequired,
}

PostCardSettingsPreview.defaultProps = {
}

export default PostCardSettingsPreview
