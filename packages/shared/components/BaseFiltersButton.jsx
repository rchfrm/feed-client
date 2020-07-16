import React from 'react'
import PropTypes from 'prop-types'

import ButtonPill from '@/elements/ButtonPill'
import styles from '@/BaseFilters.module.css'

import brandColors from '@/constants/brandColors'

const BaseFiltersButton = ({
  id,
  buttonRef,
  title,
  subtitle,
  setActiveOptionId,
  buttonType,
  backgroundColor,
  textColor,
  icon,
  className,
}) => {
  // TEXT BUTTON
  if (buttonType === 'text') {
    return (
      <div
        ref={buttonRef}
        className={[styles.buttonContainer, styles.buttonText_container, className].join(' ')}
      >
        <a
          role="button"
          className={[styles.button, styles.textButton].join(' ')}
          onClick={() => setActiveOptionId(id)}
        >
          <span className={styles.buttonText_title}>{title}</span>
          {subtitle && (
            <>
              <br />
              <span className={['small--p'].join(' ')}>{subtitle}</span>
            </>
          )}
        </a>
      </div>
    )
  }
  // PILL BUTTON
  return (
    <div
      ref={buttonRef}
      className={[styles.buttonContainer, styles.buttonPill_container, className].join(' ')}
    >
      <ButtonPill
        className={[styles.button, styles.buttonPill, className].join(' ')}
        size="large"
        onClick={() => setActiveOptionId(id)}
        style={{
          backgroundColor,
          color: textColor,
        }}
        hasIcon
      >
        {icon}
        {title}
      </ButtonPill>
    </div>
  )
}

BaseFiltersButton.propTypes = {
  id: PropTypes.string.isRequired,
  buttonRef: PropTypes.object,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  setActiveOptionId: PropTypes.func.isRequired,
  buttonType: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string,
}

BaseFiltersButton.defaultProps = {
  buttonRef: null,
  subtitle: '',
  buttonType: 'pill',
  backgroundColor: brandColors.grey,
  textColor: brandColors.textColor,
  icon: null,
  className: '',
}


export default BaseFiltersButton
