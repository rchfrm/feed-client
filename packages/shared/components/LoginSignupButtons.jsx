import React from 'react'
import PropTypes from 'prop-types'
import ButtonNew from '@/elements/ButtonNew'
import EmailIcon from '@/icons/EmailIcon'
import ButtonFacebook from '@/elements/ButtonFacebook'
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
        className="w-full mb-8"
        onClick={onFacebookClick}
        fallbackCta={`${buttonPrefix} Facebook`}
        trackComponentName="LoginSignupButtons"
      >
        {buttonPrefix} Facebook
      </ButtonFacebook>
      {! isFacebookLogin && (
        <ButtonNew
          onClick={onEmailClick}
          className="relative w-full"
          trackComponentName="LoginSignupButtons"
        >
          <EmailIcon className="absolute top-50 left-4" />
          {buttonPrefix} email
        </ButtonNew>
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
