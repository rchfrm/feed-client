import React from 'react'
import PropTypes from 'prop-types'
import Input from '@/elements/Input'

const ProfilesListSearch = ({ value, setValue }) => {
  const handleChange = ({ target }) => {
    const { value } = target
    setValue(value)
  }

  return (
    <div className="px-2">
      <Input
        type="text"
        name="profile"
        version="box-small"
        placeholder="Search"
        value={value}
        handleChange={handleChange}
        className="mb-0 bg-white"
      />
    </div>
  )
}

ProfilesListSearch.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default ProfilesListSearch
