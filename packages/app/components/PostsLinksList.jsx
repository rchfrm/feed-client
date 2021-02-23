import React from 'react'
import PropTypes from 'prop-types'

import PostsLinksListButtons from '@/app/PostsLinksListButtons'
import PostsLinksFolder from '@/app/PostsLinksFolder'
import PostsLinksLink from '@/app/PostsLinksLink'

const PostsLinksList = ({
  looseLinks,
  linkFolders,
}) => {
  const [editModeOn, setEditModeOn] = React.useState(false)
  const mergedLinks = React.useMemo(() => {
    return [...looseLinks, ...linkFolders]
  }, [looseLinks, linkFolders])
  return (
    <div>
      {!mergedLinks.length && (
        <p className="pb-2 text-lg">You don't have any links saved yet.</p>
      )}
      <PostsLinksListButtons
        className="mb-8"
        editModeOn={editModeOn}
        setEditModeOn={setEditModeOn}
        totalLinks={mergedLinks.length}
      />
      {!!mergedLinks.length && (
        <ul>
          {mergedLinks.map((item) => {
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
                  className="mb-5"
                />
              )
            }
            // FOLDER
            // Don't show if empty
            if (!links.length) return null
            return (
              <PostsLinksFolder
                key={id}
                folder={item}
                editModeOn={editModeOn}
                setEditModeOn={setEditModeOn}
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
  looseLinks: PropTypes.array.isRequired,
  linkFolders: PropTypes.array.isRequired,
}


export default PostsLinksList
