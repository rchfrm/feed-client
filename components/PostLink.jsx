// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Button from './elements/Button'
import Icon from './elements/Icon'
import Input from './elements/Input'
// IMPORT PAGES
// IMPORT ASSETS
import BrokenCircle from './icons/BrokenCircle'
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import brandColors from '../constants/brandColors'
import styles from './PostsPage.module.css'

function SaveButton({ state, disabled, handleClick }) {
  // If a request is in progress, show a spinning broken circle
  if (state === 'saving') {
    return (
      <div className={styles['broken-circle']}>
        <BrokenCircle className={styles.svg} width={25} fill={brandColors.loaderColor} />
      </div>
    )
  }

  // Otherwise show a button, indicating that the information can be saved,
  // or has been saved
  return (
    <Button
      version="black"
      width={25}
      onClick={handleClick}
      disabled={disabled}
      textColor={state === 'saved' ? brandColors.white : undefined}
      bgColor={state === 'saved' ? brandColors.loaderColor : undefined}
    >
      {state[0].toUpperCase() + state.slice(1)}
    </Button>
  )
}

export function LinkOptions(props) {
// IMPORT CONTEXTS
  const { artist } = React.useContext(ArtistContext)
  const { getToken } = React.useContext(AuthContext)
  // END IMPORT CONTEXTS

  // REDEFINE PROPS AS VARIABLES
  const { setError } = props
  const { currentLink } = props
  const { setCurrentLink } = props
  const { chosenLink } = props
  const { setChosenLink } = props
  const { index } = props
  const { postId } = props
  const { setAddUrl } = props
  const { setPosts } = props
  // END REDEFINE PROPS AS VARIABLES

  // DEFINE STATES
  const [button, setButton] = React.useState('save')
  // END DEFINE STATES

  // Disable the save button if the selected link is the same as the one already set,
  // or it's set to default or add-url, or it the button state is not 'save'
  const disabled = (
    chosenLink === currentLink
    || chosenLink === 'add-url'
    || button !== 'save'
  )

  // Render link options
  const listLinks = links => {
    const linksArr = []

    // Add links to the array prioritised in the following order:
    if (links.spotify_url) {
      linksArr.push('spotify')
    }

    if (links.website_url) {
      linksArr.push('website')
    }

    if (links.instagram_url) {
      linksArr.push('instagram')
    }

    if (links.bandcamp_url) {
      linksArr.push('bandcamp')
    }

    if (links.facebook_page_url) {
      linksArr.push('facebook')
    }

    if (links.youtube_url) {
      linksArr.push('youtube')
    }

    if (links.twitter_url) {
      linksArr.push('twitter')
    }

    if (links.soundcloud_url) {
      linksArr.push('soundcloud')
    }

    if (links.apple_url) {
      linksArr.push('apple')
    }

    const options = linksArr.map(linkName => {
      return (
        <option key={linkName} value={linkName}>{helper.capitalise(linkName)}</option>
      )
    })
    // Add an option to add a new link to the end of the list
    options.push(
      <option key="add-url" value="add-url">+ Add another link</option>,
    )

    return options
  }
  const links = listLinks(artist.URLs)

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
      setPosts({
        type: 'update-link',
        payload: {
          index,
          link: updatedAsset.priority_dsp,
        },
      })
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

      <div className={styles['link-selection']}>

        <select
          className={styles.select}
          onChange={handleChange}
          value={chosenLink}
        >
          {links}
        </select>

        <SaveButton state={button} handleClick={handleClick} disabled={disabled} />

      </div>

      <p className="no-margin">{checkLink(chosenLink)}</p>

    </div>
  )
}

export function AddUrl(props) {
  // Import contexts
  const { addUrl, artist } = React.useContext(ArtistContext)
  const { getToken } = React.useContext(AuthContext)

  // Define states
  const [button, setButton] = React.useState('save')
  const [url, setUrl] = React.useState(undefined)
  const [platform, setPlatform] = React.useState(undefined)

  // Create list of options, based on the links in the artist context
  const listLinks = links => {
    const linksArr = []

    // Add links to the array prioritised in the following order:
    if (!links.spotify_url) {
      linksArr.push('spotify')
    }

    if (!links.website_url) {
      linksArr.push('website')
    }

    if (!links.instagram_url) {
      linksArr.push('instagram')
    }

    if (!links.bandcamp_url) {
      linksArr.push('bandcamp')
    }

    if (!links.facebook_page_url) {
      linksArr.push('facebook')
    }

    if (!links.youtube_url) {
      linksArr.push('youtube')
    }

    if (!links.twitter_url) {
      linksArr.push('twitter')
    }

    if (!links.soundcloud_url) {
      linksArr.push('soundcloud')
    }

    if (!links.apple_url) {
      linksArr.push('apple')
    }

    const options = linksArr.map(platform => {
      return (
        <option key={platform} value={platform}>{helper.capitalise(platform)}</option>
      )
    })

    // Add a default option to the beginning of the list
    options.unshift(
      <option key="undefined" value={undefined}> </option>,
    )

    return options
  }
  const links = listLinks(artist.URLs)

  // Disable the save button if the URL is empty, or no url type is selected
  const disabled = !url || !platform

  // Allow user to close the alert without saving a link
  const closeAlert = e => {
    e.preventDefault()
    props.setChosenLink(props.currentLink)
    props.setAddUrl(false)
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
    setButton('saving')
    try {
      // Send a patch request to the server to update the artist
      const urlType = helper.convertPlatformToPriorityDSP(platform)
      await addUrl(url, urlType)

      // Send a patch request to the server to update the asset
      const token = await getToken()
      const updatedAsset = await server.updateAssetLink(artist.id, props.postId, platform, token)

      // Update state in the Loader component with the new link
      props.setPosts({
        type: 'update-link',
        payload: {
          index: props.index,
          link: updatedAsset.priority_dsp,
        },
      })

      // Mark the button as 'saved'
      setButton('saved')

      props.setCurrentLink(updatedAsset.priority_dsp)
      props.setChosenLink(updatedAsset.priority_dsp)
      props.setAddUrl(false)
    } catch (err) {
      setButton('save')
      props.setChosenLink(props.currentLink)
      props.setAddUrl(false)
      props.setError(err)
    }
  }

  return (
    <div className="alert-container">
      <div className="alert">

        <div style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
        }}
        >

          <h2 style={{ flex: 'auto' }}>Save a new link.</h2>

          <Button
            version="toggle"
            onClick={closeAlert}
          >
            <Icon
              version="cross"
              color={brandColors.black}
              width="18"
            />
          </Button>

        </div>

        <Input
          version="text"
          label={{
            position: 'top',
            text: 'Enter the URL:',
          }}
          onChange={handleInput}
          value={url || ''}
          width={100}
        />

        <label className="label_top">Select the type:</label>
        <div className={styles['link-selection']} style={{ width: '100%' }}>

          <select
            className={styles.select}
            onChange={handleSelect}
          >
            {links}
          </select>

          <SaveButton state={button} handleClick={saveLink} disabled={disabled} />

        </div>

      </div>
    </div>
  )
}
