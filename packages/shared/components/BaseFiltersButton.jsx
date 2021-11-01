import React from 'react'
import PropTypes from 'prop-types'

import ButtonPill from '@/elements/ButtonPill'
import styles from '@/BaseFilters.module.css'

import brandColors from '@/constants/brandColors'

const BaseFiltersButton = ({
  buttonRef,
  title,
  subtitle,
  buttonType,
  backgroundColor,
  textColor,
  icon,
  active,
  onClick,
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
          onClick={onClick}
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
        onClick={onClick}
        style={{
          backgroundColor,
          color: textColor,
          ...active && { border: `2px solid ${backgroundColor}` },
        }}
        hasIcon
        active={active}
        trackComponentName="BaseFiltersButton"
      >
        {icon}
        {title}
      </ButtonPill>
    </div>
  )
}

BaseFiltersButton.propTypes = {
  buttonRef: PropTypes.object,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  buttonType: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  icon: PropTypes.node,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}

BaseFiltersButton.defaultProps = {
  buttonRef: null,
  subtitle: '',
  buttonType: 'pill',
  backgroundColor: brandColors.grey,
  textColor: brandColors.textColor,
  icon: null,
  active: false,
  className: '',
}


export default BaseFiltersButton
