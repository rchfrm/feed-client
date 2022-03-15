import React from 'react'
import PropTypes from 'prop-types'

import LinkBankListButtons from '@/app/LinkBankListButtons'
import LinkBankFolder from '@/app/LinkBankFolder'
import LinkBankLink from '@/app/LinkBankLink'

const LinkBankList = ({
  looseLinks,
  linkFolders,
  isDisabled,
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
      <LinkBankListButtons
        className="grey-2 mb-8"
        editModeOn={editModeOn}
        setEditModeOn={setEditModeOn}
        totalLinks={mergedLinks.length}
        isDisabled={isDisabled}
      />
      {!!mergedLinks.length && (
        <ul>
          {mergedLinks.map((item) => {
            const { id, links } = item
            const type = links ? 'folder' : 'link'
            // LINK
            if (type === 'link') {
              return (
                <LinkBankLink
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
              <LinkBankFolder
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

LinkBankList.propTypes = {
  looseLinks: PropTypes.array.isRequired,
  linkFolders: PropTypes.array.isRequired,
}


export default LinkBankList
