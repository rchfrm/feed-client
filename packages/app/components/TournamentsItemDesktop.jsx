import React from 'react'
import PropTypes from 'prop-types'

import TournamentsItemTitles from '@/app/TournamentsItemTitles'
import TournamentsItemImages from '@/app/TournamentsItemImages'

import { getDataArray } from '@/helpers/utils'
import { metricsToDisplay } from '@/helpers/tournamentHelpers'
import { metricTooltips } from '@/app/copy/tournamentsCopy'

import styles from '@/app/Tournaments.module.css'

const TournamentsItemDesktop = ({ adA, adB, isAdPair }) => {
  // const { postLink, thumbnailOptions, message, score, streak } = adPost
  const { data: dataA } = adA
  const { data: dataB } = adB
  const details = React.useMemo(() => {
    const detailsA = getDataArray(metricsToDisplay, dataA)
    const detailsB = dataB ? getDataArray(metricsToDisplay, dataB) : []
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

  const rowClass = 'flex flex-col'
  return (
    <div className="flex" data-name="TournamentsItemDesktop">
      {/* TITLES */}
      <TournamentsItemTitles
        linkA={adA.postLink}
        linkB={adB.postLink}
        isAdPair={isAdPair}
        className={rowClass}
      />
      {/* IMAGES */}
      <TournamentsItemImages
        thumbnailOptionsA={adA.thumbnailOptions}
        thumbnailOptionsB={adB.thumbnailOptions}
        isAdPair={isAdPair}
        className={rowClass}
      />
      {/* DATA */}
      <ul className={['flex justify-between mb-0 text-center pl-10'].join(' ')}>
        {details.map(([dataType, { a, b }]) => {
          const { value: valueA } = a
          const { value: valueB } = b
          return (
            <li key={dataType} className={['flex flex-col w-24'].join(' ')}>
              <p className="flex items-center h-24 mb-0">{valueA}</p>
              {dataB && <p className="flex items-center h-24 mt-10 mb-0">{valueB}</p>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

TournamentsItemDesktop.propTypes = {
  adA: PropTypes.object.isRequired,
  adB: PropTypes.object,
  isAdPair: PropTypes.bool.isRequired,
}

TournamentsItemDesktop.defaultProps = {
  adB: {},
}


export default TournamentsItemDesktop
