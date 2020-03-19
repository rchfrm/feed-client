// IMPORT PACKAGES
import React from 'react'
import Link from 'next/link'
import useAsyncEffect from 'use-async-effect'
import moment from 'moment'
import produce from 'immer'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import SquareImage from './elements/SquareImage'
import Feed from './elements/Feed'
import Button from './elements/Button'
import Nothing from './elements/Nothing'
import Spinner from './elements/Spinner'
import Alert from './elements/Alert'
import Icon from './elements/Icon'
import MediaFallback from './elements/MediaFallback'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
import brandColours from '../constants/brandColours'
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import resultsStyles from './Results.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...resultsStyles,
  ...postStyles,
}
// import styles from './Results.module.css'

const calculateSummary = (ads, isActive) => {
  const adValues = Object.values(ads)

  let amountSpent = 0
  let impressions = 0
  let engagement = 0
  let clicks = 0
  let engagementScore = 0
  const days = []

  const checkSAESIsNumber = (engagement, spend) => {
    if (spend === 0) {
      return '-'
    }
    return Math.round(engagement / spend)
  }

  // Loop through the metrics of each associated ad
  for (let i = 0; i < adValues.length; i += 1) {
    engagementScore += adValues[i].engagement_score || 0

    const { metrics } = adValues[i]
    const dates = Object.keys(metrics)
    for (let j = 0; j < dates.length; j += 1) {
      const date = dates[j]
      if (days.indexOf(date) === -1) {
        days.push(date)
      }
      const adMetrics = metrics[date]
      amountSpent += Number(adMetrics.spend) || 0
      impressions += Number(adMetrics.impressions) || 0
      if (adMetrics.actions) {
        engagement += Number(adMetrics.actions.post_engagement) || 0
      }
      if (adMetrics.outbound_clicks) {
        clicks += Number(adMetrics.outbound_clicks.outbound_click) || 0
      }
    }
  }

  if (!isActive && amountSpent === 0) {
    return false
  }
  return {
    amountSpent: amountSpent.toFixed(2),
    impressions,
    engagement,
    clicks,
    SAES: checkSAESIsNumber(engagementScore, amountSpent),
    days,
  }
}

const Result = ({
  thumbnail: thumbnailProp,
  active,
  attachments,
  id,
  priority_dsp,
  promotion_enabled,
  setPosts,
  summary,
}) => {
  const { artist } = React.useContext(ArtistContext)
  // STORE MEDIA COMPONENT AND COMPONENT IN STATE
  const [media, setMedia] = React.useState(<MediaFallback />)
  const [thumbnail, setThumbnail] = React.useState(thumbnailProp)
  // END STORE MEDIA COMPONENT IN STATE

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
      if (!thumbnail) {
        setThumbnail(helper.findPostThumbnail(attachments[0]))
      }
    }

    // If there is no mediaLink, but there is a thumbnail, use that instead
    if (!mediaLink && thumbnail) {
      mediaLink = thumbnail
    }

    let message // TODO : Implement a way to dispay title and alt attributes
    return helper.generateMediaHTML(mediaLink, thumbnail, message, handleError)
  }, [thumbnail])
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
          <Toggle active={active} id={id} promotion_enabled={promotion_enabled} setPosts={setPosts} />
        </div>

      </div>

    </li>
  )
}

