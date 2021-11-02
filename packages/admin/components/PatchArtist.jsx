import React from 'react'
import PropTypes from 'prop-types'

import Error from '@/elements/Error'
import Select from '@/elements/Select'
import Input from '@/elements/Input'
import Button from '@/elements/Button'

import * as server from '@/admin/helpers/adminServer'

const patchOptions = [
  {
    name: 'Instagram Business ID',
    value: 'insta_business_id',
    serverFunction: 'patchArtistBusinessId',
  },
]

const PatchArtist = ({ artistId, artistName, integrations }) => {
  // HANDLE SELECT
  const [patchOption, setPatchOption] = React.useState(patchOptions[0])
  const handleSelect = React.useCallback((e) => {
    const patchOption = patchOptions.find(({ value }) => value === e.target.value)
    setPatchOption(patchOption)
  }, [])

  // HANDLE INPUT
  const [inputValue, setInputValue] = React.useState('')

  // HANDLE FORM
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const onSubmit = React.useCallback(async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { serverFunction } = patchOption
    // eslint-disable-next-line import/namespace
    const { error = null } = await server[serverFunction](artistId, inputValue)
    setIsLoading(false)
    setError(error)
  }, [patchOption, inputValue, artistId])

  // STOP HERE IF ALREADY HAS INTEGRATIONS
  if (integrations.facebook && integrations.facebook.instagram_id) return null

  return (
    <div className={['pt-5'].join(' ')}>
      <h4><strong>Patch {artistName}</strong></h4>
      <form onSubmit={onSubmit}>
        <Select
          handleChange={handleSelect}
          name="patchArtist"
          label="Patch what?"
          selectedValue={patchOption.value}
          options={patchOptions}
        />
        <Input
          updateValue={setInputValue}
          value={inputValue}
          label={patchOption.name}
          name={patchOption.value}
        />
        <Error error={error} />
        <Button
          type="submit"
          loading={isLoading}
          disabled={!inputValue}
          trackComponentName="PatchArtist"
        >
          Update
        </Button>
      </form>
    </div>
  )
}

PatchArtist.propTypes = {
  artistId: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  integrations: PropTypes.object,
}

PatchArtist.defaultProps = {
  integrations: {},
}


export default PatchArtist
