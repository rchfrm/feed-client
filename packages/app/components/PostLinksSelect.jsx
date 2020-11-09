import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import linksStore from '@/app/store/linksStore'

import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { splitLinks, defaultPostLinkId } from '@/app/helpers/linksHelpers'

const PostLinksSelect = ({
  currentLinkId,
  selectClassName,
  onSelect,
  onSuccess,
  onError,
  postItemId,
  includeDefaultLink,
  includeAddLinkOption,
  componentLocation,
}) => {
  const artistId = linksStore(state => state.artistId)
  const nestedLinks = linksStore(state => state.nestedLinks)
  const defaultLink = linksStore(state => state.defaultLink) || {}
  const integrations = linksStore(state => state.integrations)

  // STORE INTERNAL LINK
  const [selectedOptionValue, setSelectedOptionValue] = React.useState(currentLinkId)
  React.useEffect(() => {
    if (currentLinkId === selectedOptionValue) return
    setSelectedOptionValue(currentLinkId)
  // eslint-disable-next-line
  }, [currentLinkId])

  // CONVERT LINK OPTIONS TO FIT SELECT COMPONENT
  const selectOptions = React.useMemo(() => {
    const { looseLinks = [], folderLinks = [] } = splitLinks(nestedLinks)
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
        return { name: `${title} account`, value: `_integration_${platform}` }
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
      otherOptionsGroup.options.push({ name: `Use Default Link (${name})`, value: defaultPostLinkId })
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
    location: componentLocation,
  })

  // HANDLE SETTING SELECTED LINK
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  useAsyncEffect(async (isMounted) => {
    // Stop here if setting to same as before
    if (currentLinkId === selectedOptionValue) {
      setLoading(false)
      return
    }
    setLoading(true)
    // Run server
    const { res, error } = await onSelect(artistId, selectedOptionValue, postItemId)
    if (!isMounted()) return
    // Handle error
    if (error) {
      // Reset value if error
      setSelectedOptionValue(currentLinkId)
      if (onError) {
        onError(error)
      } else {
        setError(error)
      }
      return
    }
    // Success
    onSuccess(res)
    setError(null)
    setLoading(false)
  }, [selectedOptionValue])

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={loading}
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
  currentLinkId: PropTypes.string,
  selectClassName: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  postItemId: PropTypes.string,
  includeDefaultLink: PropTypes.bool,
  includeAddLinkOption: PropTypes.bool,
  componentLocation: PropTypes.string.isRequired,
}

PostLinksSelect.defaultProps = {
  currentLinkId: defaultPostLinkId,
  onSuccess: () => {},
  onError: null,
  postItemId: '',
  selectClassName: null,
  includeDefaultLink: false,
  includeAddLinkOption: false,
}


export default PostLinksSelect
