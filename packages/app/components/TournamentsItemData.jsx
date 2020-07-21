import React from 'react'
import PropTypes from 'prop-types'

import TooltipButton from '@/elements/TooltipButton'

import { getDataArray } from '@/helpers/utils'
import { metricTooltips } from '@/app/copy/tournamentsCopy'

import styles from '@/app/Tournaments.module.css'

const propsToDisplay = [
  'score',
  'spend',
  'impressions',
  'streak',
  'reach',
  'shares',
  'likes',
  'views',
  'normalized_es',
  'subtype',
]

const TournamentsItemData = ({ dataA, dataB, className }) => {
  const details = React.useMemo(() => {
    const detailsA = getDataArray(propsToDisplay, dataA)
    const detailsB = dataB ? getDataArray(propsToDisplay, dataB) : []
    const detailsObj = detailsA.reduce((data, detailA) => {
      const { name: nameA, value: valueA, key: keyA } = detailA
      // Get matching data from source B (with fallbacks)
      const detailB = detailsB.find(({ key }) => keyA === key) || {}
      const { name: nameB = nameA, value: valueB = '-' } = detailB
      // Set values for data type
      data[keyA] = {
        a: { name: nameA, value: valueA, key: keyA },
        b: { name: nameB, value: valueB, key: `${keyA}-b` },
      }
      // return completed object
      return data
    }, {})
    return Object.entries(detailsObj)
  }, [dataA, dataB])
  return (
    <table className={['text-left', 'mb-0', styles.dataTable, className].join(' ')}>
      {dataB && (
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
      )}
      <tbody>
        {details.map(([dataType, { a, b }]) => {
          const tooltip = metricTooltips[dataType]
          return (
            <tr key={dataType}>
              <td className="flex pr-5 items-center">
                {a.name}
                {tooltip && (
                  <TooltipButton copy={tooltip} direction="right" buttonClasses={styles.infoTooltip} />
                )}
              </td>
              <td>{a.value}</td>
              {dataB && <td>{b.value}</td>}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

TournamentsItemData.propTypes = {
  dataA: PropTypes.object.isRequired,
  dataB: PropTypes.object,
  className: PropTypes.string,
}

TournamentsItemData.defaultProps = {
  dataB: null,
  className: '',
}


export default TournamentsItemData
