import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import useIsMounted from '@/hooks/useIsMounted'
import useControlsStore from '@/app/stores/controlsStore'
import useCreateEditLinkBankLink from '@/app/hooks/useCreateEditLinkBankLink'
import PostCardEditAlert from '@/app/PostCardEditAlert'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { splitLinks, defaultPostLinkId, getLinkById } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  artistId: state.artistId,
  defaultLink: state.defaultLink,
  nestedLinks: state.nestedLinks,
  conversionsPreferences: state.conversionsPreferences,
})

const PostLinksSelect = ({
  currentLinkId,
  linkType,
  selectClassName,
  onSelect,
  onSuccess,
  onError,
  onAddNewLink,
  postItemId,
  includeDefaultLink,
  includeAddLinkOption,
  includeIntegrationLinks,
  includeLooseLinks,
  hasSalesObjective,
  componentLocation,
  updateParentLink,
  shouldSaveOnChange,
  shouldShowAddLinkModal,
  label,
  className,
  disabled,
  isPostActive,
  campaignType,
}) => {
  // READ FROM LINKS STORE
  const {
    artistId,
    defaultLink,
    nestedLinks,
    conversionsPreferences,
  } = useControlsStore(getControlsStoreState, shallow)
  const { defaultLinkId: defaultConversionsLinkId } = conversionsPreferences
  const [showAlert, setShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [isDeletedLink, setIsDeletedLink] = React.useState(false)
  const isMounted = useIsMounted()

  // PLACEHOLDER TEXT (if no default link)
  const placeholderText = componentLocation === 'post' ? 'No default link set' : 'Select a default link'

  // STORE INTERNAL LINK
  const [selectedOptionValue, setSelectedOptionValue] = React.useState(currentLinkId)

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
    if (includeLooseLinks) {
      const looseLinkOptions = looseLinks.map(({ name, id }) => {
        return { name, value: id }
      })
      if (looseLinkOptions.length) {
        baseOptions.unshift(...looseLinkOptions)
      }
    }
    // Add 'Deleted from link bank' select option if a post is an adcreative and the link id doesn't exist in the linkbank anymore
    if (linkType === 'adcreative') {
      const linkBankIds = nestedLinks.reduce((result, { links }) => {
        const activeLinks = links.filter(link => link.href)
        activeLinks.forEach(activeLink => {
          result[activeLink.id] = true
        })
        return result
      }, {})

      if (!linkBankIds[currentLinkId]) {
        setIsDeletedLink(true)
        const option = { name: 'Deleted from link bank', value: currentLinkId }
        baseOptions.push(option)
      }
    }
    // Add INTEGRATIONS as group
    if (includeIntegrationLinks) {
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
    }
    // If no DEFAULT or no NEW LINK, stop here
    if (!includeDefaultLink && !includeAddLinkOption) {
      setLoading(false)
      return baseOptions
    }
    // Start other options group
    const otherOptionsGroup = {
      type: 'group',
      name: 'Other options',
      value: '_otherOptions',
      options: [],
    }
    // Add DEFAULT link if needed
    if (includeDefaultLink && defaultLink.name) {
      let { name } = defaultLink
      if (campaignType === 'conversions' && defaultConversionsLinkId && defaultConversionsLinkId !== '_default') {
        name = getLinkById(nestedLinks, defaultConversionsLinkId)?.name
      }
      // const defaultLinkOption
      otherOptionsGroup.options.push({ name: `Use Default Link (${name})`, value: defaultPostLinkId })
    }
    // Add NEW LINK option
    if (includeAddLinkOption) {
      otherOptionsGroup.options.push({ name: '+ Add new link', value: '_new' })
    }
    // Add other options
    baseOptions.push(otherOptionsGroup)
    setLoading(false)
    return baseOptions
  }, [nestedLinks, includeDefaultLink, defaultLink, includeAddLinkOption, includeIntegrationLinks, includeLooseLinks, currentLinkId, linkType, campaignType, defaultConversionsLinkId])

  // HANDLE SETTING SELECTED LINK
  const updatePostLink = React.useCallback(async (selectedOptionValue, forceRun = false) => {
    if (loading && !forceRun) return
    setLoading(true)

    if (isPostActive && !forceRun) {
      // Set function to run when confirming alert
      setOnAlertConfirm(() => () => updatePostLink(selectedOptionValue, true))
      // Show alert
      setShowAlert(true)
      return
    }
    // Skip API request and only update parent link value
    if (!shouldSaveOnChange) {
      updateParentLink(selectedOptionValue)
      setLoading(true)
      return
    }
    // Run server
    const { res: postLink, error } = await onSelect({
      artistId,
      linkId: selectedOptionValue,
      hasSalesObjective,
      assetId: postItemId,
      campaignType,
    })
    if (!isMounted) return
    // Handle error
    setShowAlert(false)
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
    onSuccess(postLink)
    setError(null)
    setLoading(false)
    // Reset deleted link state
    setIsDeletedLink(false)
  }, [artistId, currentLinkId, loading, isMounted, isPostActive, onError, onSelect, onSuccess, postItemId, shouldSaveOnChange, updateParentLink, campaignType, hasSalesObjective])

  // SHOW ADD LINK MODAL
  const showAddLinkModal = useCreateEditLinkBankLink({
    action: 'add',
    location: componentLocation,
    // Set link as post link when added
    onSave: (savedLink, newArtist) => {
      if (componentLocation === 'defaultLink' && newArtist) {
        onSuccess(newArtist)
      }
      const { id: linkId } = savedLink
      setSelectedOptionValue(linkId)
      updatePostLink(linkId)
      setLoading(false)
    },
    onCancel: () => setLoading(false),
  })

  const handleChange = (e) => {
    const { target: { value } } = e
    // Do nothing if value is current value
    if (value === currentLinkId) return
    // Handle adding new link
    if (value === '_new') {
      setLoading(true)
      if (shouldShowAddLinkModal) {
        showAddLinkModal()
        return
      }
      onAddNewLink()
      return
    }
    setSelectedOptionValue(value)
    updatePostLink(value)
  }

  React.useEffect(() => {
    setSelectedOptionValue(currentLinkId)
  }, [currentLinkId])

  return (
    <div className={className}>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={loading}
        className={[
          selectClassName,
          isDeletedLink ? 'text-red' : '',
        ].join(' ')}
        handleChange={handleChange}
        name="Choose link"
        label={label}
        options={selectOptions}
        placeholder={currentLinkId === defaultPostLinkId ? placeholderText : null}
        selectedValue={selectedOptionValue}
        version="box"
        disabled={disabled}
      />
      {/* ALERT */}
      {showAlert && (
        <PostCardEditAlert
          type="link"
          postId={postItemId}
          show={showAlert}
          newValue={selectedOptionValue}
          originalValue={currentLinkId}
          onAlertConfirm={onAlertConfirm}
          onCancel={() => {
            setLoading(false)
            setShowAlert(false)
            setSelectedOptionValue(currentLinkId)
          }}
        />
      )}
    </div>
  )
}

