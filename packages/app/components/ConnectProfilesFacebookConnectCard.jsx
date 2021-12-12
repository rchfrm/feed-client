import React from 'react'
import PropTypes from 'prop-types'

import ConnectFacebookButton from '@/app/ConnectFacebookButton'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesFacebookConnectCard = ({
  errors,
  setErrors,
  className,
}) => {
  return (
    <li className={[
      className,
    ].join(' ')}
    >
      <MarkdownText className="text-lg font-bold" markdown={copy.connectCardTitle} />
      <MarkdownText markdown={copy.connectCardDescription} />
      <ConnectFacebookButton
        errors={errors}
        setErrors={setErrors}
        buttonText="Connect more"
        trackComponentName="ConnectProfilesFacebookConnectCard"
        className="w-full xs:w-1/2"
      />
    </li>
  )
}

ConnectProfilesFacebookConnectCard.propTypes = {
  errors: PropTypes.array,
  setErrors: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesFacebookConnectCard.defaultProps = {
  errors: [],
  className: null,
}

export default ConnectProfilesFacebookConnectCard
