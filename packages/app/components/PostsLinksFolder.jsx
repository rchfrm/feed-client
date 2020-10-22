import React from 'react'
import PropTypes from 'prop-types'

import {
  Accordion,
  AccordionItem,
  AccordionItemState,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import FolderIcon from '@/icons/FolderIcon'
import ArrowHeadIcon from '@/icons/ArrowHeadIcon'

import PostsLinksLink from '@/app/PostsLinksLink'

import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'

const FOLDER_NAME = ({ name, editModeOn }) => {
  return (
    <strong
      className={[
        'inline-block',
        editModeOn ? 'wobble-animation' : null,
      ].join(' ')}
    >
      {name}
    </strong>
  )
}

const PostsLinksFolder = ({
  folder,
  editModeOn,
  setEditModeOn,
  useSelectMode,
  className,
}) => {
  // FUNCTION FOR EDITING LINKS
  const editFolder = useCreateEditPostsLink({
    action: 'edit',
    itemType: 'folder',
    onSave: () => setEditModeOn(false),
  })
  return (
    <Accordion
      className={[
        className,
      ].join(' ')}
      allowMultipleExpanded
      allowZeroExpanded
    >
      <AccordionItem uuid={folder.id}>
        <AccordionItemState>
          {({ expanded }) => (
            <>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <p
                    className={[
                      'flex items-baseline',
                      useSelectMode ? 'mb-5' : 'mb-3',
                    ].join(' ')}
                  >
                    <span className="h-4 mr-3">
                      <FolderIcon className="w-auto h-full" />
                    </span>
                    {editModeOn ? (
                      <a
                        role="button"
                        aria-label="Edit folder"
                        onClick={(e) => {
                          e.stopPropagation()
                          editFolder(folder)
                        }}
                      >
                        <FOLDER_NAME name={folder.name} editModeOn={editModeOn} />
                      </a>
                    ) : <FOLDER_NAME name={folder.name} editModeOn={editModeOn} />}
                    <ArrowHeadIcon
                      className="ml-3"
                      style={{
                        height: '0.5rem',
                        width: 'auto',
                        transform: expanded ? 'rotate(0deg) translateY(-0.05rem)' : 'rotate(-90deg) translateX(0.1rem)',
                      }}
                    />
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {folder.links.map((item) => {
                  const { id } = item
                  // LINK
                  return (
                    <PostsLinksLink
                      className="ml-8 mb-3 last:mb-0"
                      style={{ paddingLeft: '0.1rem' }}
                      key={id}
                      link={item}
                      editModeOn={editModeOn}
                      setEditModeOn={setEditModeOn}
                      useSelectMode={useSelectMode}
                    />
                  )
                })}
              </AccordionItemPanel>
            </>
          )}
        </AccordionItemState>
      </AccordionItem>
    </Accordion>
  )
}

PostsLinksFolder.propTypes = {
  folder: PropTypes.object.isRequired,
  editModeOn: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  useSelectMode: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

PostsLinksFolder.defaultProps = {
  className: null,
}


export default PostsLinksFolder
