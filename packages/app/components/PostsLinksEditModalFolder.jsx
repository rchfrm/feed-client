import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'

import Input from '@/elements/Input'
import copy from '@/app/copy/PostsPageCopy'

const PostsLinksEditModalFolder = ({
  folder,
  modalButtons,
  action,
  runSaveFolder,
}) => {
  const [folderProps, setFolderProps] = React.useState(folder || {})
  // GET MODAL PROPS
  const { setButtons, showAlert, closeAlert } = useAlertModal()

  // CONFIRM DELETE
  const confirmDelete = React.useCallback(() => {
    showAlert({
      children: null,
      copy: copy.confirmDeleteFolder,
      buttons: [
        {
          text: 'Yes, I\'m sure',
          onClick: () => runSaveFolder(folderProps, 'delete'),
          color: 'red',
        },
        {
          text: 'Cancel',
          onClick: closeAlert,
          color: 'black',
        },
      ],
    })
  }, [showAlert, closeAlert, folderProps, runSaveFolder])

  // UPDATE ALERT MODAL BUTTONS
  React.useEffect(() => {
    const newButtons = produce(modalButtons, draftButtons => {
      // Is buttons disabled
      const saveEnabled = !!folderProps.name
      // Update save button
      draftButtons[0].onClick = () => runSaveFolder(folderProps, action)
      draftButtons[0].disabled = !saveEnabled
      // Update delete button
      if (draftButtons[1].id === 'delete') {
        draftButtons[1].onClick = confirmDelete
      }
    })
    setButtons(newButtons)
  // eslint-disable-next-line
  }, [folderProps, setButtons])

  // HANDLE CHANGE ON FORM FIELDS
  const handleInput = React.useCallback((e, prop) => {
    // Update component-level link store
    const newfolderProps = produce(folderProps, draftProps => {
      draftProps[prop] = e.target.value
    })
    setFolderProps(newfolderProps)
  }, [folderProps])

  return (
    <div className="pt-3">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Input
          placeholder=""
          type="text"
          version="box"
          label="Folder Name"
          name="folder-name"
          handleChange={(e) => handleInput(e, 'name')}
          value={folderProps.name}
          required
        />
      </form>
    </div>
  )
}

PostsLinksEditModalFolder.propTypes = {
  folder: PropTypes.object.isRequired,
  modalButtons: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  runSaveFolder: PropTypes.func.isRequired,
}


export default PostsLinksEditModalFolder
