import React from 'react'
import PropTypes from 'prop-types'
import CheckboxInput from '@/landing/elements/CheckboxInput'
import Button from '@/elements/Button'
import copy from '@/landing/copy/LandingPageCopy'
import track from '@/landing/helpers/trackingHelpers'
import MarkdownText from '@/elements/MarkdownText'

const { mailchimp: mailchimpCopy } = copy

const getGroupNumber = (trackLocation) => {
  // 1 is "General news and updates"
  // 2 is "Marketing tips"
  // 4 is "Investing in Feed"
  if (trackLocation === 'feed-landing') return 1
  if (trackLocation === 'feed-blog') return 2
  return 4
}

const MailchimpForm = ({
  inputClass,
  checkboxClass,
  disclaimerClass,
  ctaText,
  trackLocation,
}) => {
  const [email, setEmail] = React.useState('')
  const [emailCheckbox, setEmailCheckbox] = React.useState(false)
  const [acceptGDPR, setAcceptGDPR] = React.useState(false)
  const groupNumber = getGroupNumber(trackLocation)

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'EMAIL':
        setEmail(e.target.value)
        break
      case 'gdpr[9737]':
        setEmailCheckbox(! emailCheckbox)
        break
      default:
        break
    }
  }

  return (
    // Begin Mailchimp sign-up Form
    <div id="mc_embed_signup">
      <form
        action="https://ltd.us20.list-manage.com/subscribe/post?u=9169a3b18daa59e77067e959e&amp;id=58bf5eac4b"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
        onSubmit={() => {
          track({
            action: 'join_newsletter',
            category: 'newsletter',
            location: trackLocation,
          })
        }}
      >
        <div id="mc_embed_signup_scroll">
          <div className="mc-field-group">
            <input type="email" value={email} name="EMAIL" onChange={handleChange} className={['required', 'email', inputClass].join(' ')} placeholder={mailchimpCopy.placeholder} id="mce-EMAIL" />
            <div className="hidden">
              <input type="text" name="MERGE3" id="MERGE3" size="25" value={trackLocation} readOnly />
              <input type="checkbox" id={`group_${groupNumber}`} name={`group[5642][${groupNumber}]`} value="1" className="av-checkbox" checked readOnly />
            </div>
          </div>
          <div id="mergeRow-gdpr" className="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group">
            <div className={['content__gdpr', checkboxClass].join(' ')}>
              {/* GDPR */}
              <fieldset name="interestgroup_field">
                <CheckboxInput
                  buttonLabel="Yes, sign me up."
                  className="text-xs"
                  value="Y"
                  id="gdpr_9737"
                  name="gdpr[9737]"
                  checked={acceptGDPR}
                  onChange={() => {
                    setAcceptGDPR(! acceptGDPR)
                  }}
                />
              </fieldset>
            </div>
          </div>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{ display: 'none' }} />
            <div className="response" id="mce-success-response" style={{ display: 'none' }} />
          </div>
          {/* Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true"><input type="text" name="b_9169a3b18daa59e77067e959e_58bf5eac4b" tabIndex="-1" value="" readOnly /></div>
          <Button
            type="submit"
            className="w-40 mx-auto text-offwhite text-lg"
            id="mc-embedded-subscribe"
            trackComponentName="MailchimpForm"
          >
            {ctaText}
          </Button>
          <div className={['small--p', disclaimerClass].join(' ')}>
            <MarkdownText markdown={mailchimpCopy.unsubscribe} />
            <MarkdownText markdown={mailchimpCopy.privacy} />
          </div>
        </div>
      </form>
    </div>
  // End mc_embed_signup
  )
}

export default MailchimpForm

MailchimpForm.propTypes = {
  ctaText: PropTypes.string,
  trackLocation: PropTypes.string,
}

MailchimpForm.defaultProps = {
  ctaText: 'Sign up',
  trackLocation: 'feed-landing',
}
