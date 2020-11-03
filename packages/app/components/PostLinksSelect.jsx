import React from 'react'
import PropTypes from 'prop-types'

import linksStore from '@/app/store/linksStore'

import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'

import Select from '@/elements/Select'

import { splitLinks } from '@/app/helpers/linksHelpers'

const PostLinksSelect = ({
  currentLinkId,
  selectClassName,
  onSelect,
  includeDefaultLink,
  includeAddLinkOption,
}) => {
  const nestedLinks = linksStore(state => state.nestedLinks)
  const defaultLink = linksStore(state => state.defaultLink)
  const integrations = linksStore(state => state.integrations)

  // STORE INTERNAL LINK
  const [selectedOptionValue, setSelectedOptionValue] = React.useState(currentLinkId)
  React.useEffect(() => {
    setSelectedOptionValue(currentLinkId)
  }, [currentLinkId])

  // CONVERT LINK OPTIONS TO FIT SELECT COMPONENT
  const selectOptions = React.useMemo(() => {
    const { looseLinks, folderLinks } = splitLinks(nestedLinks)
    // Add FOLDERS as option group
    const baseOptions = folderLinks.reduce((options, { links, name, id }) => {
      // Don't show empty folders
      if (!links.length) return options
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
    }, [])
    // Add LOOSE links
    const looseLinkOptions = looseLinks.map(({ name, id }) => {
      return { name, value: id }
    })
    if (looseLinkOptions.length) {
      baseOptions.unshift(...looseLinkOptions)
    }
    // Add INTEGRATIONS as group
    const integrationsGroup = {
      type: 'group',
      name: 'Integrations',
      value: '_integrations',
      options: integrations.map(({ title, platform }) => {
        return { name: title, value: `_integration_${platform}` }
      }),
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
  }, [nestedLinks, includeDefaultLink, defaultLink, includeAddLinkOption, integrations])

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
          setSelectedOptionValue(value)
        }}
        name="Choose link"
        options={selectOptions}
        selectedValue={selectedOptionValue}
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