function Insight({ days: daysArray, statement, number }) {
  const days = daysArray.length
  const currency = statement === 'spent,' ? '£' : ''
  const numberAbbr = helper.abbreviateNumber(number)
  if (days === 0) {
    return <Nothing />
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

function NoActive() {
  const { artist } = React.useContext(ArtistContext)

  if (artist.daily_budget > 0) {
    return (
      <div className="ninety-wide" style={{ marginBottom: '2em' }}>
        <h3>
          <Feed />
          {' '}
          is setting up your posts for promotion.
        </h3>
        <p>
          There may be a delay whilst posts await approval, once promotions have started you'll be able to see your results here.
        </p>
      </div>
    )
  }
  return (
    <div className="ninety-wide" style={{ marginBottom: '2em' }}>
      <h3>
        <Feed />
        {' '}
        isn't currently promoting any of your posts,&nbsp;
        <Link href={ROUTES.POSTS}><a>set a daily budget</a></Link>
        {' '}
        to get
        it started.
      </h3>
    </div>
  )
}

const initialAlertState = {
  contents: undefined,
  responseExpected: true,
  confirmationText: 'Yes.',
  rejectionText: 'No.',
  response: false,
}

export const alertReducer = (alertState, alertAction) => {
  switch (alertAction.type) {
    case 'show-alert':
      return {
        ...alertState,
        contents: alertAction.payload.contents,
      }

    case 'reset-alert':
      return initialAlertState

    case 'set-positive-response':
      return {
        ...alertState,
        contents: undefined,
        response: true,
      }

    default:
      throw new Error(`Could not find ${alertAction.type} in alertReducer`)
  }
}

function Toggle(props) {
// REDEFINE PROPS AS VARIABLES
  const { active } = props
  const { id } = props
  const { promotion_enabled } = props
  const { setPosts } = props
  // END REDEFINE PROPS AS VARIABLES

  // IMPORT ARTIST CONTEXT
  const { getToken } = React.useContext(AuthContext)
  const { artist } = React.useContext(ArtistContext)
  // END IMPORT ARTIST CONTEXT

  // DEFINE STATE
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useReducer(alertReducer, initialAlertState)
  // END DEFINE STATE

  const showAlert = () => {
    setAlert({
      type: 'show-alert',
      payload: {
        contents: <DeactivateAdConfirmation promotion_enabled={promotion_enabled} />,
      },
    })
  }


  const togglePromotion = async () => {
    const token = await getToken()
      .catch((err) => {
        throw (err)
      })
    // return result
    const result = await server.togglePromotionEnabled(artist.id, id, !promotion_enabled, token)
    return result
  }

  // Update post promotion_enabled if there is a positive response from the alert
  useAsyncEffect(async (isMounted) => {
    if (!alert.response) return
    if (!isMounted()) return
    setLoading(true)
    const post = await togglePromotion()
      .catch(err => {
        // TODO: PROPERLY HANDLE THIS ERROR
        console.log(err)
        if (!isMounted()) return
        setLoading(false)
      })
    if (!isMounted()) return
    setPosts({
      type: 'set-promotion-enabled',
      payload: {
        type: active ? 'active' : 'archive',
        id,
        promotion_enabled: post.promotion_enabled,
      },
    })
    setLoading(false)
  }, [active, alert.response, id])

  if (!active) {
    return <Nothing />
  }
  return (
    <div className={styles['result-toggle']}>

      <Alert
        confirmationText={alert.confirmationText}
        contents={alert.contents}
        rejectionText={alert.rejectionText}
        responseExpected={alert.responseExpected}
        setAlert={setAlert}
      />

      <Button
        className={styles.button}
        version="toggle"
        onClick={showAlert}
      >
        {
            loading
              ? <Spinner width={20} colour={brandColours.white} />
              : (
                <Icon
                  className={styles.button}
                  version={promotion_enabled ? 'cross' : 'tick'}
                  color={promotion_enabled ? brandColours.red : brandColours.green}
                  width="18"
                />
              )
          }
      </Button>

    </div>
  )
}

function DeactivateAdConfirmation(props) {
  const { promotion_enabled } = props

  if (!promotion_enabled) {
    return (
      <div>
        <h1>Are you sure?</h1>
        <p>
          Clicking 'Yes' below will mean
          {' '}
          <Feed />
          {' '}
          starts to promote the post again.
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>Are you sure?</h1>
      <p>Just to double check, are you sure you want this post to stop being promoted?</p>
    </div>
  )
}

function DisabledResults(props) {
// REDEFINE PROPS AS VARIABLES
  const { disabledResults } = props
  // END REDEFINE PROPS AS VARIABLES

  if (disabledResults.length === 0) {
    return <Nothing />
  }

  return (
    <div
      className={styles['disabled-results']}
      style={{
        backgroundColor: helper.hexToRGBA(brandColours.red, 0.1),
      }}
    >
      <h3>The posts below are being turned off...</h3>
      <p>This can take up to 15 minutes, in this time you can turn them back on by clicking the tick in the top right corner.</p>
      <ul className={styles.results}>{disabledResults}</ul>
    </div>
  )
}

function ResultsAll({ posts: postsObject, active, setPosts }) {
  const { artist } = React.useContext(ArtistContext)

  const title = active ? 'active posts.' : 'archive.'

  const getResultEl = (post, summary) => {
    return (
      <Result
        key={post.id}
        active={active}
        attachments={post.attachments}
        id={post.id}
        priority_dsp={post.priority_dsp || artist.priority_dsp}
        promotion_enabled={post.promotion_enabled}
        setPosts={setPosts}
        summary={summary}
        thumbnail={post._metadata.thumbnail_url}
      />
    )
  }

  // Sort results into enabled and disabled
  const allResults = React.useMemo(() => {
    const posts = Object.values(postsObject)
    return posts.reduce((postsSorted, post) => {
      const { ads, promotion_enabled } = post
      const summary = calculateSummary(ads, active)
      if (!summary) return postsSorted
      if (active && !promotion_enabled) {
        return produce(postsSorted, draft => {
          const postEl = getResultEl(post, summary)
          draft.disabled.push(postEl)
        })
      }
      return produce(postsSorted, draft => {
        const postEl = getResultEl(post, summary)
        draft.enabled.push(postEl)
      })
    }, {
      enabled: [],
      disabled: [],
    })
  }, [postsObject])


  if (allResults.enabled.length === 0 && active) {
    // If there are no active posts, return NoActive
    return <NoActive />
  } if (allResults.enabled.length === 0 && !active) {
    // If there are no archived posts, return Nothing
    return <Nothing />
  }
  return (
    <div style={{ width: '100%' }}>
      <div className="ninety-wide">
        <h2>{title}</h2>
      </div>
      <ul className={styles.results}>{allResults.enabled}</ul>
      <DisabledResults disabledResults={allResults.disabled} />
    </div>
  )
}

export default ResultsAll
