import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'
import useAsyncEffect from 'use-async-effect'

import useIsMounted from '@/hooks/useIsMounted'
import useControlsStore from '@/app/stores/controlsStore'
import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { splitLinks, defaultPostLinkId } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  artistId: state.artistId,
  defaultLink: state.defaultLink,
  nestedLinks: state.nestedLinks,
})

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
  updateParentLink,
  shouldSaveOnChange,
  label,
}) => {
  // READ FROM LINKS STORE
  const {
    artistId,
    defaultLink,
    nestedLinks,
  } = useControlsStore(getControlsStoreState, shallow)

  // PLACEHOLDER TEXT (if no default link)
  const placeholderText = componentLocation === 'post' ? 'No default link set' : 'Select a default link'

  // STORE INTERNAL LINK
  const [selectedOptionValue, setSelectedOptionValue] = React.useState(currentLinkId)
  React.useEffect(() => {
    if (currentLinkId === selectedOptionValue) return
    setSelectedOptionValue(currentLinkId)
  // eslint-disable-next-line
  }, [currentLinkId])

  // CONVERT LINK OPTIONS TO FIT SELECT COMPONENT
  const selectOptions = React.useMemo(() => {
    const { looseLinks = [], linkFolders = [], integrationLinks = [] } = splitLinks(nestedLinks)
    // Add FOLDERS as option group
    const baseOptions = linkFolders.reduce((options, { links, name, id }) => {
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
      options: integrationLinks.reduce((arr, { href, titleVerbose, id }) => {
        if (!href) return arr
        const option = { name: titleVerbose, value: id }
        return [...arr, option]
      }, []),
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
    if (includeDefaultLink && defaultLink.name) {
      const { name } = defaultLink
      // const defaultLinkOption
      otherOptionsGroup.options.push({ name: `Use Default Link (${name})`, value: defaultPostLinkId })
    }
    // Add NEW LINK option
    if (includeAddLinkOption) {
      otherOptionsGroup.options.push({ name: '+ Add new link', value: '_new' })
    }
    // Add other options
    baseOptions.push(otherOptionsGroup)
    return baseOptions
  }, [nestedLinks, includeDefaultLink, defaultLink, includeAddLinkOption])

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  // SHOW ADD LINK MODAL
  const showAddLinkModal = useCreateEditPostsLink({
    action: 'add',
    location: componentLocation,
    // Set link as post link when added
    onSave: (savedLink, newArtist) => {
      if (componentLocation === 'defaultLink' && newArtist) {
        onSuccess(newArtist)
      }
      const { id: linkId } = savedLink
      setSelectedOptionValue(linkId)
      setLoading(false)
    },
    onCancel: () => setLoading(false),
  })

  // HANDLE SETTING SELECTED LINK
  const isMounted = useIsMounted()
  useAsyncEffect(async () => {
    // Stop here if setting to same as before
    if (currentLinkId === selectedOptionValue) {
      setLoading(false)
      return
    }
    // Skip API request and only update parent link value
    if (!shouldSaveOnChange) {
      updateParentLink(selectedOptionValue)
      return
    }
    setLoading(true)
    // Run server
    const { res, error } = await onSelect(artistId, selectedOptionValue, postItemId)
    if (!isMounted) return
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
    setError(null)
    setLoading(false)
    onSuccess(res)
  }, [selectedOptionValue])

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <label
        className="inputLabel"
        htmlFor="Choose link"
      >
        {label && (
          <span className="inputLabel__text">
            <span>
              {label}
            </span>
          </span>
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
              setLoading(true)
              showAddLinkModal()
              return
            }
            setSelectedOptionValue(value)
          }}
          name="Choose link"
          options={selectOptions}
          placeholder={currentLinkId === defaultPostLinkId ? placeholderText : null}
          selectedValue={selectedOptionValue}
          version="box"
        />
      </label>
    </div>
  )
}

PostLinksSelect.propTypes = {
  currentLinkId: PropTypes.string,
  selectClassName: PropTypes.string,
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  postItemId: PropTypes.string,
  includeDefaultLink: PropTypes.bool,
  includeAddLinkOption: PropTypes.bool,
  componentLocation: PropTypes.string.isRequired,
  updateParentLink: PropTypes.func,
  shouldSaveOnChange: PropTypes.bool,
  label: PropTypes.string,
}

PostLinksSelect.defaultProps = {
  currentLinkId: defaultPostLinkId,
  onSelect: () => {},
  onSuccess: () => {},
  onError: null,
  postItemId: '',
  selectClassName: null,
  includeDefaultLink: false,
  includeAddLinkOption: false,
  updateParentLink: () => {},
  shouldSaveOnChange: true,
  label: '',
}


export default PostLinksSelect
