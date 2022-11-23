import React from 'react'
import PropTypes from 'prop-types'
import useControlsStore from '@/app/stores/controlsStore'
import PostLinksSelect from '@/app/PostLinksSelect'
import CheckboxInput from '@/elements/CheckboxInput'
import { getLinkById } from '@/app/helpers/linksHelpers'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
  nestedLinks: state.nestedLinks,
})

const PostLinkCheckBoxSelect = ({
  post,
  campaignType,
  currentLink,
  setCurrentLink,
  isDefaultLink,
  setIsDefaultLink,
  setSavedLink,
  isDisabled,
  className,
}) => {
  const { linkSpecs } = post || {}
  const { defaultLink, nestedLinks } = useControlsStore(getControlsStoreState)

  const updateLink = (linkId) => {
    setCurrentLink(getLinkById(nestedLinks, linkId))
  }

  const handleChange = () => {
    setIsDefaultLink(!isDefaultLink)
  }

  React.useEffect(() => {
    const { linkId, linkHref } = linkSpecs?.[campaignType] || {}

    const link = {
      id: linkId || defaultLink.id,
      href: linkHref || defaultLink.href,
    }

    setCurrentLink(link)
    setSavedLink(link)

    if (linkId && linkId !== defaultLink.id) {
      setIsDefaultLink(false)
    }
  }, [campaignType, linkSpecs, defaultLink?.id, defaultLink?.href, setCurrentLink, setSavedLink, setIsDefaultLink])

  return (
    <div className={className}>
      <CheckboxInput
        buttonLabel={`Use default (${defaultLink.href})`}
        value="link"
        checked={isDefaultLink}
        onChange={handleChange}
        disabled={isDisabled}
      />
      {!isDefaultLink && (
        <PostLinksSelect
          currentLinkId={currentLink.id}
          updateParentLink={updateLink}
          shouldSaveOnChange={false}
          componentLocation="post"
          campaignType={campaignType}
          includeAddLinkOption
          disabled={isDisabled}
        />
      )}
    </div>
  )
}

PostLinkCheckBoxSelect.propTypes = {
  post: PropTypes.object,
  campaignType: PropTypes.string,
  isDefaultLink: PropTypes.bool.isRequired,
  setIsDefaultLink: PropTypes.func.isRequired,
  currentLink: PropTypes.object.isRequired,
  setCurrentLink: PropTypes.func.isRequired,
  setSavedLink: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

PostLinkCheckBoxSelect.defaultProps = {
  post: null,
  campaignType: '',
  setSavedLink: () => {},
  isDisabled: false,
  className: null,
}

export default PostLinkCheckBoxSelect
