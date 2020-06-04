import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/Artist'
// IMPORT ELEMENTS
import Alert from '@/elements/Alert'
import Input from '@/elements/Input'
import Select from '@/elements/Select'
// IMPORT PAGES
// IMPORT ASSETS
import PostLinkSaveButton from '@/PostLinkSaveButton'
// IMPORT CONSTANTS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import server from '@/helpers/server'
// IMPORT STYLES
import styles from '@/PostsPage.module.css'

// Create list of options, based on the links in the artist context
const getLinkOptions = (links) => {
  const linksArr = []
  // Add links to the array prioritised in the following order:
  if (!links.spotify_url) linksArr.push('spotify')
  if (!links.website_url) linksArr.push('website')
  if (!links.instagram_url) linksArr.push('instagram')
  if (!links.bandcamp_url) linksArr.push('bandcamp')
  if (!links.facebook_page_url) linksArr.push('facebook')
  if (!links.youtube_url) linksArr.push('youtube')
  if (!links.twitter_url) linksArr.push('twitter')
  if (!links.soundcloud_url) linksArr.push('soundcloud')
  if (!links.apple_url) linksArr.push('apple')
  // Return options array
  return linksArr.map((link) => {
    return { name: link, value: link }
  })
}

function PostLinkAddUrl({
  currentLink,
  postId,
  index,
  setChosenLink,
  setCurrentLink,
  setAddUrl,
  setError,
  updateLink,
}) {
  // Import contexts
  const { addUrl, artist } = React.useContext(ArtistContext)

  const linkOptions = getLinkOptions(artist.URLs)
  const [initialLinkOption] = linkOptions

  // Define states
  const [buttonState, setButtonState] = React.useState('save')
  const [url, setUrl] = React.useState('')
  const [platform, setPlatform] = React.useState(initialLinkOption.value)

  // Disable the save button if the URL is empty, or no url type is selected
  const enabled = url && platform

  // Allow user to close the alert without saving a link
  const closeAlert = e => {
    e.preventDefault()
    setChosenLink(currentLink)
    setAddUrl(false)
  }

  // Handle changes to URL input field
  const handleInput = e => {
    e.preventDefault()
    setUrl(e.target.value)
  }

  // Handle changes in selection box
  const handleSelect = e => {
    e.preventDefault()
    setPlatform(e.target.value)
  }

  // Send patch request with new link to server
  const saveLink = async e => {
    e.preventDefault()
    setButtonState('saving')
    try {
      // Send a patch request to the server to update the artist
      const urlType = utils.convertPlatformToPriorityDSP(platform)
      await addUrl(url, urlType)

      // Send a patch request to the server to update the asset
      const updatedAsset = await server.updateAssetLink(artist.id, postId, platform)
      // Update state in the Loader component with the new link
      updateLink(index, updatedAsset.priority_dsp)
      // Mark the button as 'saved'
      setButtonState('saved')
      setCurrentLink(updatedAsset.priority_dsp)
      setChosenLink(updatedAsset.priority_dsp)
      // Wait a second then close dialogue
      setTimeout(() => {
        setAddUrl(false)
      }, 1000)
    } catch (err) {
      setButtonState('save')
      setChosenLink(currentLink)
      setAddUrl(false)
      setError(err)
    }
  }

  const AlertContents = () => (
    <>
      <h2 style={{ flex: 'auto' }}>Save a new link.</h2>
      <Input
        className={styles.PostLinkAddUrl__input}
        placeholder="https://"
        type="url"
        version="box"
        label="Link URL"
        name="link-url"
        handleChange={handleInput}
        value={url || ''}
        required
      />

      <Select
        name="linkVersion"
        className={styles.PostLinkAddUrl__select}
        options={linkOptions}
        handleChange={handleSelect}
        label="Select the type:"
        selectedValue={platform}
        required
      />
    </>
  )

  const AlertButton = () => (
    <PostLinkSaveButton
      buttonState={buttonState}
      handleClick={saveLink}
      disabled={!enabled}
      style={{
        width: '100%',
      }}
    />
  )

  return (
    <Alert
      contents={AlertContents()}
      resetAlert={closeAlert}
      buttons={AlertButton()}
    />
  )
}

export default PostLinkAddUrl
