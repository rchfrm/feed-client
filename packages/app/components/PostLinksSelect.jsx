import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'

import postsStore from '@/store/postsStore'

const PostLinksSelect = ({
  currentLinkId,
  selectClassName,
  onSelect,
  includeDefaultLink,
}) => {
  const linkOptions = postsStore(state => state.nestedLinks)
  const defaultLink = postsStore(state => state.defaultLink)
  // CONVERT LINK OPTIONS TO FIT SELECT
  const selectOptions = React.useMemo(() => {
    const baseOptions = linkOptions.reduce((options, { type, links, name, id }) => {
      // Add folder as option group
      if (type === 'folder') {
        const groupLinks = links.map(({ name, id }) => {
          return { name, value: id }
        })
        const optionGroup = {
          type: 'group',
          name,
          value: id,
          options: groupLinks,
        }
        return [...options, optionGroup]
      }
      // Add link as option
      const option = { name, value: id }
      return [...options, option]
    }, [])
    // Add default link if needed
    if (includeDefaultLink) {
      const { name, id } = defaultLink
      baseOptions.push({ name: `Default Link (${name})`, value: '_default' })
    }
    return baseOptions
  }, [linkOptions, includeDefaultLink, defaultLink])
  return (
    <div>
      <Select
        className={selectClassName}
        handleChange={(e) => {
          const { target: { value } } = e
          // Do nothing if value is current value
          if (value === currentLinkId) return
          onSelect(value)
        }}
        name="Choose link"
        options={selectOptions}
        selectedValue={currentLinkId}
        version="box"
      />
    </div>
  )
}

PostLinksSelect.propTypes = {
  currentLinkId: PropTypes.string.isRequired,
  selectClassName: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  includeDefaultLink: PropTypes.bool,
}

PostLinksSelect.defaultProps = {
  selectClassName: null,
  includeDefaultLink: false,
}


export default PostLinksSelect
