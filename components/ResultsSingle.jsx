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
import helper from './helpers/helper'
// IMPORT STYLES
import resultsStyles from './Results.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...resultsStyles,
  ...postStyles,
}

function Insight({ days: daysArray, statement, number }) {
  const days = daysArray.length
  const currency = statement === 'spent,' ? '£' : ''
  const numberAbbr = helper.abbreviateNumber(number)
  if (days === 0) {
    return null
  }
  return (
    <div className={styles['result-insight']}>
      <div className={styles['insight-number']} title={`${currency}${helper.formatNumber(number)}`}>
        {currency + numberAbbr}
      </div>
      <div className={styles['insight-statement']}>
        {statement}
      </div>
    </div>
  )
}

function Days({ days, active }) {
// REDEFINE PROPS AS VARIABLES
  const sortedDates = helper.sortDatesChronologically(days)
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
        From&nbsp;
        {phrase.a}
        {' '}
        to&nbsp;
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
  priority_dsp,
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
      mediaLink = helper.findPostMedia(attachments[0])
      if (!thumbnailMedia) {
        setThumbnailMedia(helper.findPostThumbnail(attachments[0]))
      }
    }

    // If there is no mediaLink, but there is a thumbnail, use that instead
    if (!mediaLink && thumbnailMedia) {
      mediaLink = thumbnailMedia
    }

    let message // TODO : Implement a way to dispay title and alt attributes
    return helper.generateMediaHTML(mediaLink, thumbnailMedia, message, handleError)
  }, [thumbnailMedia])
  // END DISPLAY CORRECT MEDIA

  React.useEffect(() => {
    const component = renderMedia(attachments)
    setMedia(component)
  }, [attachments, renderMedia])

  const enabledClass = promotion_enabled ? 'enabled' : 'disabled'

  const priorityPage = priority_dsp === 'facebook' ? `${priority_dsp}_page_url` : `${priority_dsp}_url`
  const clicksStatement = (
    <span>
      {'clicks to '}
      <a href={artist[priorityPage]} target="_blank" rel="noopener noreferrer">
        {helper.capitalise(priority_dsp)}
      </a>
    </span>
  )

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
          <Days days={summary.days} active={active} />
          <Insight days={summary.days} number={summary.amountSpent} statement="spent," />
          <Insight days={summary.days} number={summary.impressions} statement="people reached," />
          <Insight days={summary.days} number={summary.engagement} statement="engagements," />
          <Insight days={summary.days} number={summary.clicks} statement={clicksStatement} />
        </div>

        <div className={styles['result-toggle-saes']}>
          <h2 className={styles.h2}>{summary.SAES}</h2>
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
  priority_dsp: PropTypes.string.isRequired,
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
