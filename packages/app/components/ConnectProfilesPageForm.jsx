import React from 'react'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Input from '@/elements/Input'
import { getFacebookPage } from '@/app/helpers/facebookHelpers'

const ConnectProfilesPageForm = () => {
  const [facebookPageId, setFacebookPageId] = React.useState('')
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

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
    console.log(res)
  }

  return (
    <form onSubmit={onSubmit} className="mt-12">
      <Error error={error} />
      <Input
        name="fb-page-id"
        type="text"
        value={facebookPageId}
        updateValue={setFacebookPageId}
        placeholder="Facebook Page ID"
        required
      />
      <Button
        version="black"
        disabled={!facebookPageId}
        onClick={onSubmit}
        loading={isLoading}
        trackComponentName="ConnectProfilesPageForm"
        className="w-full"
      >
        Search
      </Button>
    </form>
  )
}

ConnectProfilesPageForm.propTypes = {
}

ConnectProfilesPageForm.defaultProps = {
}

export default ConnectProfilesPageForm
