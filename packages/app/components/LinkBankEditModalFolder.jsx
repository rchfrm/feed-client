import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'

import Input from '@/elements/Input'
import Error from '@/elements/Error'

import copy from '@/app/copy/PostsPageCopy'

const LinkBankEditModalFolder = ({
  folder,
  modalButtons,
  action,
  runSaveFolder,
  isDefaultLinkInFolder,
  error,
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
          onClick: () => runSaveFolder(folderProps, 'delete', folder),
        },
        {
          text: 'Cancel',
          onClick: closeAlert,
          version: 'secondary',
        },
      ],
    })
  }, [showAlert, closeAlert, folder, folderProps, runSaveFolder])

  // UPDATE ALERT MODAL BUTTONS
  React.useEffect(() => {
    const newButtons = produce(modalButtons, (draftButtons) => {
      // Is buttons disabled
      const saveEnabled = !! folderProps.name
      // Update save button
      draftButtons[1].onClick = () => runSaveFolder(folderProps, action, folder)
      draftButtons[1].disabled = ! saveEnabled
      // Update delete button
      if (draftButtons[0].id === 'delete') {
        draftButtons[0].onClick = confirmDelete
      }
    })
    setButtons(newButtons)
  // eslint-disable-next-line
  }, [folderProps, setButtons])

  // HANDLE CHANGE ON FORM FIELDS
  const handleInput = React.useCallback((e, prop) => {
    // Update component-level link store
    const newfolderProps = produce(folderProps, (draftProps) => {
      draftProps[prop] = e.target.value
    })
    setFolderProps(newfolderProps)
  }, [folderProps])

  return (
    <div className="pt-3">
      {/* ERROR */}
      {error && <Error error={error} messagePrefix="Error editing folder: " />}
      {/* FORM */}
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
      {/* CANNOT DELETE DEFAULT */}
      {isDefaultLinkInFolder && ! error && (
        <Error
          error={{ message: 'This folder includes the default link. If you want to remove it please choose another default link.' }}
        />
      )}
    </div>
  )
}

LinkBankEditModalFolder.propTypes = {
  folder: PropTypes.object.isRequired,
  modalButtons: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  runSaveFolder: PropTypes.func.isRequired,
  isDefaultLinkInFolder: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

LinkBankEditModalFolder.defaultProps = {
  error: null,
}



export default LinkBankEditModalFolder
