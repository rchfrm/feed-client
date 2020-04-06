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
  const [buttonState, setButtonState] = React.useState('save')
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

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
  const handleChange = (e) => {
    const chosenLink = e.target.value
    setError(null)
    // Update button state
    setButtonState('save')
    // Update chosen link
    setChosenLink(chosenLink)
    // Update disabled state
    const disabled = !!(chosenLink === currentLink)
    setButtonDisabled(disabled)
    // Toggle choose link dialogue
    const showChooseLink = !!(chosenLink === 'add-url')
    setAddUrl(showChooseLink)
  }

  // Handle clicks on the save button
  const handleClick = async e => {
    e.preventDefault()
    setButtonState('saving')
    setButtonDisabled(true)
    try {
      // Send a patch request to the server to update the asset
      const updatedAsset = await server.updateAssetLink(artist.id, postId, chosenLink)
      // Update state in the Loader component with the new link
      updateLink(index, updatedAsset.priority_dsp)
      // Update the current link to match
      setCurrentLink(updatedAsset.priority_dsp)
      // Mark the button as 'saved'
      setButtonState('saved')
    } catch (err) {
      setButtonDisabled(false)
      setChosenLink(currentLink)
      setError(err)
      setButtonState('save')
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

        <PostLinkSaveButton
          buttonState={buttonState}
          handleClick={handleClick}
          disabled={buttonDisabled}
          width={25}
        />

      </div>

      <p className="no-margin">{checkLink(chosenLink)}</p>

    </div>
  )
}

export default PostLinkOptions
