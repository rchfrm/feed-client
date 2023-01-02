import React from 'react'
import PropTypes from 'prop-types'
import Input from '@/elements/Input'
import SearchIcon from '@/icons/SearchIcon'

const ProfilesListSearch = ({ value, setValue }) => {
  const handleChange = ({ target }) => {
    const { value } = target
    setValue(value)
  }

  return (
    <div className="relative px-2">
      <Input
        type="text"
        name="profile"
        version="box-small"
        placeholder="Search"
        value={value}
        handleChange={handleChange}
        className="mb-0 bg-white rounded-[10px]"
        hasIcon
      />
      <SearchIcon className="absolute top-2 right-4 w-5 h-5" />
    </div>
  )
}

ProfilesListSearch.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default ProfilesListSearch
