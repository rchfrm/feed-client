import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import Input from '@/elements/Input'
import Select from '@/elements/Select'

const PostsLinksEditModal = ({ link }) => {
  const [linkProps, setLinkProps] = React.useState(link || {})
  const handleInput = React.useCallback((e, prop) => {
    const newLinkProps = produce(linkProps, draftProps => {
      draftProps[prop] = e.target.value
    })
    setLinkProps(newLinkProps)
  }, [linkProps])
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
        {/* <Select
          handleChange={handleSelect}
          name="patchArtist"
          label="Patch what?"
          selectedValue={linkProps.folder}
          options={patchOptions}
        /> */}
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
