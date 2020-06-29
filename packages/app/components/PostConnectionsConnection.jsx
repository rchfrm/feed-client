// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import PostConnectionsLink from '@/PostConnectionsLink'
import PostConnectionsEdit from '@/PostConnectionsEdit'
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Button from '@/elements/Button'
import Icon from '@/elements/Icon'
import Spinner from '@/elements/Spinner'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import { track } from '@/app/helpers/trackingHelpers'
// IMPORT STYLES
import styles from '@/Integrations.module.css'


const PostConnectionsConnection = ({
  url = '',
  platform,
  artist,
  valid,
  priorityDSP,
  udpatePriorityDSP,
  udpateConnections,
}) => {
  // DEFINE STATES
  const [value, setValue] = React.useState(url)
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState()

  // Set initial disabled state
  React.useEffect(() => {
    setDisabled(!!(value === ''))
  }, [])

  // Toggle the value for valid in the integrations state
  const toggleValid = (state) => {
    udpateConnections({
      type: 'toggle-platform-validity',
      payload: {
        platform,
        state,
      },
    })
  }

  // Send updated links to the server
  const saveLink = async (link) => {
    setLoading(true)
    // Convert empty strings to null
    const linkSantised = link || null
    // Send a patch request to the server to update the artist
    const urlType = utils.convertPlatformToPriorityDSP(platform)
    // Test whether the link has been added or updated
    const linkEdited = artist[urlType]
    // Make sure the value is a link
    const updatedArtist = await server.saveLink(artist.id, linkSantised, urlType)
    udpateConnections({
      type: 'set-platform',
      payload: {
        platform,
        name: urlType,
        url: updatedArtist[urlType],
      },
    })
    // Stop loading
    setLoading(false)
    // Track
    if (linkSantised) {
      const actionType = linkEdited ? 'edited' : 'added'
      track({
        category: 'Connections',
        action: `Platform connection ${actionType}`,
        description: `Platform: ${platform}`,
        label: `artistId: ${artist.id}`,
      })
    } else {
      track({
        category: 'Connections',
        action: 'Platform connection removed',
        description: `Platform: ${platform}`,
        label: `artistId: ${artist.id}`,
      })
    }
  }


  // Handle clicks on the integrations edit button(s)
  const handleClick = async (e) => {
    e.preventDefault()

    // Show an alert if the user tries to edit the Facebook or Instagram URLs
    if (platform === 'facebook' || platform === 'instagram') {
      // eslint-disable-next-line
      window.alert(`To connect a ${utils.capitalise(platform)} page, please contact us at services@archform.ltd`)
      return
    }

    const link = value === '' ? value : utils.enforceUrlProtocol(value)

    // Don't allow invalid links
    const linkValid = link === '' ? true : utils.testValidUrl(link)
    if (!linkValid) {
      toggleValid(false)
      // eslint-disable-next-line
      window.alert('Please include a valid link')
      return
    }

    // If there is already a link, set toggle valid to false
    // in order to show the input field
    // If the value of the input field is the same as the pre-existing url,
    // toggle valid to true, and hide the input field
    if (valid || value === url) {
      toggleValid()
      return
    }

    // Otherwise, send the updated url to the server
    await saveLink(link)
      .catch(err => {
        setLoading(false)
        // TODO: Find a way to show errors well
        console.log(err)
      })

    // Reset to disabled if empty
    if (!link) {
      setDisabled(true)
    }
  }

  return (
    <li className={styles.integrarionsListItem} key={platform}>

      <PostConnectionsEdit
        artistId={artist.id}
        platform={platform}
        priorityDSP={priorityDSP}
        udpateConnections={udpateConnections}
        udpatePriorityDSP={udpatePriorityDSP}
        valid={valid}
      />

      <div className={styles['integration-link']}>
        <PostConnectionsLink
          platform={platform}
          setValue={setValue}
          setDisabled={setDisabled}
          url={url}
          valid={valid}
          value={value}
        />
      </div>

      <div className={styles.integrationEdit}>
        <Button
          className={styles.integrationEditButton}
          version="none"
          onClick={handleClick}
          disabled={disabled}
          bgColor={brandColors.white}
        >
          <ConnectionEdit
            disabled={disabled}
            loading={loading}
            valid={valid}
          />
        </Button>
      </div>

    </li>
  )
}

export default PostConnectionsConnection


function ConnectionEdit({
  disabled,
  loading,
  valid,
}) {
  if (loading) {
    return <Spinner width={15} color={brandColors.grey} />
  }

  if (valid) {
    return (
      <Icon
        version="pencil"
        color="black"
        width={15}
      />
    )
  }
  return (
    <Icon
      className={styles.saveIcon}
      version="tick"
      color={disabled ? [brandColors.disabledColorText] : [brandColors.textColor]}
      width={15}
    />
  )
}
