import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'
import linksStore from '@/app/store/linksStore'

import Input from '@/elements/Input'
import Select from '@/elements/Select'
import Error from '@/elements/Error'
import CheckboxButton from '@/elements/CheckboxButton'

import * as utils from '@/helpers/utils'
import { defaultFolderId } from '@/app/helpers/linksHelpers'

const PostsLinksEditModal = ({
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
    const hasError = !utils.testValidUrl(utils.enforceUrlProtocol(linkProps.href))
    setHasHrefError(hasError)
  }, [linkProps.href])

  // IS SAVING ENABLED
  const [saveEnabled, setSaveEnabled] = React.useState(false)
  React.useEffect(() => {
    const saveEnabled = linkProps.href && !hasHrefError
    setSaveEnabled(saveEnabled)
  }, [linkProps.href, hasHrefError])

  // UPDATE MODAL SAVE BUTTON
  const { setButtons } = useAlertModal()
  React.useEffect(() => {
    const newButtons = produce(modalButtons, draftButtons => {
      // Update save button
      draftButtons[0].onClick = () => runSaveLink(linkProps, action, link)
      draftButtons[0].disabled = !saveEnabled
      // Update delete button
      if (draftButtons[1].id === 'delete') {
        draftButtons[1].onClick = () => runSaveLink(linkProps, 'delete', link)
      }
    })
    setButtons(newButtons)
  // eslint-disable-next-line
  }, [linkProps, setButtons, saveEnabled])

  // SHOW FOLDER OPTION? (hidden if creating link on post)
  const [showFolderOption, setShowFolderOption] = React.useState(!isPostLink)
  const [savePostLink, setSavePostLink] = React.useState(false)
  React.useEffect(() => {
    if (isPostLink) {
      setShowFolderOption(savePostLink)
    }
  }, [isPostLink, savePostLink])


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
    const newLinkProps = produce(linkProps, draftProps => {
      draftProps[prop] = e.target.value
    })
    setLinkProps(newLinkProps)
  }, [linkProps])

  // GET ARRAY OF FOLDERS
  const savedFolders = linksStore(React.useCallback((state) => state.savedFolders, []))
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
          if (!saveEnabled) return
          runSaveLink(linkProps, action)
        }}
        noValidate
      >
        <Input
          placeholder="https://"
          type="url"
          version="box"
          label="Link URL"
          name="link-url"
          handleChange={(e) => {
            handleInput(e, 'href')
            if (showHrefError && !hasHrefError) {
              setShowHrefError(false)
            }
          }}
          onBlur={() => {
            if (hasHrefError) return setShowHrefError(true)
            setShowHrefError(false)
          }}
          value={linkProps.href}
          error={showHrefError}
          errorMessage="Please use a valid URL"
          required
        />
        <Input
          placeholder=""
          type="text"
          version="box"
          label="Link Name"
          name="link-name"
          handleChange={(e) => handleInput(e, 'name')}
          value={linkProps.name}
          required
        />
        {/* SAVE LINK OPTION */}
        {isPostLink && (
          <div className="mb-7">
            <CheckboxButton
              label="Save link?"
              value="yes"
              checked={savePostLink}
              onChange={(value, checked) => {
                setSavePostLink(!checked)
              }}
            />
          </div>
        )}
        {/* FOLDER OPTION */}
        {showFolderOption && (
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
                  required
                />
                {/* Close new folder input */}
                <p
                  className={[
                    'absolute absolute--center-y right-0 mr-4 pt-16',
                    'text-sm',
                  ].join(' ')}
                >
                  <a
                    className="text-grey-3 -hover--green"
                    role="button"
                    onClick={() => {
                      const e = { target: { value: link ? link.folder_id : '' } }
                      handleInput(e, 'folder_id', true)
                    }}
                  >
                    Use existing folder
                  </a>
                </p>
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
        )}
      </form>
      {/* CANNOT DELETE DEFAULT */}
      {isDefaultLink && !error && (
        <Error
          error={{ message: 'This is the default link. If you want to remove it please choose another default link.' }}
        />
      )}
    </div>
  )
}

PostsLinksEditModal.propTypes = {
  link: PropTypes.object,
  modalButtons: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  runSaveLink: PropTypes.func.isRequired,
  isDefaultLink: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isPostLink: PropTypes.bool.isRequired,
}

PostsLinksEditModal.defaultProps = {
  link: null,
  error: null,
}


export default PostsLinksEditModal
