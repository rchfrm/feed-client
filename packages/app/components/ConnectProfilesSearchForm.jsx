import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import Input from '@/elements/Input'
import { getFacebookPage } from '@/app/helpers/facebookHelpers'
import { processArtists } from '@/app/helpers/artistHelpers'

const ConnectProfilesSearchForm = ({
  setArtistAccount,
  setErrors,
}) => {
  const [facebookPageId, setFacebookPageId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)

    const { res, error } = await getFacebookPage(facebookPageId)

    if (error) {
      setErrors([error])
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setErrors([])

    const processedArtists = processArtists({ artists: { [res.page_id]: { ...res } } })
    setArtistAccount(processedArtists[0])
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-column xxs:flex-row">
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
        trackComponentName="ConnectProfilesSearchForm"
        className="w-full xxs:w-32 xxs:ml-4 mb-6"
      >
        Search
      </Button>
    </form>
  )
}

ConnectProfilesSearchForm.propTypes = {
  setArtistAccount: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
}

export default ConnectProfilesSearchForm
