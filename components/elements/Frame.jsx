// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
// IMPORT STYLES

function Frame(props) {
// DEFINE TILE DETAILS
  const initialTileDetailsState = {
    number: props.children.length,
    current: 1,
    timerRunning: false,
    timeNow: moment().format('x'),
    updateTime: moment().format('x'),
    scroll: 0,
    width: 1 / props.children.length,
  }
  const tileDetailsReducer = (tileDetailsState, tileDetailsAction) => {
    switch (tileDetailsAction.type) {
      case 'set-scroll-position':
        return {
          ...tileDetailsState,
          timerRunning: true,
          updateTime: moment().format('x'),
          scroll: tileDetailsAction.payload.scroll,
        }
      case 'toggle-timer':
        return {
          ...tileDetailsState,
          timerRunning: tileDetailsAction.payload,
        }
      case 'time-now':
        return {
          ...tileDetailsState,
          timeNow: moment().format('x'),
        }
      case 'current-tile':
        return {
          ...tileDetailsState,
          current: tileDetailsAction.payload.current,
        }
      default:
        throw new Error(`Unable to find ${tileDetailsAction.type} in tileDetailsReducer`)
    }
  }
  const [tileDetails, setTileDetails] = React.useReducer(tileDetailsReducer, initialTileDetailsState)
  // END DEFINE TILE DETAILS

  // TRACK SCROLL POSITION AND UPDATE TILE DETAILS STATE ACCORDINGLY
  React.useEffect(() => {
    const currentTile = Math.floor((tileDetails.scroll + tileDetails.width / 2) / tileDetails.width) + 1
    if (currentTile !== tileDetails.current) {
      setTileDetails({
        type: 'current-tile',
        payload: {
          current: currentTile,
        },
      })
    }

    const frame = document.getElementsByClassName('frame')[0]
    if (tileDetails.timeNow - tileDetails.updateTime > 500 && tileDetails.timerRunning) {
      frame.scrollLeft = frame.scrollWidth * (tileDetails.current - 1) * tileDetails.width
      setTileDetails({
        type: 'toggle-timer',
        payload: false,
      })
    }
  }, [tileDetails])
  // END TRACK SCROLL POSITION AND UPDATE TILE DETAILS STATE ACCORDINGLY

  // CLOCK TO REFERENCE WHEN USER STOPS SCROLLING
  React.useEffect(() => {
    if (tileDetails.timerRunning) {
      setTileDetails({
        type: 'time-now',
      })
    }
  })
  // END CLOCK TO REFERENCE WHEN USER STOPS SCROLLING

  const handleNext = e => {
    e.preventDefault()
  }

  const handlePrev = e => {
    e.preventDefault()
  }

  // HANDLE SCROLL
  const handleScroll = () => {
    const frame = document.getElementsByClassName('frame')[0]
    const frameWidth = frame.scrollWidth
    const scrollPosition = frame.scrollLeft
    const scrollPercentage = scrollPosition / frameWidth
    setTileDetails({
      type: 'set-scroll-position',
      payload: {
        timerRunning: true,
        scroll: scrollPercentage,
      },
    })
  }
  // END HANDLE SCROLL

  return (
    <div className="fill-height">

      {tileDetails.number > 1
        ? <FrameNav next={handleNext} prev={handlePrev} currentChild={tileDetails.current} childCount={tileDetails.number} />
        : ''}

      <ul
        className="frame"
        onScroll={handleScroll}
      >
        {props.children}
      </ul>
    </div>
  )
}

function FrameNav(props) {
  return (
    <div className="frame-nav">
      {/* <NextButton */}
      {/*  disabled={props.currentChild === 1} */}
      {/*  onClick={props.prev} */}
      {/* > */}
      {/*  Prev. */}
      {/* </NextButton> */}

      {props.currentChild}
      {' '}
      /
      {props.childCount}

      {/* <NextButton */}
      {/*  disabled={props.currentChild === props.childCount} */}
      {/*  onClick={props.next} */}
      {/*  position="right" */}
      {/* > */}
      {/*  Next. */}
      {/* </NextButton> */}
    </div>
  )
}

export default Frame
