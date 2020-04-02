import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Feed from './elements/Feed'
import Button from './elements/Button'
import Spinner from './elements/Spinner'
import Alert from './elements/Alert'
import Icon from './elements/Icon'
import { alertReducer, initialAlertState } from './ResultsAll'
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'
// IMPORT HELPERS
import server from './helpers/server'
// COPY
// IMPORT STYLES
import resultsStyles from './Results.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...resultsStyles,
  ...postStyles,
}

function DeactivateAdConfirmation({ promotion_enabled }) {
  if (!promotion_enabled) {
    return (
      <div>
        <h1>Are you sure?</h1>
        <p>
          Clicking 'Yes' below will mean
          {' '}
          <Feed />
          {' '}
          starts to promote the post again.
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>Are you sure?</h1>
      <p>Just to double check, are you sure you want this post to stop being promoted?</p>
    </div>
  )
}

function ResultsToggle({
  active,
  id,
  promotion_enabled,
  setPosts,
}) {
  // IMPORT ARTIST CONTEXT
  const { artist } = React.useContext(ArtistContext)
  // END IMPORT ARTIST CONTEXT

  // DEFINE STATE
  const [loading, setLoading] = React.useState(false)


  // Handle alert
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)
  const resetAlert = () => setAlert({ type: 'reset-alert' })
  const acceptAlert = () => setAlert({ type: 'set-positive-response' })

  const showAlert = () => {
    setAlert({
      type: 'show-alert',
      payload: {
        contents: <DeactivateAdConfirmation promotion_enabled={promotion_enabled} />,
      },
    })
  }


  const togglePromotion = async () => {
    // return result
    const result = await server.togglePromotionEnabled(artist.id, id, !promotion_enabled)
    return result
  }

  // Update post promotion_enabled if there is a positive response from the alert
  useAsyncEffect(async (isMounted) => {
    if (!alert.response) return
    if (!isMounted()) return
    setLoading(true)
    const post = await togglePromotion()
      .catch(err => {
        // TODO: PROPERLY HANDLE THIS ERROR
        console.log(err)
        if (!isMounted()) return
        setLoading(false)
      })
    if (!isMounted()) return
    setPosts({
      type: 'set-promotion-enabled',
      payload: {
        type: active ? 'active' : 'archive',
        id,
        promotion_enabled: post.promotion_enabled,
      },
    })
    setLoading(false)
  }, [active, alert.response, id])

  if (!active) return null

  return (
    <div className={styles['result-toggle']}>

      <Alert
        contents={alert.contents}
        confirmationText={alert.confirmationText}
        rejectionText={alert.rejectionText}
        responseExpected={alert.responseExpected}
        resetAlert={resetAlert}
        acceptAlert={acceptAlert}
      />

      <Button
        className={styles.button}
        version="cross"
        onClick={showAlert}
      >
        {
              loading
                ? <Spinner width={20} color={brandColors.white} />
                : (
                  <Icon
                    className={styles.button}
                    version={promotion_enabled ? 'cross' : 'tick'}
                    color={promotion_enabled ? brandColors.red : brandColors.green}
                    width="18"
                  />
                )
            }
      </Button>

    </div>
  )
}

ResultsToggle.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string.isRequired,
  promotion_enabled: PropTypes.bool,
  setPosts: PropTypes.func.isRequired,
}

ResultsToggle.defaultProps = {
  active: false,
  promotion_enabled: false,
}

export default ResultsToggle
