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
import Spinner from './elements/Spinner'
import Alert from './elements/Alert'
// IMPORT PAGES
import { alertReducer } from './ResultsAll'
// IMPORT ASSETS
import AsteriskIcon from './icons/AsterixIcon'
// IMPORT CONSTANTS
import dataSourceDetails from '../constants/dataSources'
import brandColours from '../constants/brandColours'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import styles from './AccountPage.module.css'

function Connections(props) {
// REDEFINE PROPS AS VARIABLES
  const { artistId } = props
  const { connections } = props
  const { priorityDSP } = props
  const { setConnections } = props
  const { setPriorityDSP } = props
  // END REDEFINE PROPS AS VARIABLES

  // LIST INTEGRATIONS
  const platforms = Object.keys(connections)
  const connectionsList = platforms.map(platform => {
    return (
      <Connection
        key={platform}
        artistId={artistId}
        platform={platform}
        priorityDSP={priorityDSP}
        url={connections[platform].url}
        valid={connections[platform].valid}
        setConnections={setConnections}
        setPriorityDSP={setPriorityDSP}
      />
    )
  })
  // END LIST INTEGRATIONS

  return (
    <ul className={styles['integrations-list']}>{connectionsList}</ul>
  )
}

export default Connections

const Connection = ({
  url = '',
  platform,
  artistId,
  valid,
  priorityDSP,
  setPriorityDSP,
  setConnections,
}) => {
// IMPORT CONTEXTS
  const { getToken } = React.useContext(AuthContext)
  // END IMPORT CONTEXTS

  // DEFINE STATES
  const [value, setValue] = React.useState(url)
  const [loading, setLoading] = React.useState(false)
  // END DEFINE STATES

  // FUNCTIONS
  // If the value field is empty, the 'tick' button should be disabled
  const disabled = value === ''

  // Toggle the value for valid in the integrations state
  const toggleValid = () => {
    setConnections({
      type: 'toggle-platform-validity',
      payload: {
        platform,
      },
    })
  }

  // Send updated links to the server
  const saveLink = async () => {
    setLoading(true)

    // Send a patch request to the server to update the artist
    const urlType = helper.convertPlatformToPriorityDSP(platform)
    const token = await getToken()
      .catch((err) => {
        throw (err)
      })
    const updatedArtist = await server.saveLink(artistId, value, urlType, token)
      .catch((err) => {
        throw (err)
      })
    setConnections({
      type: 'set-platform',
      payload: {
        platform,
        name: urlType,
        url: updatedArtist[urlType],
      },
    })
    setLoading(false)
  }

  // Handle clicks on the integrations edit button(s)
  const handleClick = e => {
    e.preventDefault()

    // Show an alert if the user tries to edit the Facebook or Instagram URLs
    if (platform === 'facebook' || platform === 'instagram') {
      // eslint-disable-next-line
      window.alert(`To connect a ${helper.capitalise(platform)} page, please contact us at services@archform.ltd`)
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
    saveLink()
      .catch(err => {
        setLoading(false)
        // TODO: Find a way to show errors well
        console.log(err)
      })
  }

  // END FUNCTIONS

  return (
    <li className={styles.li} key={platform}>

      <IntegrationIcons artistId={artistId} platform={platform} priorityDSP={priorityDSP} setConnections={setConnections} setPriorityDSP={setPriorityDSP} valid={valid} />

      <div className={styles['integration-link']}>
        <IntegrationLink platform={platform} setValue={setValue} url={url} valid={valid} value={value} />
      </div>

      <div className={styles['integration-edit']}>
        <Button version="text" onClick={handleClick} disabled={disabled} bgColour="white">
          <IntegrationEdit disabled={disabled} loading={loading} valid={valid} />
        </Button>
      </div>

    </li>
  )
}

const IntegrationIcons = ({
  artistId,
  platform,
  priorityDSP,
  setPriorityDSP,
  valid,
}) => {
  const priority = priorityDSP === platform

  // DEFINE DEFAULT COLOUR
  let defaultColour = brandColours.lightGrey.hex
  if (valid && priority) {
    defaultColour = brandColours.black.hex
  } else if (!valid) {
    defaultColour = brandColours.white.hex
  }
  // DEFINE DEFAULT COLOUR

  // IMPORT CONTEXTS
  const { getToken } = React.useContext(AuthContext)
  const { artist, setPriorityDSP: setArtistContextPriority } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE STATES
  const [colour, setColour] = React.useState(defaultColour)
  const [loading, setLoading] = React.useState(false)
  // END DEFINE STATES

  // DEFINE ALERT STATE
  const initialAlertState = {
    contents: undefined,
    responseExpected: true,
    confirmationText: 'Yes.',
    rejectionText: 'No.',
    response: false,
  }
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)
  // END DEFINE ALERT STATE

  const handleMouseEnter = () => {
    if (valid && !priority) {
      setColour(brandColours.darkGrey.hex)
    }
  }

  const handleMouseLeave = () => {
    setColour(defaultColour)
  }

  const handleClick = e => {
    e.preventDefault()
    if (priority || !valid) {
      return
    }

    setAlert({
      type: 'show-alert',
      payload: {
        contents: <ConfirmPriorityDSPChange platform={platform} />,
      },
    })
  }

  const updatePriorityDSP = React.useCallback(async (artistId, platform) => {
    const token = await getToken()
      .catch((err) => {
        throw (err)
      })
    if (artist.id === artistId) {
      setArtistContextPriority(platform)
    }

    const result = await server.updatePriorityDSP(artistId, platform, token)
    return result
  }, [artist.id, getToken, setArtistContextPriority])

  React.useEffect(() => {
    if (!alert.response) {
      return
    }

    setLoading(true)
    updatePriorityDSP(artistId, platform)
      .then(res => {
        setPriorityDSP(res.priority_dsp)
        setLoading(false)
      }).catch(err => {
        // TODO: PROPERLY HANDLE THIS ERROR
        console.log(err)
        setLoading(false)
      })
  }, [alert.response, artistId, platform, setPriorityDSP, updatePriorityDSP])

  React.useEffect(() => {
    setColour(defaultColour)
  }, [defaultColour, priorityDSP])

  return (
    <div className={styles['integration-icons']}>

      <Alert
        confirmationText={alert.confirmationText}
        contents={alert.contents}
        rejectionText={alert.rejectionText}
        responseExpected={alert.responseExpected}
        setAlert={setAlert}
      />

      {loading
        ? <Spinner width={15} colour={brandColours.grey.hex} />
        : (
          <div
            role="button"
            className={styles['default-integration-icon']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ cursor: valid && !priority ? 'pointer' : 'initial' }}
          >

            <AsteriskIcon fill={colour} width={15} />

          </div>
        )}

      <div className={styles['integration-platform-icon']}>
        <Icon
          version={platform}
          color={dataSourceDetails[platform] ? dataSourceDetails[platform].colour : 'black'}
          width={20}
        />
      </div>

    </div>
  )
}

