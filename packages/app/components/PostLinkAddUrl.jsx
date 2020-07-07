import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Alert from '@/elements/Alert'
import Input from '@/elements/Input'
import Select from '@/elements/Select'
import Error from '@/elements/Error'
// IMPORT PAGES
// IMPORT ASSETS
import PostLinkSaveButton from '@/app/PostLinkSaveButton'
// IMPORT CONSTANTS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
// IMPORT STYLES
import styles from '@/app/PostItem.module.css'

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
  postId,
  postIndex,
  artist,
  addArtistUrl,
  setPostLinkPlatform,
  postLinkPlatform,
  storedPostLinkPlatform,
  setAdUrlDialogueOpen,
  updateLink,
}) {
  const linkOptions = getLinkOptions(artist.URLs)
  const [initialLinkOption] = linkOptions

  // Define states
  const [buttonState, setButtonState] = React.useState('save')
  const [url, setUrl] = React.useState('')
  const [platform, setPlatform] = React.useState(initialLinkOption.value)
  const [error, setError] = React.useState(null)

  // Disable the save button if the URL is empty, or no url type is selected
  const enabled = url && platform

  // Allow user to close the alert without saving a link
  const closeAlert = React.useCallback((e) => {
    e.preventDefault()
    setPostLinkPlatform(storedPostLinkPlatform)
    setAdUrlDialogueOpen(false)
  }, [setAdUrlDialogueOpen, setPostLinkPlatform, storedPostLinkPlatform])

  // Handle changes to URL input field
  const handleInput = React.useCallback((e) => {
    e.preventDefault()
    setUrl(e.target.value)
  }, [setUrl])

  // Handle changes in selection box
  const handleSelect = React.useCallback((e) => {
    e.preventDefault()
    setPlatform(e.target.value)
  }, [setPlatform])

  // Send patch request with new link to server
  const saveLink = React.useCallback(async (e) => {
    e.preventDefault()
    setButtonState('saving')
    setError(null)
    try {
      // Sanitise the URL
      const urlSanitised = utils.enforceUrlProtocol(url)
      // Test for valid URL
      const urlValid = utils.testValidUrl(urlSanitised)
      // Throw error if URL is not valid
      if (!urlValid) {
        setError({ message: 'URL not valid' })
        setButtonState('save')
        return
      }
      // Send a patch request to the server to update the artist
      const platformType = utils.convertPlatformToPriorityDSP(platform)
      await addArtistUrl(urlSanitised, platformType)
      // Send a patch request to the server to update the asset
      const updatedAsset = await server.updateAssetLink(artist.id, postId, platform)
      // Update state in the Loader component with the new link
      updateLink(postIndex, updatedAsset.priority_dsp)
      // Mark the button as 'saved'
      setButtonState('saved')
      setPostLinkPlatform(updatedAsset.priority_dsp)
      // Wait a second then close dialogue
      setTimeout(() => {
        setAdUrlDialogueOpen(false)
      }, 1000)
    } catch (err) {
      setButtonState('save')
      setPostLinkPlatform(postLinkPlatform)
      setAdUrlDialogueOpen(false)
      setError(err)
    }
  }, [platform, postLinkPlatform, url])

  const AlertContents = React.useMemo(() => {
    return (
      <>
        <h2 style={{ flex: 'auto' }}>Save a new link.</h2>

        {error && <Error error={error} />}

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
  }, [platform, url, error, linkOptions, handleInput])

  const AlertButton = React.useMemo(() => {
    return (
      <PostLinkSaveButton
        buttonState={buttonState}
        handleClick={saveLink}
        disabled={!enabled}
        style={{
          width: '100%',
        }}
      />
    )
  }, [buttonState, saveLink, enabled])

  return (
    <Alert
      contents={AlertContents}
      resetAlert={closeAlert}
      buttons={AlertButton}
    />
  )
}

export default PostLinkAddUrl
