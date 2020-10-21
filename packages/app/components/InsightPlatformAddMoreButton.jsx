import React from 'react'

import ButtonPill from '@/elements/ButtonPill'

import useOpenIntegrationsPanel from '@/app/hooks/useOpenIntegrationsPanel'

import brandColors from '@/constants/brandColors'
import styles from '@/BaseFilters.module.css'

const InsightPlatformAddMoreButton = ({}) => {
  const openIntegrationsPanel = useOpenIntegrationsPanel({})
  return (
    <div
      className={[styles.buttonContainer, styles.buttonPill_container].join(' ')}
    >
      <ButtonPill
        className={[styles.button, styles.buttonPill].join(' ')}
        size="large"
        onClick={openIntegrationsPanel}
        style={{
          backgroundColor: brandColors.bgColor,
          color: brandColors.textColor,
          border: '2px solid transparent',
          paddingLeft: '0.5rem',
        }}
      >
        <strong>+ Add more</strong>
      </ButtonPill>
    </div>
  )
}

InsightPlatformAddMoreButton.propTypes = {
}

export default InsightPlatformAddMoreButton
