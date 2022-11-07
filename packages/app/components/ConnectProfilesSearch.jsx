import React from 'react'
import PropTypes from 'prop-types'
import ConnectProfilesSearchForm from '@/app/ConnectProfilesSearchForm'
import ConnectProfilesItem from '@/app/ConnectProfilesItem'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesSearch = ({
  setSelectedProfile,
  setIsConnecting,
  setErrors,
}) => {
  const [artistAccount, setArtistAccount] = React.useState(null)

  return (
    <div className="mb-12">
      <h3 className="font-bold">Search Facebook Page</h3>
      <MarkdownText markdown={copy.requestTooLarge} />
      <ConnectProfilesSearchForm
        setArtistAccount={setArtistAccount}
        setErrors={setErrors}
      />
      {artistAccount && (
        <ul className="xs:pl-16">
          <ConnectProfilesItem
            profile={artistAccount}
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
}

export default ConnectProfilesSearch
