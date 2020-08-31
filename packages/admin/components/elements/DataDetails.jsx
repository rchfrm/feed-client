import React from 'react'
import PropTypes from 'prop-types'

import DataDetail from '@/admin/elements/DataDetail'

import { getDataArray } from '@/helpers/utils'

const DataDetails = ({ propsToDisplay, data, border, header, className }) => {
  const details = React.useMemo(() => {
    return getDataArray(propsToDisplay, data)
  // eslint-disable-next-line
  }, [])

  return (
    <div className={className}>
      {border && <hr />}
      {header && <h4><strong>{header}</strong></h4>}
      {details.map(({ name, value, key }) => {
        return (
          <DataDetail key={key} name={name} value={value} />
        )
      })}
    </div>
  )
}

DataDetails.propTypes = {
  propsToDisplay: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  border: PropTypes.bool,
  header: PropTypes.string,
  className: PropTypes.string,
}

DataDetails.defaultProps = {
  border: false,
  header: '',
  className: '',
}

export default DataDetails
