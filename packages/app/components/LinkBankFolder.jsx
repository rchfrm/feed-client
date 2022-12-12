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

import LinkBankLink from '@/app/LinkBankLink'

import useCreateEditLinkBankLink from '@/app/hooks/useCreateEditLinkBankLink'

import useControlsStore from '@/app/stores/controlsStore'

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

// Links store requests
const getLinkFolderState = (state) => state.folderStates
const getUpdateFolderStates = (state) => state.updateFolderStates

const LinkBankFolder = ({
  folder,
  editModeOn,
  setEditModeOn,
  className,
}) => {
  // FUNCTION FOR EDITING LINKS
  const editFolder = useCreateEditLinkBankLink({
    action: 'edit',
    itemType: 'folder',
    onSave: () => setEditModeOn(false),
  })

  const { id: folderId } = folder

  // * OPEN STATE

  // Get open state from store
  const folderStates = useControlsStore(getLinkFolderState)
  const [isOpen, setIsOpen] = React.useState(true)

  // Set initial open state
  const [initialStateSet, setInitialStateSet] = React.useState(false)
  React.useEffect(() => {
    const { open = true } = folderStates[folderId] || {}
    setIsOpen(open)
    setInitialStateSet(true)
  // eslint-disable-next-line
  }, [])

  // Update local storage when changing open state
  const updateFolderStates = useControlsStore(getUpdateFolderStates)
  React.useEffect(() => {
    if (! initialStateSet) return
    updateFolderStates(folderId, isOpen)
  // eslint-disable-next-line
  }, [isOpen])

  if (! initialStateSet) return null

  return (
    <Accordion
      className={[
        className,
      ].join(' ')}
      allowMultipleExpanded
      allowZeroExpanded
      preExpanded={isOpen ? [folderId] : []}
      onChange={([openFolderId]) => {
        setIsOpen(!! openFolderId)
      }}
    >
      <AccordionItem uuid={folderId}>
        <AccordionItemState>
          {({ expanded }) => (
            <>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <p
                    className={[
                      'flex items-baseline',
                      'mb-3',
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
                    <LinkBankLink
                      className="ml-8 mb-3 last:mb-0"
                      style={{ paddingLeft: '0.1rem' }}
                      key={id}
                      link={item}
                      editModeOn={editModeOn}
                      setEditModeOn={setEditModeOn}
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

LinkBankFolder.propTypes = {
  folder: PropTypes.object.isRequired,
  editModeOn: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  className: PropTypes.string,
}

LinkBankFolder.defaultProps = {
  className: null,
}


export default LinkBankFolder
