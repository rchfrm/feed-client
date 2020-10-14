import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import PencilIcon from '@/icons/PencilIcon'

import brandColors from '@/constants/brandColors'

const PostsLinksListButtons = ({
  editMode,
  setEditMode,
  className,
}) => {
  return (
    <div
      className={[
        'flex',
        className,
      ].join(' ')}
    >
      {/* ADD */}
      <Button
        version="x-small black"
        className="mr-5"
      >
        + Add
      </Button>
      {/* EDIT */}
      <Button
        version="x-small green icon"
      >
        <PencilIcon fill={brandColors.bgColor} />
        Edit
      </Button>
    </div>
  )
}

PostsLinksListButtons.propTypes = {
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  className: PropTypes.string,
}

PostsLinksListButtons.defaultProps = {
  className: null,
}


export default PostsLinksListButtons
