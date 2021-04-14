import React from 'react'
import PropTypes from 'prop-types'

import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { testForMissingPages } from '@/app/helpers/integrationErrorsHelpers'

import MarkdownText from '@/elements/MarkdownText'
import ButtonFacebook from '@/elements/ButtonFacebook'

import copy from '@/app/copy/integrationErrorsCopy'


const MissingScopesMessage = ({ scopes, showButton, className }) => {
  const classes = ['missing--scopes', className].join(' ')
  // Does the missing permission list only involve access to pages?
  const hasOnlyMissingPages = testForMissingPages(scopes)
  // Get copy
  const markdown = copy.missing_permission_scope(scopes, hasOnlyMissingPages)

  const reauthFb = () => {
    firebaseHelpers.reauthFacebook(scopes)
  }

  return (
    <div className={classes}>
      <MarkdownText markdown={markdown} />
      {showButton && (
        <ButtonFacebook
          onClick={reauthFb}
          fallbackCta="Continue with Facebook"
        >
          Continue with Facebook
        </ButtonFacebook>
      )}
    </div>
  )
}

MissingScopesMessage.propTypes = {
  scopes: PropTypes.array.isRequired,
  className: PropTypes.string,
  showButton: PropTypes.bool,
}

MissingScopesMessage.defaultProps = {
  className: '',
  showButton: true,
}


export default MissingScopesMessage
