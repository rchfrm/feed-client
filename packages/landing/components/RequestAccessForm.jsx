import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'

import Input from '@/landing/elements/Input'
import TextArea from '@/landing/elements/TextArea'
import ButtonApp from '@/landing/elements/ButtonApp'
import CheckboxInput from '@/landing/elements/CheckboxInput'

import { track } from '@/landing/helpers/trackingHelpers'
import { testValidUrl, testValidEmail, getIntegrationRegex } from '@/landing/helpers/utils'

const formElements = [
  {
    id: 'mce-EMAIL',
    name: 'EMAIL',
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
    id: 'MMERGE12',
    label: 'Facebook page',
    required: false,
    errorMessage: 'Please include a Facebook page',
    prefix: 'facebook.com/',
    regexReplace: getIntegrationRegex('facebook', true),
  },
  {
    id: 'MMERGE13',
    label: 'Instagram profile',
    prefix: 'instagram.com/',
    regexReplace: getIntegrationRegex('instagram', true),
  },
  {
    id: 'MMERGE14',
    label: 'Link to your work',
    placeholder: 'https://',
    type: 'url',
    required: false,
    errorMessage: 'Please include a valid link',
  },
  {
    id: 'MMERGE11',
    label: 'What do you want to use Feed for?',
    placeholder: 'eg. ticket sales, Spotify & Instagram followers, product sales',
    useTextarea: true,
  },
]

const testValidInput = (type, value) => {
  if (!type) return !!value
  if (type === 'url') return testValidUrl(value, true)
  if (type === 'email') return testValidEmail(value)
}

const RequestAccessForm = ({ className, emailOnly }) => {
  const [values, setValues] = React.useState({})
  const [isFormValid, setIsFormValid] = React.useState(false)
  const [acceptGDPR, setAcceptGDPR] = React.useState(emailOnly)

  const filteredFormElements = emailOnly ? formElements.filter(el => el.id === 'mce-EMAIL') : formElements

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
      target="_blank"
      noValidate
      className={[
        'relative',
        className,
        emailOnly && 'grid', 'grid-cols-12', 'xs:gap-4', 'lg:z-10',
      ].join(' ')}
      onSubmit={(e) => {
        e.preventDefault()
        // Stop here if form not valid
        if (!isFormValid) return
        // TRACK
        track({
          action: 'join_waiting_list',
          category: 'sign_up',
        })
        // Submit form
        e.target.submit()
        // Clear values (after delay)
        setTimeout(() => {
          setValues({})
        }, 300)
      }}
    >
      {/* HIDDEN To add them to the 'Waiting List' group */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000em',
        }}
      >
        <input type="text" name="MERGE3" id="MERGE3" value="Join Queue" readOnly />
        <input
          type="checkbox"
          id="group_64"
          name="group[6082][64]"
          value="1"
          tabIndex="-1"
          className="av-checkbox"
          checked
          readOnly
        />
      </div>

      {filteredFormElements.map((element, index) => {
        const {
          id,
          name,
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
          useTextarea,
        } = element
        if (hidden) return
        const { value, valid, error } = values[id] || {}
        const El = useTextarea ? TextArea : Input
        return (
          <El
            key={id}
            type={type}
            autoFocus={index === 0}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            className={[
              emailOnly && 'col-span-12', 'xs:col-span-8', 'sm:col-span-8', 'lg:col-span-5',
            ].join(' ')}
            name={name || id}
            id={id}
            value={value}
            label={!emailOnly ? label : ''}
            prefix={prefix}
            regexReplace={regexReplace}
            placeholder={emailOnly ? 'Enter your email' : placeholder}
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
      {!emailOnly && (
        <fieldset className="mb-4">
          <CheckboxInput
            label="GDPR"
            buttonLabel="Tick the box to confirm you're happy to receive emails from us."
            value="Y"
            id="gdpr_9737"
            name="gdpr[9737]"
            checked={acceptGDPR}
            onChange={() => {
              setAcceptGDPR(!acceptGDPR)
            }}
          />
        </fieldset>
      )}

      {/* HONEYPOT Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
      <div style={{ position: 'absolute', left: '-10000em' }} aria-hidden="true">
        <input type="text" name="b_9169a3b18daa59e77067e959e_58bf5eac4b" tabIndex="-1" defaultValue="" />
      </div>

      {/* SUBMIT BUTTON */}
      <div className={[
        // 'sm:flex',
        // 'justify-end',
        emailOnly && 'col-span-12', 'xs:col-span-4', 'sm:col-span-4', 'lg:col-span-3',
      ].join(' ')}
      >
        <ButtonApp
          type="submit"
          className={[
            'w-full',
            'h-16',
            'text-xl',
          ].join(' ')}
          version="pink"
          disabled={!isFormValid}
        >
          Submit
        </ButtonApp>
      </div>
    </form>
  )
}

RequestAccessForm.propTypes = {
  className: PropTypes.string,
}

RequestAccessForm.defaultProps = {
  className: null,
}


export default RequestAccessForm
