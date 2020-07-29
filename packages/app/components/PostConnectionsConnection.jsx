// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import PostConnectionsLink from '@/app/PostConnectionsLink'
import PostConnectionsEdit from '@/app/PostConnectionsEdit'
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Button from '@/elements/Button'
import Icon from '@/elements/Icon'
import Spinner from '@/elements/Spinner'
import MarkdownText from '@/elements/MarkdownText'

import Alert, { alertReducer, initialAlertState } from '@/elements/Alert'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColors from '@/constants/brandColors'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import { track } from '@/app/helpers/trackingHelpers'
// IMPORT STYLES
import styles from '@/app/Integrations.module.css'

const getAlertContents = (copy) => {
  return (
    <MarkdownText markdown={copy} />
  )
}

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
  // eslint-disable-next-line
  }, [setDisabled])

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

  // * HANDLE ALERT
  // define alert state
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)
  // define alert responses
  const resetAlert = React.useCallback(() => {
    setAlert({ type: 'reset-alert' })
  }, [setAlert])
  const showAlert = React.useCallback((copy) => {
    setAlert({
      type: 'show-alert',
      payload: {
        contents: getAlertContents(copy),
      },
    })
  }, [setAlert])

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
      showAlert(`To connect a ${utils.capitalise(platform)} page, please contact us at [help@tryfeed.co](mailto:help@tryfeed.co)`)
      return
    }

    const link = value === '' ? value : utils.enforceUrlProtocol(value)

    // Don't allow invalid links
    const linkValid = link === '' ? true : utils.testValidUrl(link)
    if (!linkValid) {
      toggleValid(false)
      showAlert('Please include a valid link')
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
          <CONNECTION_EDIT
            disabled={disabled}
            loading={loading}
            valid={valid}
          />
        </Button>
      </div>

      {/* ALERT */}
      <Alert
        confirmationText={alert.confirmationText}
        contents={alert.contents}
        rejectionText={alert.rejectionText}
        responseExpected={alert.responseExpected}
        resetAlert={resetAlert}
        buttons={<Button version="black full" onClick={resetAlert}>Ok</Button>}
      />

    </li>
  )
}

export default PostConnectionsConnection


function CONNECTION_EDIT({
  disabled,
  loading,
  valid,
}) {
  if (loading) {
    return <Spinner width={15} color={brandColors.grey} />
  }

  if (valid) {
    return (
      <a className="text-sm">Edit</a>
    )
  }
  return (
    <a className="text-sm">Save</a>
  )
}