function ConfirmPriorityDSPChange({ platform }) {
  return (
    <div>
      <h1>Are you sure?</h1>
      <p>
        Clicking 'Yes' will change the default link in your promoted posts to your
        {helper.capitalise(platform)}
        {' '}
        page.
      </p>
    </div>
  )
}

function IntegrationLink(props) {
// REDEFINE PROPS AS VARIABLES
  const { platform } = props
  const { setValue } = props
  const { url } = props
  const { valid } = props
  const { value } = props
  // END REDEFINE PROPS AS VARIABLES

  // FUNCTIONS
  // Generate phrase for input placeholder
  const placeholder = platform => {
    const beginning = 'Enter the URL of your'

    if (platform === 'website') {
      return `${beginning} ${platform}`
    } if (platform === 'youtube') {
      return `${beginning} ${helper.capitalise(platform)} channel`
    }

    let correctedPlatform = platform
    if (correctedPlatform === 'apple') {
      correctedPlatform = 'Apple Music'
    } else {
      correctedPlatform = helper.capitalise(correctedPlatform)
    }

    return `${beginning} ${correctedPlatform} page`
  }

  // Handle changes in the input field
  const handleChange = e => {
    e.preventDefault()
    setValue(e.target.value)
  }
  // END FUNCTIONS

  if (valid) {
    return (
      <a className={styles.a} href={url} target="_blank" rel="noopener noreferrer">{helper.shortenUrl(url)}</a>
    )
  }
  return (
    <Input
      className={styles.input}
      version="text"
      label="none"
      placeholder={value || placeholder(platform)}
      value={value}
      onChange={handleChange}
    />
  )
}

function IntegrationEdit(props) {
// REDEFINE PROPS AS VARIABLES
  const { disabled } = props
  const { loading } = props
  const { valid } = props
  // END REDEFINE PROPS AS VARIABLES

  if (loading) {
    return <Spinner width={15} colour={brandColours.grey.hex} />
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
      version="tick"
      color={disabled ? [brandColours.grey.hex] : [brandColours.black.hex]}
      width={15}
    />
  )
}