PostLinksSelect.propTypes = {
  currentLinkId: PropTypes.string,
  linkType: PropTypes.string,
  selectClassName: PropTypes.string,
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onAddNewLink: PropTypes.func,
  postItemId: PropTypes.string,
  includeDefaultLink: PropTypes.bool,
  includeIntegrationLinks: PropTypes.bool,
  includeLooseLinks: PropTypes.bool,
  includeAddLinkOption: PropTypes.bool,
  hasSalesObjective: PropTypes.bool,
  componentLocation: PropTypes.string.isRequired,
  updateParentLink: PropTypes.func,
  shouldSaveOnChange: PropTypes.bool,
  shouldShowAddLinkModal: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isPostActive: PropTypes.bool,
  campaignType: PropTypes.string,
}

PostLinksSelect.defaultProps = {
  currentLinkId: defaultPostLinkId,
  onSelect: () => {},
  linkType: '',
  onSuccess: () => {},
  onError: null,
  onAddNewLink: () => {},
  postItemId: '',
  selectClassName: null,
  includeDefaultLink: false,
  includeIntegrationLinks: true,
  includeLooseLinks: true,
  includeAddLinkOption: false,
  hasSalesObjective: false,
  updateParentLink: () => {},
  shouldSaveOnChange: true,
  shouldShowAddLinkModal: true,
  label: '',
  className: '',
  disabled: false,
  isPostActive: false,
  campaignType: '',
}

export default PostLinksSelect
