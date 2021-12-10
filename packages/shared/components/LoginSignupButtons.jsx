import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import EmailIcon from '@/icons/EmailIcon'
import ButtonFacebook from '@/elements/ButtonFacebook'

import brandColors from '@/constants/brandColors'

import styles from '@/LoginPage.module.css'

const LoginSignupButtons = ({
  type,
  isFacebookLogin,
  onFacebookClick,
  onEmailClick,
}) => {
  const buttonPrefix = type === 'login' ? 'Log in with' : 'Sign up with'
  return (
    <div className={styles.loginButtons}>
      <ButtonFacebook
        className={styles.facebookButton}
        onClick={onFacebookClick}
        fallbackCta={`${buttonPrefix} Facebook`}
        trackComponentName="LoginSignupButtons"
      >
        {buttonPrefix} Facebook
      </ButtonFacebook>
      {!isFacebookLogin && (
        <Button
          className={styles.emailButton}
          onClick={onEmailClick}
          version="black"
          icon={(
            <EmailIcon
              color={brandColors.bgColor}
              style={{ width: '1.75rem', height: 'auto' }}
            />
          )}
          trackComponentName="LoginSignupButtons"
        >
          {buttonPrefix} email
        </Button>
      )}
    </div>
  )
}

LoginSignupButtons.propTypes = {
  type: PropTypes.string.isRequired,
  isFacebookLogin: PropTypes.bool,
  onFacebookClick: PropTypes.func.isRequired,
  onEmailClick: PropTypes.func.isRequired,
}

LoginSignupButtons.defaultProps = {
  isFacebookLogin: false,
}

export default LoginSignupButtons
