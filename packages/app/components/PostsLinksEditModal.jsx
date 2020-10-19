import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import usePostsStore from '@/app/hooks/usePostsStore'

import Input from '@/elements/Input'
import Select from '@/elements/Select'

const PostsLinksEditModal = ({ link }) => {
  const [linkProps, setLinkProps] = React.useState(link || {})
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
    // Add "New Folder" option
    return [
      ...foldersWithValue,
      {
        name: '+ New Folder',
        value: '_newFolder',
      },
    ]
  }, [savedFolders])
  console.log('linkProps', linkProps)
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
          handleChange={(e) => handleInput(e, 'href')}
          value={linkProps.href}
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
}

PostsLinksEditModal.defaultProps = {
  link: null,
}


export default PostsLinksEditModal
