// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
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
import brandColors from '../constants/brandColors'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import styles from './Integrations.module.css'

function Connections({
  artistId,
  connections,
  connectionPlatforms,
  priorityDSP,
  setConnections,
  setPriorityDSP,
}) {
  // LIST INTEGRATIONS
  const connectionsList = connectionPlatforms.map(platform => {
    return (
      <Connection
        key={platform}
        artistId={artistId}
        platform={platform}
        priorityDSP={priorityDSP}
        url={connections[platform].url || ''}
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
    setConnections({
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

    // Send a patch request to the server to update the artist
    const urlType = helper.convertPlatformToPriorityDSP(platform)
    // Make sure the value is a link
    const updatedArtist = await server.saveLink(artistId, link, urlType)
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

  const addProtocol = (link) => {
    const linkWithProtocol = link
      // Strip protocol
      .replace(/(^\w+:|^)\/\//, '')
      // Add protocol back in
      .replace(/^/, 'http://')
    return linkWithProtocol
  }

  // Handle clicks on the integrations edit button(s)
  const handleClick = async (e) => {
    e.preventDefault()

    // Show an alert if the user tries to edit the Facebook or Instagram URLs
    if (platform === 'facebook' || platform === 'instagram') {
      // eslint-disable-next-line
      window.alert(`To connect a ${helper.capitalise(platform)} page, please contact us at services@archform.ltd`)
      return
    }

    const link = value === '' ? value : addProtocol(value)

    // Don't allow invalid links
    const linkValid = link === '' ? true : helper.testValidUrl(link)
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

  // END FUNCTIONS

  return (
    <li className={styles.integrarionsListItem} key={platform}>

      <ConnectionIcons artistId={artistId} platform={platform} priorityDSP={priorityDSP} setConnections={setConnections} setPriorityDSP={setPriorityDSP} valid={valid} />

      <div className={styles['integration-link']}>
        <ConnectionLink platform={platform} setValue={setValue} setDisabled={setDisabled} url={url} valid={valid} value={value} />
      </div>

      <div className={styles['integration-edit']}>
        <Button version="text" onClick={handleClick} disabled={disabled} bgColor={brandColors.white}>
          <ConnectionEdit disabled={disabled} loading={loading} valid={valid} />
        </Button>
      </div>

    </li>
  )
}

const ConnectionIcons = ({
  artistId,
  platform,
  priorityDSP,
  setPriorityDSP,
  valid,
}) => {
  const priority = priorityDSP === platform

  // DEFINE DEFAULT COLOUR
  let defaultColor = brandColors.greyLight
  if (valid && priority) {
    defaultColor = brandColors.textColor
  } else if (!valid) {
    defaultColor = brandColors.bgColor
  }
  // DEFINE DEFAULT COLOUR

  // IMPORT CONTEXTS
  const { artist, setPriorityDSP: setArtistContextPriority } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE STATES
  const [color, setColor] = React.useState(defaultColor)
  const [loading, setLoading] = React.useState(false)

  // DEFINE ALERT STATE
  const initialAlertState = {
    contents: undefined,
    responseExpected: true,
    confirmationText: 'Yes.',
    rejectionText: 'No.',
    response: false,
  }
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)

  // DEFINE ALERT REPONSES
  const resetAlert = () => setAlert({ type: 'reset-alert' })
  const acceptAlert = () => setAlert({ type: 'set-positive-response' })

  const handleMouseEnter = () => {
    if (valid && !priority) {
      setColor(brandColors.greyDark)
    }
  }

  const handleMouseLeave = () => {
    setColor(defaultColor)
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
    if (artist.id === artistId) {
      setArtistContextPriority(platform)
    }

    const result = await server.updatePriorityDSP(artistId, platform)
    return result
  }, [artist.id, setArtistContextPriority])

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
    setColor(defaultColor)
  }, [defaultColor, priorityDSP])

  return (
    <div className={styles['integration-icons']}>

      <Alert
        confirmationText={alert.confirmationText}
        contents={alert.contents}
        rejectionText={alert.rejectionText}
        responseExpected={alert.responseExpected}
        resetAlert={resetAlert}
        acceptAlert={acceptAlert}
      />

      {loading
        ? <Spinner width={15} color={brandColors.grey} />
        : (
          <div
            role="button"
            className={styles['default-integration-icon']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ cursor: valid && !priority ? 'pointer' : 'initial' }}
          >

            <AsteriskIcon fill={color} width={15} />

          </div>
        )}

      <div className={styles['integration-platform-icon']}>
        <Icon
          version={platform}
          color={dataSourceDetails[platform] ? dataSourceDetails[platform].color : 'black'}
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

const ConnectionLink = ({
  platform,
  setValue,
  setDisabled,
  url,
  valid,
  value = '',
}) => {
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
    setDisabled(false)
    setValue(e.target.value)
    setValue(e.target.value || '')
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
      name="Connection"
      version="text"
      label=""
      placeholder={value || placeholder(platform)}
      value={value}
      handleChange={handleChange}
    />
  )
}

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
      version="tick"
      color={disabled ? [brandColors.disabledColorText] : [brandColors.textColor]}
      width={15}
    />
  )
}
