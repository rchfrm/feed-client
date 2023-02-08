import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'
import useControlsStore from '@/app/stores/controlsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import LinksSelect from '@/app/LinksSelect'
import CheckboxInput from '@/elements/CheckboxInput'
import { getPostLinks } from '@/app/helpers/postsHelpers'

const getControlsStoreState = (state) => ({
  defaultLink: state.defaultLink,
})

const PostLinkCheckBoxSelect = ({
  post,
  campaignType,
  currentLink,
  setCurrentLink,
  isDefaultLink,
  setIsDefaultLink,
  setSavedLink,
  links,
  setLinks,
  updatePost,
  isDisabled,
  className,
}) => {
  const { id: postId } = post || {}
  const { defaultLink } = useControlsStore(getControlsStoreState)
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (! post || post?.links) {
      return
    }

    const { res: links, error } = await getPostLinks(artistId, postId)
    if (! isMounted) {
      return
    }

    if (error || ! links.length) {
      return
    }

    setLinks(links)
    updatePost({
      type: 'update-links',
      payload: {
        postId,
        links,
      },
    })
  }, [])

  const updateLink = (linkId) => {
    setCurrentLink({
      ...currentLink,
      linkId,
    })
  }

  const handleChange = () => {
    setIsDefaultLink(! isDefaultLink)
  }

  React.useEffect(() => {
    if (! links) {
      return
    }

    const postLink = links?.find((link) => link.campaignType === campaignType)
    const link = postLink || { linkId: defaultLink.id } || {}

    setCurrentLink(link)
    setSavedLink(link)

    if (link.linkId && link?.linkId !== defaultLink.id) {
      setIsDefaultLink(false)
    }
  }, [campaignType, links, defaultLink?.id, defaultLink, setCurrentLink, setSavedLink, setIsDefaultLink])

  return (
    <div className={className}>
      <CheckboxInput
        buttonLabel={`Use default (${defaultLink.href})`}
        value="link"
        checked={isDefaultLink}
        onChange={handleChange}
        disabled={isDisabled}
        className="break-all"
      />
      {! isDefaultLink && (
        <LinksSelect
          currentLinkId={currentLink.linkId}
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
  links: PropTypes.array,
  setLinks: PropTypes.func,
  updatePost: PropTypes.func,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

PostLinkCheckBoxSelect.defaultProps = {
  post: null,
  campaignType: '',
  setSavedLink: () => {},
  links: [],
  setLinks: () => {},
  updatePost: () => {},
  isDisabled: false,
  className: null,
}

export default PostLinkCheckBoxSelect
