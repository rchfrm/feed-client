import React from 'react'

import brandColors from '@/constants/brandColors'

import ButtonPill from '@/elements/ButtonPill'

import styles from '@/BaseFilters.module.css'

const InsightPlatformAddMoreButton = ({}) => {
  return (
    <div
      className={[styles.buttonContainer, styles.buttonPill_container].join(' ')}
    >
      <ButtonPill
        className={[styles.button, styles.buttonPill].join(' ')}
        size="large"
        onClick={() => {}}
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
