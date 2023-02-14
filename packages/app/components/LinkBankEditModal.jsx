import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'
import useControlsStore from '@/app/stores/controlsStore'

import Input from '@/elements/Input'
import Select from '@/elements/Select'
import Error from '@/elements/Error'

import * as utils from '@/helpers/utils'
import { defaultFolderId } from '@/app/helpers/linksHelpers'

const LinkBankEditModal = ({
  link,
  modalButtons,
  action,
  runSaveLink,
  isDefaultLink,
  isPostLink,
  error,
}) => {
  const [linkProps, setLinkProps] = React.useState(link || {})
  // MAKE SURE HREF IS VALID
  const [hasHrefError, setHasHrefError] = React.useState(false)
  const [showHrefError, setShowHrefError] = React.useState(false)
  React.useEffect(() => {
    const hasError = ! utils.testValidUrl(linkProps.href, true)
    setHasHrefError(hasError)
  }, [linkProps.href])
  // MAKE SURE THERE IS A NAME
  const [hasNameError, setHasNameError] = React.useState(false)
  const [showNameError, setShowNameError] = React.useState(false)
  React.useEffect(() => {
    setHasNameError(! linkProps.name)
  }, [linkProps.name])

  // IS SAVING ENABLED
  const [saveEnabled, setSaveEnabled] = React.useState(false)
  React.useEffect(() => {
    const saveEnabled = ! hasNameError && ! hasHrefError
    setSaveEnabled(saveEnabled)
  }, [hasNameError, hasHrefError])

  // UPDATE MODAL SAVE BUTTON
  const { setButtons } = useAlertModal()
  React.useEffect(() => {
    const newButtons = produce(modalButtons, (draftButtons) => {
      // Update save button
      draftButtons[1].onClick = () => runSaveLink(linkProps, action, link)
      draftButtons[1].disabled = ! saveEnabled
      // Update delete button
      if (draftButtons[0].id === 'delete') {
        draftButtons[0].onClick = () => runSaveLink(linkProps, 'delete', link)
      }
    })
    setButtons(newButtons)
  // eslint-disable-next-line
  }, [linkProps, setButtons, saveEnabled])

  // HANDLE CREATING NEW FOLDERS
  const [createNewFolder, setCreateNewFolder] = React.useState(false)

  // HANDLE CHANGE ON FORM FIELDS
  const handleInput = React.useCallback((e, prop, folderSelector) => {
    // Stop here if selecting new folder
    if (folderSelector) {
      if (e.target.value === '_newFolder') {
        setCreateNewFolder(true)
      } else {
        setCreateNewFolder(false)
      }
    }
    // Update component-level link store
    const newLinkProps = produce(linkProps, (draftProps) => {
      draftProps[prop] = e.target.value
    })
    setLinkProps(newLinkProps)
  }, [linkProps])

  // GET ARRAY OF FOLDERS
  const savedFolders = useControlsStore(React.useCallback((state) => state.savedFolders, []))
  const folderOptions = React.useMemo(() => {
    // Add value key to folder
    const foldersWithValue = savedFolders.map((folder) => {
      return { ...folder, value: folder.id }
    })
    // Add "New Folder" and "None" option
    return [
      {
        name: '-',
        value: defaultFolderId,
      },
      ...foldersWithValue,
      {
        name: '+ New Folder',
        value: '_newFolder',
      },
    ]
  }, [savedFolders])

  return (
    <div className="pt-3">
      {/* ERROR */}
      {error && <Error error={error} messagePrefix="Error saving link: " />}
      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (! saveEnabled) return
          runSaveLink(linkProps, action)
        }}
        noValidate
      >
        {/* LINK HREF */}
        <Input
          placeholder="https://"
          type="url"
          version="box"
          label="Link URL"
          name="link-url"
          value={linkProps.href}
          handleChange={(e) => {
            handleInput(e, 'href')
            if (showHrefError && ! hasHrefError) {
              setShowHrefError(false)
            }
          }}
          onBlur={() => {
            if (hasHrefError) return setShowHrefError(true)
            setShowHrefError(false)
          }}
          error={showHrefError}
          errorMessage="Please use a valid URL"
          required
        />
        {/* LINK NAME */}
        <Input
          placeholder=""
          type="text"
          version="box"
          label="Link Name"
          name="link-name"
          handleChange={(e) => {
            handleInput(e, 'name')
            if (showNameError && hasNameError) {
              setShowNameError(false)
            }
          }}
          value={linkProps.name}
          onBlur={() => {
            if (hasNameError) return setShowNameError(true)
            setShowNameError(false)
          }}
          error={showNameError}
          errorMessage="Please include a name"
          required
        />
        {/* FOLDER OPTION */}
        <>
          {createNewFolder ? (
            <div className="relative">
              <Input
                placeholder="Folder name"
                type="text"
                version="box"
                label="New folder"
                name="new-folder"
                handleChange={(e) => handleInput(e, 'folderName')}
                value={linkProps.folderName}
                autoFocus
                required
              />
              {/* Close new folder input */}
              {! linkProps.folderName && (
                <p
                  className={[
                    'absolute absolute--center-y right-0 mr-4 pt-16',
                    'text-sm',
                  ].join(' ')}
                >
                  {!! savedFolders.length && (
                    <a
                      className="text-grey-dark -hover--green"
                      role="button"
                      onClick={() => {
                        const e = { target: { value: link ? link.folder_id : '' } }
                        handleInput(e, 'folder_id', true)
                      }}
                    >
                      Use existing folder
                    </a>
                  )}
                </p>
              )}
            </div>
          ) : (
            <Select
              handleChange={(e) => handleInput(e, 'folder_id', true)}
              name="link-folder"
              label="Folder"
              placeholder="Select folder"
              selectedValue={linkProps.folder_id}
              options={folderOptions}
            />
          )}
        </>
      </form>
      {isPostLink && (
        <p className="-mt-2 text-sm">* This link will be added to your saved links.</p>
      )}
      {/* CANNOT DELETE DEFAULT */}
      {isDefaultLink && ! error && (
        <Error
          error={{ message: 'This is the default link. If you want to remove it please choose another default link.' }}
        />
      )}
    </div>
  )
}

LinkBankEditModal.propTypes = {
  link: PropTypes.object,
  modalButtons: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  runSaveLink: PropTypes.func.isRequired,
  isDefaultLink: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isPostLink: PropTypes.bool.isRequired,
}

LinkBankEditModal.defaultProps = {
  link: null,
  error: null,
}


export default LinkBankEditModal
