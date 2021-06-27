import React from 'react'
import PropTypes from 'prop-types'

import shallow from 'zustand/shallow'

import useIsMounted from '@/hooks/useIsMounted'
import useLinksStore from '@/app/stores/linksStore'
import useCreateEditPostsLink from '@/app/hooks/useCreateEditPostsLink'
import PostCardEditAlert from '@/app/PostCardEditAlert'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { splitLinks, defaultPostLinkId } from '@/app/helpers/linksHelpers'

const getLinksStoreState = (state) => ({
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
  isPostActive,
  isPostArchived,
}) => {
  // READ FROM LINKS STORE
  const {
    artistId,
    defaultLink,
    nestedLinks,
  } = useLinksStore(getLinksStoreState, shallow)
  const [showAlert, setShowAlert] = React.useState(false)
  const [onAlertConfirm, setOnAlertConfirm] = React.useState(() => () => {})
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [postLinkId, setPostLinkId] = React.useState(currentLinkId)
  const isMounted = useIsMounted()

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
    // Add 'Deleted from link bank' select option if a post is active or achived and the link id doesn't exist in the linkbank anymore
    if (isPostActive || isPostArchived) {
      const activeIntegrationLinks = integrationLinks.filter(link => link.href)
      const linkBankIds = [...looseLinks, ...activeIntegrationLinks].map((link) => link.id)
      if (!linkBankIds.includes(postLinkId)) {
        const option = { name: 'Deleted from link bank', value: postLinkId }
        baseOptions.push(option)
      }
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
  }, [nestedLinks, includeDefaultLink, defaultLink, includeAddLinkOption, postLinkId, isPostActive, isPostArchived])

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
    // Run server
    const { res: postLink, error } = await onSelect(artistId, selectedOptionValue, postItemId)
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
    setPostLinkId(postLink.linkId)
    onSuccess(postLink)
    setError(null)
    setLoading(false)
  }, [artistId, currentLinkId, loading, isMounted, isPostActive, onError, onSelect, onSuccess, postItemId])

  const handleChange = (e) => {
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
    updatePostLink(value)
  }

  return (
    <div>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={loading}
        className={selectClassName}
        handleChange={handleChange}
        name="Choose link"
        options={selectOptions}
        placeholder={currentLinkId === defaultPostLinkId ? placeholderText : null}
        selectedValue={selectedOptionValue}
        version="box"
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
  selectClassName: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  postItemId: PropTypes.string,
  includeDefaultLink: PropTypes.bool,
  includeAddLinkOption: PropTypes.bool,
  componentLocation: PropTypes.string.isRequired,
  isPostActive: PropTypes.bool.isRequired,
  isPostArchived: PropTypes.bool.isRequired,
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
