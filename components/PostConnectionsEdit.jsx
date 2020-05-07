// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Icon from './elements/Icon'
import Spinner from './elements/Spinner'
import Alert, { alertReducer, initialAlertState } from './elements/Alert'
// IMPORT ASSETS
import AsteriskIcon from './icons/AsteriskIcon'
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import styles from './Integrations.module.css'


function ConfirmPriorityDSPChange({ platform }) {
  return (
    <div>
      <h2>Are you sure?</h2>
      <p>
        Clicking 'Yes' will change the default link in your promoted posts to your
        {' '}
        {helper.capitalise(platform)}
        {' '}
        page.
      </p>
    </div>
  )
}


const PostConnectionsEdit = ({
  artistId,
  platform,
  priorityDSP,
  udpatePriorityDSP,
  valid,
}) => {
  // DEFINE DEFAULT COLOUR
  const priority = priorityDSP === platform
  let defaultColor = brandColors.greyLight
  if (valid && priority) {
    defaultColor = brandColors.textColor
  } else if (!valid) {
    defaultColor = brandColors.bgColor
  }

  // DEFINE STATES
  const [color, setColor] = React.useState(defaultColor)
  const [loading, setLoading] = React.useState(false)

  // DEFINE ALERT STATE
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)

  // DEFINE ALERT RESPONSES
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
    const result = await server.updatePriorityDSP(artistId, platform)
    return result
  }, [])

  React.useEffect(() => {
    if (!alert.response) {
      return
    }

    setLoading(true)
    updatePriorityDSP(artistId, platform)
      .then(res => {
        udpatePriorityDSP(res.priority_dsp)
        setLoading(false)
      }).catch(err => {
        // TODO: PROPERLY HANDLE THIS ERROR
        console.log(err)
        setLoading(false)
      })
  }, [alert.response, artistId, platform, udpatePriorityDSP, updatePriorityDSP])

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
        ? <Spinner className={styles.asteriskIcon} width={15} color={brandColors.grey} />
        : (
          <div
            role="button"
            className={styles['default-integration-icon']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            style={{ cursor: valid && !priority ? 'pointer' : 'initial' }}
          >

            <AsteriskIcon className={styles.asteriskIcon} fill={color} width={15} />

          </div>
        )}

      <div className={styles['integration-platform-icon']}>
        <Icon
          version={platform}
          color={brandColors[platform] ? brandColors[platform].bg : brandColors.textColor}
          width={20}
        />
      </div>

    </div>
  )
}

export default PostConnectionsEdit
