import React from 'react'
import PropTypes from 'prop-types'

import PostsLinksListButtons from '@/app/PostsLinksListButtons'
import PostsLinksFolder from '@/app/PostsLinksFolder'
import PostsLinksLink from '@/app/PostsLinksLink'

const PostsLinksList = ({
  nestedLinks,
  useSelectMode,
}) => {
  const [editModeOn, setEditModeOn] = React.useState(false)
  return (
    <div>
      {!nestedLinks.length && (
        <p className="pb-2 text-lg">You don't have any links saved yet.</p>
      )}
      <PostsLinksListButtons
        className="mb-10"
        editModeOn={editModeOn}
        setEditModeOn={setEditModeOn}
        totalLinks={nestedLinks.length}
      />
      {!!nestedLinks.length && (
        <ul className="text-lg">
          {nestedLinks.map((item) => {
            const { id, links } = item
            const type = links ? 'folder' : 'link'
            // LINK
            if (type === 'link') {
              return (
                <PostsLinksLink
                  key={id}
                  link={item}
                  editModeOn={editModeOn}
                  setEditModeOn={setEditModeOn}
                  useSelectMode={useSelectMode}
                  className="mb-5"
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
                className="mb-5"
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

PostsLinksList.propTypes = {
  nestedLinks: PropTypes.array.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
}


export default PostsLinksList
