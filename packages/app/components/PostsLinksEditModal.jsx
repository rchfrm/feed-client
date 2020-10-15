import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import usePostsStore from '@/app/hooks/usePostsStore'

import Input from '@/elements/Input'
import Select from '@/elements/Select'

const PostsLinksEditModal = ({ link }) => {
  const [linkProps, setLinkProps] = React.useState(link || {})
  console.log('linkProps', linkProps)
  const handleInput = React.useCallback((e, prop) => {
    const newLinkProps = produce(linkProps, draftProps => {
      draftProps[prop] = e.target.value
    })
    setLinkProps(newLinkProps)
  }, [linkProps])
  // Get array of folders
  const { folders } = usePostsStore()
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
        <Select
          handleChange={(e) => handleInput(e, 'folder')}
          name="link-folder"
          label="Folder"
          placeholder="Select folder"
          selectedValue={linkProps.folder}
          options={folders}
        />
        <p>
          <a
            role="button"
            className="no-underline -hover--green"
          >
            <strong>+ Add Folder</strong>
          </a>
        </p>
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
