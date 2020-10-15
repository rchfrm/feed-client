import React from 'react'
import PropTypes from 'prop-types'

import PostsLinksListButtons from '@/app/PostsLinksListButtons'
import PostsLinksFolder from '@/app/PostsLinksFolder'
import PostsLinksLink from '@/app/PostsLinksLink'

const PostsLinksList = ({
  savedLinks,
  useSelectMode,
}) => {
  const [editModeOn, setEditModeOn] = React.useState(false)
  return (
    <div>
      <PostsLinksListButtons
        className="mb-10"
        editModeOn={editModeOn}
        setEditModeOn={setEditModeOn}
      />
      <ul className="text-lg">
        {savedLinks.map((item) => {
          const { type, id } = item
          // LINK
          if (type === 'link') {
            return (
              <PostsLinksLink
                key={id}
                link={item}
                editModeOn={editModeOn}
                setEditModeOn={setEditModeOn}
                useSelectMode={useSelectMode}
              />
            )
          }
          // FOLDER
          return (
            <PostsLinksFolder
              key={id}
              folder={item}
              editModeOn={editModeOn}
              setEditModeOn={setEditModeOn}
              useSelectMode={useSelectMode}
            />
          )
        })}
      </ul>
    </div>
  )
}

PostsLinksList.propTypes = {
  savedLinks: PropTypes.array.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
}


export default PostsLinksList
