import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'

const PostLinksSelect = ({ linkOptions, selectClassName }) => {
  console.log('linkOptions', linkOptions)
  // CONVERT LINK OPTIONS TO FIT SELECT
  const selectOptions = React.useMemo(() => {
    return linkOptions.reduce((options, { type, links, name, id }) => {
      // Add folder as option group
      if (type === 'folder') {
        const groupLinks = links.map(({ name, id }) => {
          return { name, value: id }
        })
        const optionGroup = {
          type: 'group',
          name,
          options: groupLinks,
        }
        return [...options, optionGroup]
      }
      // Add link as option
      const option = { name, value: id }
      return [...options, option]
    }, [])
  }, [linkOptions])
  console.log('selectOptions', selectOptions)
  return (
    <div>
      <Select
        className={selectClassName}
        handleChange={() => {}}
        name="Choose link"
        options={selectOptions}
        selectedValue={''}
        version="box"
      />
    </div>
  )
}

PostLinksSelect.propTypes = {
  linkOptions: PropTypes.array.isRequired,
  selectClassName: PropTypes.string,
}

PostLinksSelect.defaultProps = {
  selectClassName: null,
}


export default PostLinksSelect
