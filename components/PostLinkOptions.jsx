// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PostLinkSaveButton from './PostLinkSaveButton'
import Select from './elements/Select'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import styles from './PostsPage.module.css'


const getLinkName = (linkType) => {
  if (linkType === 'spotify_url') return 'spotify'
  if (linkType === 'website_url') return 'website'
  if (linkType === 'instagram_url') return 'instagram'
  if (linkType === 'bandcamp_url') return 'bandcamp'
  if (linkType === 'facebook_page_url') return 'facebook'
  if (linkType === 'youtube_url') return 'youtube'
  if (linkType === 'twitter_url') return 'twitter'
  if (linkType === 'soundcloud_url') return 'soundcloud'
  if (linkType === 'apple_url') return 'apple'
}


function PostLinkOptions({
  setError,
  currentLink,
  setCurrentLink,
  chosenLink,
  setChosenLink,
  index,
  postId,
  setAddUrl,
  updateLink,
}) {
  // IMPORT CONTEXTS
  const { artist } = React.useContext(ArtistContext)
  // DEFINE STATES
  const [button, setButton] = React.useState('save')

  // Disable the save button if the selected link is the same as the one already set,
  // or it's set to default or add-url, or it the button state is not 'save'
  const disabled = (
    chosenLink === currentLink
      || chosenLink === 'add-url'
      || button !== 'save'
  )


  const links = Object.entries(artist.URLs).reduce((allLinks, [linkType, linkValue]) => {
    if (!linkValue) return allLinks
    const linkName = getLinkName(linkType)
    const link = { name: linkName, value: linkName }
    return [...allLinks, link]
  }, [])

  // Include add new link option
  const addNewLink = {
    name: '+ Add another link',
    value: 'add-url',
  }
  links.push(addNewLink)

  // Handle changes in the drop down
  const handleChange = e => {
    setError(null)
    if (e.target.value === 'add-url') {
      setAddUrl(true)
    } else {
      setAddUrl(false)
    }
    setChosenLink(e.target.value)
    setButton('save')
  }

  // Handle clicks on the save button
  const handleClick = async e => {
    e.preventDefault()
    setButton('saving')
    try {
      // Send a patch request to the server to update the asset
      const updatedAsset = await server.updateAssetLink(artist.id, postId, chosenLink)
      // Update state in the Loader component with the new link
      updateLink(index, updatedAsset.priority_dsp)
      // Update the current link to match
      setCurrentLink(updatedAsset.priority_dsp)
      // Mark the button as 'saved'
      setButton('saved')
    } catch (err) {
      setChosenLink(currentLink)
      setError(err)
      setButton('save')
    }
  }

  const checkLink = (platform) => {
    const priorityDSP = helper.convertPlatformToPriorityDSP(platform)
    return (
      <a
        className={styles.a}
        href={artist[priorityDSP]}
        target="_blank"
        rel="noopener noreferrer"
      >
        Preview link
      </a>
    )
  }

  return (
    <div>

      <div className={styles.linkSelection}>

        <Select
          className={styles.linkSelection__select}
          handleChange={handleChange}
          name="Choose link"
          options={links}
          selectedValue={chosenLink}
          version="box"
        />

        <PostLinkSaveButton state={button} handleClick={handleClick} disabled={disabled} />

      </div>

      <p className="no-margin">{checkLink(chosenLink)}</p>

    </div>
  )
}

export default PostLinkOptions
