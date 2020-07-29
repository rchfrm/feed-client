import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import moment from 'moment'

import DataDetail from '@/admin/elements/DataDetail'

const getDetailsArray = (propsToDisplay, data) => {
  const dateKeys = ['created_at', 'updated_at', 'start_time', 'stop_time']
  return propsToDisplay.reduce((arr, detailName) => {
    const detailKeys = detailName.split('.')
    const rawValue = get(data, detailKeys, '')
    const name = detailKeys[detailKeys.length - 1].replace(/_/g, ' ')
    if (!rawValue && name !== 'daily budget') return arr
    // Convert dates (if necessary)
    const isDate = dateKeys.includes(detailName)
    const value = isDate ? moment(rawValue).format('DD MMM YYYY') : rawValue.toString()
    const detail = {
      name,
      value,
      key: detailName,
    }
    return [...arr, detail]
  }, [])
}

const DataDetails = ({ propsToDisplay, data, border, header, className }) => {
  const details = React.useMemo(() => {
    return getDetailsArray(propsToDisplay, data)
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
