import React from 'react'

import Button from '@/elements/Button'

import useOpenIntegrationsPanel from '@/app/hooks/useOpenIntegrationsPanel'

import styles from '@/BaseFilters.module.css'

const InsightPlatformAddMoreButton = ({}) => {
  const openIntegrationsPanel = useOpenIntegrationsPanel({})
  return (
    <div
      className={[styles.buttonContainer, styles.buttonPill_container].join(' ')}
    >
      <Button
        className={[styles.button, styles.buttonPill].join(' ')}
        version="small black"
        onClick={openIntegrationsPanel}
      >
        <strong>+ Add more</strong>
      </Button>
    </div>
  )
}

InsightPlatformAddMoreButton.propTypes = {
}

export default InsightPlatformAddMoreButton
