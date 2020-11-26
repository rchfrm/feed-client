import React from 'react'
// import PropTypes from 'prop-types'

import Input from '@/elements/Input'
import Button from '@/elements/Button'


import styles from '@/LoginPage.module.css'

const SignupAddReferralCode = ({}) => {
  const [code, setCode] = React.useState('')
  return (
    <div className={styles.container}>
      <h2 className="h3">Sign up here with your referral code</h2>
      <form
        onSubmit={(e) => {
          if (!code) return
          e.preventDefault()
        }}
      >
        <Input
          updateValue={setCode}
          name="referral-code"
          label="Referral code"
          value={code}
          autoFocus
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!code}
          >
            Sign up here
          </Button>
        </div>
      </form>
    </div>
  )
}

SignupAddReferralCode.propTypes = {

}

export default SignupAddReferralCode
