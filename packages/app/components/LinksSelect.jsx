import React from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'
import useIsMounted from '@/hooks/useIsMounted'
import useControlsStore from '@/app/stores/controlsStore'
import useCreateEditLinkBankLink from '@/app/hooks/useCreateEditLinkBankLink'
import Select from '@/elements/Select'
import Error from '@/elements/Error'
import { splitLinks, defaultPostLinkId, getLinkById } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  artistId: state.artistId,
  defaultLink: state.defaultLink,
  nestedLinks: state.nestedLinks,
  conversionsPreferences: state.conversionsPreferences,
})

const LinksSelect = ({
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
  campaignType,
}) => {
  const {
    artistId,
    defaultLink,
    nestedLinks,
    conversionsPreferences,
  } = useControlsStore(getControlsStoreState, shallow)

  const { defaultLinkId: defaultConversionsLinkId } = conversionsPreferences
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [isDeletedLink, setIsDeletedLink] = React.useState(false)
  const isMounted = useIsMounted()

  const placeholderText = componentLocation === 'post' ? 'No default link set' : 'Select a default link'
  const [selectedOptionValue, setSelectedOptionValue] = React.useState(currentLinkId)

  const selectOptions = React.useMemo(() => {
    const { looseLinks = [], linkFolders = [], integrationLinks = [] } = splitLinks(nestedLinks)

    const baseOptions = linkFolders.reduce((options, { links, name, id }) => {
      if (! links.length) {
        return options
      }

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

    if (includeLooseLinks) {
      const looseLinkOptions = looseLinks.map(({ name, id }) => {
        return { name, value: id }
      })

      if (looseLinkOptions.length) {
        baseOptions.unshift(...looseLinkOptions)
      }
    }

    if (linkType === 'adcreative') {
      const linkBankIds = nestedLinks.reduce((result, { links }) => {
        const activeLinks = links.filter((link) => link.href)

        activeLinks.forEach((activeLink) => {
          result[activeLink.id] = true
        })

        return result
      }, {})

      if (! linkBankIds[currentLinkId]) {
        setIsDeletedLink(true)

        const option = { name: 'Deleted from link bank', value: currentLinkId }
        baseOptions.push(option)
      }
    }

    if (includeIntegrationLinks) {
      const integrationsGroup = {
        type: 'group',
        name: 'Integrations',
        value: '_integrations',
        options: integrationLinks.reduce((arr, { href, titleVerbose, id }) => {
          if (! href) {
            return arr
          }

          const option = { name: titleVerbose, value: id }
          return [...arr, option]
        }, []),
      }
      baseOptions.push(integrationsGroup)
    }

    if (! includeDefaultLink && ! includeAddLinkOption) {
      setLoading(false)
      return baseOptions
    }

    const otherOptionsGroup = {
      type: 'group',
      name: 'Other options',
      value: '_otherOptions',
      options: [],
    }

    if (includeDefaultLink && defaultLink.name) {
      let { name } = defaultLink

      if (campaignType === 'conversions' && defaultConversionsLinkId && defaultConversionsLinkId !== '_default') {
        name = getLinkById(nestedLinks, defaultConversionsLinkId)?.name
      }

      otherOptionsGroup.options.push({ name: `Use Default Link (${name})`, value: defaultPostLinkId })
    }

    if (includeAddLinkOption) {
      otherOptionsGroup.options.push({ name: '+ Add new link', value: '_new' })
    }

    baseOptions.push(otherOptionsGroup)
    setLoading(false)
    return baseOptions
  }, [nestedLinks, includeDefaultLink, defaultLink, includeAddLinkOption, includeIntegrationLinks, includeLooseLinks, currentLinkId, linkType, campaignType, defaultConversionsLinkId])


  const updatePostLink = React.useCallback(async (selectedOptionValue) => {
    if (loading) {
      return
    }

    setLoading(true)

    if (! shouldSaveOnChange) {
      updateParentLink(selectedOptionValue)
      setLoading(false)
      return
    }

    const { res: postLink, error } = await onSelect({
      artistId,
      linkId: selectedOptionValue,
      hasSalesObjective,
      assetId: postItemId,
      campaignType,
    })
    if (! isMounted) {
      return
    }

    if (error) {
      setSelectedOptionValue(currentLinkId)

      if (onError) {
        onError(error)
      } else {
        setError(error)
      }
      return
    }

    onSuccess(postLink)
    setError(null)
    setLoading(false)
    setIsDeletedLink(false)
  }, [artistId, currentLinkId, loading, isMounted, onError, onSelect, onSuccess, postItemId, shouldSaveOnChange, updateParentLink, campaignType, hasSalesObjective])


  const showAddLinkModal = useCreateEditLinkBankLink({
    action: 'add',
    location: componentLocation,
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

    if (value === currentLinkId) {
      return
    }

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

  const onCancel = React.useCallback(() => {
    setLoading(false)
    setShowAlert(false)
    setSelectedOptionValue(currentLinkId)
  }, [currentLinkId])

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
        handleChange={handleChange}
        name="Choose link"
        label={label}
        options={selectOptions}
        placeholder={currentLinkId === defaultPostLinkId ? placeholderText : null}
        selectedValue={selectedOptionValue}
        version="box"
        disabled={disabled}
        className={[
          selectClassName,
          isDeletedLink ? 'text-red' : '',
        ].join(' ')}
      />
    </div>
  )
}

LinksSelect.propTypes = {
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
  campaignType: PropTypes.string,
}

LinksSelect.defaultProps = {
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
  campaignType: '',
}

export default LinksSelect
