import React from 'react'
import PropTypes from 'prop-types'
import ConnectProfilesSearchForm from '@/app/elements/connectProfiles/ConnectProfilesSearchForm'
import ConnectProfilesItem from '@/app/elements/connectProfiles/ConnectProfilesItem'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesSearch = ({
  setSelectedProfile,
  setIsConnecting,
  setErrors,
  className,
}) => {
  const [artistAccount, setArtistAccount] = React.useState(null)

  return (
    <div className={[className, 'mb-12'].join(' ')}>
      <h3 className="font-bold">Search for Facebook Page</h3>
      <MarkdownText markdown={copy.requestTooLarge} className="mb-6" />
      <ConnectProfilesSearchForm
        setArtistAccount={setArtistAccount}
        setErrors={setErrors}
      />
      {artistAccount && (
        <ul className="xs:pl-16">
          <ConnectProfilesItem
            profile={artistAccount}
            setNewArtistName={setNewArtistName}
            setSelectedProfile={setSelectedProfile}
            setIsConnecting={setIsConnecting}
            isConnected={false}
            setErrors={setErrors}
          />
        </ul>
      )}
    </div>
  )
}

ConnectProfilesSearch.propTypes = {
  setSelectedProfile: PropTypes.func.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesSearch.defaultProps = {
  className: null,
}

export default ConnectProfilesSearch
