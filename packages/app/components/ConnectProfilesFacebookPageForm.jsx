import React from 'react'
import PropTypes from 'prop-types'
import ConnectProfilesItem from '@/app/ConnectProfilesItem'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import MarkdownText from '@/elements/MarkdownText'
import { getFacebookPage } from '@/app/helpers/facebookHelpers'
import { processArtists } from '@/app/helpers/artistHelpers'
import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesFacebookPageForm = ({
  setSelectedProfile,
  setIsConnecting,
  setErrors,
}) => {
  const [facebookPageId, setFacebookPageId] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [artistAccount, setArtistAccount] = React.useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)

    const { res, error } = await getFacebookPage(facebookPageId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setError(null)

    const processedArtists = processArtists({ artists: { [res.id]: { ...res, page_id: res.id } } })
    setArtistAccount(processedArtists[0])
  }

  return (
    <form onSubmit={onSubmit} className="mb-12">
      <Error error={error} />
      <MarkdownText markdown={copy.requestTooLarge} />
      <div className="flex flex-column xxs:flex-row">
        <Input
          name="fb-page-id"
          type="text"
          value={facebookPageId}
          updateValue={setFacebookPageId}
          placeholder="Facebook Page ID"
          className="mb-4 xxs:mb-0 xxs:flex-1"
          required
        />
        <Button
          version="black"
          disabled={!facebookPageId}
          onClick={onSubmit}
          loading={isLoading}
          trackComponentName="ConnectProfilesPageForm"
          className="w-full xxs:w-32 xxs:ml-4 mb-6"
        >
          Search
        </Button>
      </div>
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
    </form>
  )
}

ConnectProfilesFacebookPageForm.propTypes = {
  setSelectedProfile: PropTypes.func.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
}

export default ConnectProfilesFacebookPageForm
