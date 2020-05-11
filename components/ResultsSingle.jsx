import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import { ArtistContext } from './contexts/Artist'

import ResultsToggle from './ResultsToggle'
// IMPORT ELEMENTS
import SquareImage from './elements/SquareImage'
import MediaFallback from './elements/MediaFallback'
// IMPORT PAGES
// IMPORT HELPERS
import * as utils from './helpers/utils'
// IMPORT STYLES
import resultsStyles from './Results.module.css'
import postStyles from './PostsPage.module.css'

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
  thumbnail,
  active,
  attachments,
  id,
  promotion_enabled,
  togglePost,
  summary,
}) => {
  const { artist } = React.useContext(ArtistContext)
  // STORE MEDIA COMPONENT AND COMPONENT IN STATE
  const [media, setMedia] = React.useState(<MediaFallback />)
  const [thumbnailMedia, setThumbnailMedia] = React.useState(thumbnail)

  const handleError = () => {
    setMedia(<MediaFallback />)
  }

  // DISPLAY CORRECT MEDIA
  const renderMedia = React.useCallback(attachments => {
    let mediaLink
    // If there are attachments, find the relevant media file,
    // and update the thumbnail if there isn't one already
    if (attachments.length > 0) {
      mediaLink = utils.findPostMedia(attachments[0])
      if (!thumbnailMedia) {
        setThumbnailMedia(utils.findPostThumbnail(attachments[0]))
      }
    }

    // If there is no mediaLink, but there is a thumbnail, use that instead
    if (!mediaLink && thumbnailMedia) {
      mediaLink = thumbnailMedia
    }

    let message // TODO : Implement a way to dispay title and alt attributes
    return utils.generateMediaHTML(mediaLink, thumbnailMedia, message, handleError)
  }, [thumbnailMedia])

  React.useEffect(() => {
    const component = renderMedia(attachments)
    setMedia(component)
  }, [attachments])

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
    <li key={id} className={[styles.resultItem, styles[enabledClass]].join(' ')}>

      <div className="flex-row">

        <div className={styles['result-media']}>
          <SquareImage
            className={styles.img}
            media={media}
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
