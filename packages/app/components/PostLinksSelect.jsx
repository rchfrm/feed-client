import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'

import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'

import postsStore from '@/store/postsStore'

const PostLinksSelect = ({
  currentLinkId,
  selectClassName,
  onSelect,
  includeDefaultLink,
  includeAddLinkOption,
}) => {
  const linkOptions = postsStore(state => state.nestedLinks)
  const defaultLink = postsStore(state => state.defaultLink)
  const integrations = postsStore(state => state.integrations)

  // CONVERT LINK OPTIONS TO FIT SELECT COMPONENT
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
    // TODO waiting for integrations to be merged
    // Add INTEGRATIONS as group
    const integrationsGroup = {
      type: 'group',
      name: 'Integrations',
      value: '_integrations',
      options: [],
    }
    baseOptions.push(integrationsGroup)
    // If no DEFAULT or no NEW LINK, stop here
    if (!includeDefaultLink && !includeAddLinkOption) return baseOptions
    // Start other options group
    const otherOptionsGroup = {
      type: 'group',
      name: 'Other options',
      value: '_otherOptions',
      options: [],
    }
    // Add DEFAULT link if needed
    if (includeDefaultLink) {
      const { name } = defaultLink
      otherOptionsGroup.options.push({ name: `Use Default Link (${name})`, value: '_default' })
    }
    // Add NEW LINK option
    if (includeAddLinkOption) {
      otherOptionsGroup.options.push({ name: '+ Add new link', value: '_new' })
    }
    // Add other options
    baseOptions.push(otherOptionsGroup)
    return baseOptions
  }, [linkOptions, includeDefaultLink, defaultLink, includeAddLinkOption])

  // SHOW ADD LINK MODAL
  const showAddLinkModal = useCreateEditPostsLink({
    action: 'add',
    location: 'post',
  })

  return (
    <div>
      <Select
        className={selectClassName}
        handleChange={(e) => {
          const { target: { value } } = e
          // Do nothing if value is current value
          if (value === currentLinkId) return
          // Handle adding new link
          if (value === '_new') {
            showAddLinkModal()
            return
          }
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
  includeAddLinkOption: PropTypes.bool,
}

PostLinksSelect.defaultProps = {
  selectClassName: null,
  includeDefaultLink: false,
  includeAddLinkOption: false,
}


export default PostLinksSelect
