import React from 'react'
// import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'
import ButtonHelp from '@/elements/ButtonHelp'

// import ResultsSummaryText from '@/app/ResultsSummaryText'
import FunnelsLoader from '@/app/FunnelsLoader'
import FunnelsSelectionButtons from '@/app/FunnelsSelectionButtons'

import useBreakpointTest from '@/hooks/useBreakpointTest'
import useAnimateScroll from '@/hooks/useAnimateScroll'

import * as funnelHelpers from '@/app/helpers/funnelHelpers'

import copy from '@/app/copy/funnelCopy'

const { funnelOptions } = funnelHelpers

const FunnelsContent = () => {
  const [activeFunnelId, setActiveFunnelId] = React.useState(funnelOptions[0].id)

  const isTwoColumns = useBreakpointTest('lg')

  const contentRef = React.useRef(null)
  const scrollTo = useAnimateScroll()
  const isInitialLoad = React.useRef(true)
  React.useEffect(() => {
    if (isTwoColumns || !activeFunnelId || isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    const { current: contentEl } = contentRef
    const top = contentEl.offsetTop
    scrollTo({ offset: top - 16 })
  // eslint-disable-next-line
  }, [activeFunnelId])

  // MORE INFO BUTTON
  const moreInfoButton = (
    <ButtonHelp
      text="What's going on here?"
      content={copy.needHelp}
      contentHeader="How to understand this page"
      label="Funnels content help"
    />
  )

  return (
    <div>
      {/* RESULTS SUMMARY */}
      {/* <ResultsSummaryText
        className="mb-14"
        totalEngagements={3541}
        totalVisitors={1437}
        roasMultiplier={6}
      /> */}
      {/* INTRO */}
      <MarkdownText
        className="max-w-lg mb-16"
        markdown={copy.funnelVizIntroText}
      />
      {/* NEED HELP (mobile) */}
      {!isTwoColumns && (
        <div className="mb-16 -mt-2">
          {moreInfoButton}
        </div>
      )}
      {/* CONTENT */}
      <div
        ref={contentRef}
        className="lg:grid grid-cols-12"
      >
        {/* SELECT FUNNEL BUTTONS */}
        <div
          className={[
            'mb-16 lg:mb-0',
            'sm:max-w-xl lg:max-w-none',
            'col-span-4',
          ].join(' ')}
        >
          <FunnelsSelectionButtons
            options={funnelOptions}
            activeFunnelId={activeFunnelId}
            setActiveFunnelId={setActiveFunnelId}
          />
          {/* NEED HELP (mobile) */}
          {isTwoColumns && (
            <div className="mt-12">
              {moreInfoButton}
            </div>
          )}
        </div>
        <FunnelsLoader
          className="col-span-8 bmw:col-span-8 lg:ml-10"
          style={{ minHeight: '30rem' }}
          activeFunnelId={activeFunnelId}
        />
      </div>
    </div>
  )
}

// FunnelsContent.propTypes = {

// }

export default FunnelsContent
