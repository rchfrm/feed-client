import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import Input from '@/elements/Input'
import Button from '@/elements/Button'
import CheckboxInput from '@/elements/CheckboxInput'


import { testValidUrl, testValidEmail } from '@/helpers/utils'
import { getIntegrationRegex } from '@/app/helpers/integrationHelpers'

const formElements = [
  {
    id: 'MERGE0',
    label: 'Email',
    type: 'email',
    autoCapitalize: 'off',
    autoCorrect: 'off',
    required: true,
    errorMessage: 'Please enter a valid email',
  },
  {
    id: 'MERGE1',
    label: 'Name',
    required: false,
    hidden: true,
  },
  {
    id: 'MERGE2',
    label: 'Surname',
    hidden: true,
  },
  {
    id: 'MMERGE8',
    label: 'Facebook page',
    required: true,
    errorMessage: 'Please inlcude a Facebook page',
    prefix: 'facebook.com/',
    regexReplace: getIntegrationRegex('facebook', true),
  },
  {
    id: 'MMERGE9',
    label: 'Instagram profile',
    prefix: 'instagram.com/',
    regexReplace: getIntegrationRegex('instagram', true),
  },
  {
    id: 'MMERGE10',
    label: 'Link to your work',
    placeholder: 'https://',
    type: 'url',
    required: true,
    errorMessage: 'Please inlcude a valid link',
  },
  {
    id: 'MMERGE11',
    label: 'What do you want to use Feed for?',
    placeholder: 'eg. ticket sales, Spotify & Instagram followers, product sales',
  },
]

const testValidInput = (type, value) => {
  if (!type) return !!value
  if (type === 'url') return testValidUrl(value, true)
  if (type === 'email') return testValidEmail(value)
}

const SignupQueueForm = ({ className }) => {
  const [values, setValues] = React.useState({})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [acceptGDPR, setAcceptGDPR] = React.useState(false)

  React.useEffect(() => {
    const hasEmptyRequired = formElements.some(({ required, id }) => {
      const { valid } = values[id] || {}
      if (required && !valid) return true
      return false
    })

    setIsFormValid(!hasEmptyRequired && acceptGDPR)
  }, [values, acceptGDPR])
  return (
    <form
      action="https://tryfeed.us20.list-manage.com/subscribe/post?u=9169a3b18daa59e77067e959e&amp;id=58bf5eac4b"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      noValidate
      className={[
        'relative',
        className,
      ].join(' ')}
    >
      {/* HIDDEN To add them to the 'Waiting List' group */}
      <input
        type="checkbox"
        id="group_64"
        name="group[6082][64]"
        value="1"
        className="av-checkbox"
        checked
        readOnly
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000em',
        }}
      />

      {formElements.map((element, index) => {
        const {
          id,
          type,
          label,
          prefix,
          regexReplace,
          placeholder,
          autoCapitalize,
          autoCorrect,
          hidden,
          required,
          errorMessage,
        } = element
        if (hidden) return
        const { value, valid, error } = values[id] || {}
        return (
          <Input
            key={id}
            type={type}
            autoFocus={index === 0}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            name={id}
            id={id}
            value={value}
            label={label}
            prefix={prefix}
            regexReplace={regexReplace}
            placeholder={placeholder}
            required={required}
            error={error}
            errorMessage={errorMessage}
            updateValue={(value) => {
              setValues((values) => {
                const valid = testValidInput(type, value)
                return produce(values, draftValues => {
                  draftValues[id] = {
                    value,
                    valid,
                    error: false,
                  }
                })
              })
            }}
            onBlur={() => {
              setValues((values) => {
                return produce(values, draftValues => {
                  if (!draftValues[id]) return
                  draftValues[id].error = !valid && required
                })
              })
            }}
          />
        )
      })}

      {/* GDPR */}
      <fieldset
        className="mb-4"
      >
        <CheckboxInput
          label="GDPR"
          buttonLabel="Tick the box to confirm you're happy to receive emails from us."
          value="Y"
          id="gdpr_9737"
          name="gdpr[9737]"
          checked={acceptGDPR}
          onChange={(e) => {
            setAcceptGDPR(!acceptGDPR)
            console.log('e', e)
          }}
        />
      </fieldset>
      {/* <input type="checkbox"  onChange={handleChange} value="Y" className="av-checkbox" checked={emailCheckbox} /> */}

      {/* HONEYPOT Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <input type="text" name="b_9169a3b18daa59e77067e959e_58bf5eac4b" tabIndex="-1" value="" readOnly />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={!isFormValid}
        >
          Join the queue
        </Button>
      </div>
    </form>
  )
}

SignupQueueForm.propTypes = {
  className: PropTypes.string,
}

SignupQueueForm.defaultProps = {
  className: null,
}


export default SignupQueueForm
