import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import useAlertModal from '@/hooks/useAlertModal'
import usePostsStore from '@/app/hooks/usePostsStore'

import Input from '@/elements/Input'
import Select from '@/elements/Select'

import * as utils from '@/helpers/utils'
import { defaultFolderId } from '@/app/helpers/postsHelpers'

const PostsLinksEditModal = ({
  link,
  modalButtons,
  action,
  runSaveLink,
}) => {
  const [linkProps, setLinkProps] = React.useState(link || {})
  // MAKE SURE HREF IS VALID
  const [hasHrefError, setHasHrefError] = React.useState(false)
  const [showHrefError, setShowHrefError] = React.useState(false)
  React.useEffect(() => {
    const hasError = !utils.testValidUrl(`https://${linkProps.href}`)
    setHasHrefError(hasError)
  }, [linkProps.href])

  // UPDATE MODAL SAVE BUTTON
  const { setButtons } = useAlertModal()
  React.useEffect(() => {
    const newButtons = produce(modalButtons, draftButtons => {
      // Is buttons disabled
      const saveEnabled = !!linkProps.href && !hasHrefError
      // Update save button
      draftButtons[0].onClick = () => runSaveLink(linkProps, action)
      draftButtons[0].disabled = !saveEnabled
      // Update delete button
      if (draftButtons[1].id === 'delete') {
        draftButtons[1].onClick = () => runSaveLink(linkProps, 'delete')
      }
    })
    setButtons(newButtons)
  // eslint-disable-next-line
  }, [linkProps, setButtons])

  // HANDLE CREATING NEW FOLDERS
  const [createNewFolder, setCreateNewFolder] = React.useState(false)

  // HANDLE CHANGE ON FORM FIELDS
  const handleInput = React.useCallback((e, prop, folderSelector) => {
    // Stop here if selecting new fodler
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
  const { savedFolders } = usePostsStore()
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
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
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
            console.log('BLUERRRRRR')
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
        {createNewFolder ? (
          <div>
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
            <p className="-mt-6 text-sm">
              <a
                className="no-underline text-grey-3 -hover--green"
                role="button"
                onClick={() => {
                  const e = { target: { value: link ? link.folderId : '' } }
                  handleInput(e, 'folderId', true)
                }}
              >
                Cancel
              </a>
            </p>
          </div>
        ) : (
          <Select
            handleChange={(e) => handleInput(e, 'folderId', true)}
            name="link-folder"
            label="Folder"
            placeholder="Select folder"
            selectedValue={linkProps.folderId}
            options={folderOptions}
          />
        )}
      </form>
    </div>
  )
}

PostsLinksEditModal.propTypes = {
  link: PropTypes.object,
  modalButtons: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
  runSaveLink: PropTypes.func.isRequired,
}

PostsLinksEditModal.defaultProps = {
  link: null,
}


export default PostsLinksEditModal
