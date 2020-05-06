import React from 'react'
import PropTypes from 'prop-types'

import { useAsync } from 'react-async'

import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Button from './elements/Button'
import Spinner from './elements/Spinner'
import Alert, { alertReducer, initialAlertState } from './elements/Alert'
import Icon from './elements/Icon'
// IMPORT CONSTANTS
import brandColors from '../constants/brandColors'
// IMPORT HELPERS
import server from './helpers/server'
import { track } from './helpers/trackingHelpers'
// COPY
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/ResultsPageCopy'
// IMPORT STYLES
import resultsStyles from './Results.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...resultsStyles,
  ...postStyles,
}


const setToggleState = ({ alertResponse, artistId, postId, promotion_enabled }) => {
  if (!alertResponse) return
  return server.togglePromotionEnabled(artistId, postId, !promotion_enabled)
}


const ResultsToggle = ({
  active,
  id,
  promotion_enabled,
  togglePost,
}) => {
  // Import artist context
  const { artistId } = React.useContext(ArtistContext)
  // Handle alert
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)
  const [alertResponse, setAlertResponse] = React.useState(false)
  const resetAlert = () => {
    setAlert({ type: 'reset-alert' })
    setAlertResponse(false)
  }
  const acceptAlert = () => {
    setAlert({ type: 'set-positive-response' })
    setAlertResponse(true)
  }

  const showAlert = () => {
    const alertCopy = copy.resultToggleWarning(promotion_enabled)
    setAlert({
      type: 'show-alert',
      payload: {
        contents: <MarkdownText markdown={alertCopy} />,
      },
    })
  }

  // Run this to fetch posts when the artist changes
  const { isPending } = useAsync({
    promiseFn: setToggleState,
    watch: alertResponse,
    // The variable(s) to pass to promiseFn
    alertResponse,
    artistId,
    postId: id,
    promotion_enabled,
    // When promise resolves
    onResolve: (post) => {
      if (!post) return
      const type = active ? 'active' : 'archived'
      const { promotion_enabled } = post
      togglePost({ type, id, promotion_enabled })
      // Track
      const actionType = promotion_enabled ? 'back on' : 'off'
      track({
        category: 'Results Page',
        action: `Turn ad ${actionType}`,
        description: `Post ID: ${id}`,
        label: `artistId: ${artistId}`,
      })
    },
  })

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
              isPending
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
  togglePost: PropTypes.func.isRequired,
}

ResultsToggle.defaultProps = {
  active: false,
  promotion_enabled: false,
}

export default ResultsToggle
