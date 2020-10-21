import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useOpenIntegrationsPanel from '@/app/hooks/useOpenIntegrationsPanel'

import styles from '@/BaseFilters.module.css'

const ShowInsightsButton = ({
  text,
  className,
}) => {
  const openIntegrationsPanel = useOpenIntegrationsPanel({})
  return (
    <div
      className={[className].join(' ')}
    >
      <Button
        className={[styles.button, styles.buttonPill].join(' ')}
        version="small black"
        onClick={openIntegrationsPanel}
      >
        {text}
      </Button>
    </div>
  )
}

ShowInsightsButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ShowInsightsButton.defaultProps = {
  className: null,
}


export default ShowInsightsButton
