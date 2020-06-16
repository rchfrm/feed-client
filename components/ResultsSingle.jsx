import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { ArtistContext } from '@/contexts/Artist'

import ResultsToggle from '@/ResultsToggle'
// IMPORT ELEMENTS
import ExternalMedia from '@/elements/ExternalMedia'
// IMPORT PAGES
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
// IMPORT STYLES
import resultsStyles from '@/Results.module.css'
import postStyles from '@/PostsPage.module.css'

const styles = {
  ...resultsStyles,
  ...postStyles,
}

function Insight({ days: daysArray, statement, number, currency }) {
  const days = daysArray.length
  const numberFormatted = statement === 'spent,'
    ? utils.formatCurrency(Number(number), currency)
    : utils.abbreviateNumber(number)
  if (days === 0) return null
  return (
    <div className={styles['result-insight']}>
      <div className={styles['insight-number']}>
        {numberFormatted}
      </div>
      <div className={styles['insight-statement']}>
        {statement}
      </div>
    </div>
  )
}

function Days({ days, active }) {
// REDEFINE PROPS AS VARIABLES
  const sortedDates = utils.sortDatesChronologically(days)
  // END REDEFINE PROPS AS VARIABLES

  const firstDate = moment(sortedDates[0], 'YYYY-MM-DD').startOf('day')
  const lastDate = moment(sortedDates[sortedDates.length - 1], 'YYYY-MM-DD').startOf('day')
  const numberOfDays = lastDate.diff(firstDate, 'days') + 1

  const phraseParts = (firstDate, lastDate) => {
    const obj = {
      a: undefined,
      b: undefined,
    }
    if (moment(firstDate).isSame(lastDate, 'month')) {
      obj.a = moment(firstDate).format('D')
      obj.b = moment(lastDate).format('D MMM')
    } else if (moment(firstDate).isSame(lastDate, 'year')) {
      obj.a = moment(firstDate).format('D MMM')
      obj.b = moment(lastDate).format('D MMM')
    } else {
      obj.a = moment(firstDate).format("D MMM 'YY")
      obj.b = moment(lastDate).format("D MMM 'YY")
    }

    if (active) {
      obj.a = moment(firstDate).format('D MMM')
      obj.b = moment(lastDate).format('D MMM')
    }

    return {
      a: <span className="strong">{obj.a}</span>,
      b: <span className="strong">{obj.b}</span>,
    }
  }

  if (!active) {
    const phrase = phraseParts(firstDate, lastDate)
    return (
      <p>
        from
        {' '}
        {phrase.a}
        {' '}
        to
        {' '}
        {phrase.b}
        ...
      </p>
    )
  }

  if (numberOfDays > 1) {
    const phrase = phraseParts(firstDate, moment())
    return (
      <p>
        Since
        {' '}
        <span className="strong">{phrase.a}</span>
        ...
      </p>
    )
  } if (numberOfDays === 1) {
    return (
      <p>In the last day, there has been...</p>
    )
  }
  return (
    <p>This post has just begun to be promoted, results will appear soon.</p>
  )
}

const ResultsSingle = ({
  active,
  id,
  promotion_enabled,
  togglePost,
  summary,
  className,
  media,
  thumbnailSrc,
  thumbnailSrcBackup,
}) => {
  const { artist } = React.useContext(ArtistContext)

  // GET MEDIA PROPS
  const mediaProps = React.useMemo(() => {
    const mediaSrc = utils.findPostMedia(media) || thumbnailSrc
    const title = ''
    return {
      mediaSrc,
      thumbnailSrc: thumbnailSrc || thumbnailSrcBackup || utils.findPostThumbnail(media),
      title,
    }
  }, [media, thumbnailSrc, thumbnailSrcBackup])

  const enabledClass = promotion_enabled ? 'enabled' : 'disabled'

  const {
    days,
    amountSpent,
    impressions,
    engagement,
    clicks,
    SAES,
  } = summary

  return (
    <li key={id} className={[styles.resultItem, styles[enabledClass], className].join(' ')}>

      <div className={styles.resultItem__inner}>

        <div className={styles['result-media']}>
          <ExternalMedia
            mediaSrc={mediaProps.mediaSrc}
            thumbnailSrc={mediaProps.thumbnailSrc}
            thumbnailSrcBackup={thumbnailSrcBackup}
            title={mediaProps.title}
          />
        </div>

        <div className={styles['result-insights']}>
          <Days days={days} active={active} />
          <Insight days={days} number={amountSpent} statement="spent," currency={artist.currency} />
          <Insight days={days} number={impressions} statement="people reached," />
          <Insight days={days} number={engagement} statement="engagements," />
          <Insight days={days} number={clicks} statement="clicks." />
        </div>

        <div className={styles['result-toggle-saes']}>
          <h2 className={styles.h2}>{SAES}</h2>
          <ResultsToggle
            active={active}
            id={id}
            promotion_enabled={promotion_enabled}
            togglePost={togglePost}
          />
        </div>

      </div>

    </li>
  )
}

ResultsSingle.propTypes = {
  thumbnail: PropTypes.string,
  active: PropTypes.bool,
  attachments: PropTypes.array,
  id: PropTypes.string.isRequired,
  promotion_enabled: PropTypes.bool,
  togglePost: PropTypes.func.isRequired,
  summary: PropTypes.object.isRequired,
}

ResultsSingle.defaultProps = {
  thumbnail: '',
  active: false,
  attachments: [],
  promotion_enabled: false,
}


export default ResultsSingle
