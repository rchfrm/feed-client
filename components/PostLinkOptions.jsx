// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import PostLinkSaveButton from './PostLinkSaveButton'
import SelectNew from './elements/SelectNew'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import styles from './PostsPage.module.css'


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
  const { getToken } = React.useContext(AuthContext)
  // DEFINE STATES
  const [button, setButton] = React.useState('save')

  // Disable the save button if the selected link is the same as the one already set,
  // or it's set to default or add-url, or it the button state is not 'save'
  const disabled = (
    chosenLink === currentLink
      || chosenLink === 'add-url'
      || button !== 'save'
  )


  // const links = listLinks(artist.URLs)

  const links = Object.keys(artist.URLs).map((link) => {
    let name
    if (link === 'spotify_url') {
      name = 'spotify'
    }

    if (link === 'website_url') {
      name = 'website'
    }

    if (link === 'instagram_url') {
      name = 'instagram'
    }

    if (link === 'bandcamp_url') {
      name = 'bandcamp'
    }

    if (link === 'facebook_page_url') {
      name = 'facebook'
    }

    if (link === 'youtube_url') {
      name = 'youtube'
    }

    if (link === 'twitter_url') {
      name = 'twitter'
    }

    if (link === 'soundcloud_url') {
      name = 'soundcloud'
    }

    if (link === 'apple_url') {
      name = 'apple'
    }
    return { name, value: name }
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
      // Get the token from the auth context
      const token = await getToken()
      // Send a patch request to the server to update the asset
      const updatedAsset = await server.updateAssetLink(artist.id, postId, chosenLink, token)
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

  const checkLink = platform => {
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

        <SelectNew
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
