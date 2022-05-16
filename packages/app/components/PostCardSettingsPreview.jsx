import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardSettingsPreview = ({
  urls,
}) => {
  console.log(urls)

  return (
    <div className="flex flex-column w-full">
      <h3 className="font-bold text-lg">Preview</h3>
      <ul>
        <li className="flex items-center pl-6">
          <span className="inline-block mr-2 h-4 w-4 bg-red rounded-full" />
          Engage preview:
          <Link href="https://fb.me/1OwDwjmZE0hGsiL"><a className="ml-1">https://fb.me/1OwDwjmZE0hGsiL</a></Link>
        </li>
      </ul>
    </div>
  )
}

PostCardSettingsPreview.propTypes = {
  urls: PropTypes.array,
}

PostCardSettingsPreview.defaultProps = {
  urls: [],
}

export default PostCardSettingsPreview
