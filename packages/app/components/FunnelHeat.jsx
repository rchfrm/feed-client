import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import TooltipButton from '@/elements/TooltipButton'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import FunnelHeatAds from '@/app/FunnelHeatAds'
import FunnelHeatDivider from '@/app/FunnelHeatDivider'

import brandColors from '@/constants/brandColors'
import * as ROUTES from '@/app/constants/routes'

const heatColors = {
  cold: brandColors.blue,
  cool: brandColors.yellow,
  warm: brandColors.red,
  hot: brandColors.red,
}

const FunnelHeat = ({
  heat,
  nextHeatSlug,
  heatAds,
  heatIndex,
  totalHeats,
  className,
}) => {
  const { slug: heatSlug } = heat
  // Color
  const heatColor = heatColors[heatSlug]
  const nextHeatColor = nextHeatSlug ? heatColors[nextHeatSlug] : null
  // Divider
  const basePercetageWidth = 45
  const dividerPercentageWidth = basePercetageWidth - (basePercetageWidth * (heatIndex / totalHeats))
  return (
    <>
      <section
        className={[
          'p-5 border-solid border-4 rounded-dialogue',
          className,
        ].join(' ')}
        style={{
          borderColor: heatColors[heatSlug],
        }}
      >
        {/* HEADER */}
        <header className="flex justify-between -mt-1 mb-5">
          <h4 className="font-body font-bold">{heat.title}</h4>
          {/* TOOLTIP */}
          <TooltipButton
            copy={heat.tooltip}
            direction="left"
            trackLabel={`${heat.title} audience`}
            buttonStyle={{ transform: 'translate(0.5rem, -0.2rem)' }}
          />
        </header>
        <MarkdownText className="mb-6" markdown={heat.description} />
        {/* ADS */}
        <FunnelHeatAds
          className={[
            'flex items-center',
            'xs:w-3/4 sm:w-full',
            'mx-auto mb-10',
          ].join(' ')}
          heatAds={heatAds}
        />
        {/* VIEW MORE */}
        <div className="flex justify-center mb-4">
          <Link href={ROUTES.TOURNAMENTS}>
            <Button
              className="w-36"
              version="x-small green"
              wrapper="a"
            >
              View More
            </Button>
          </Link>
        </div>
      </section>
      {nextHeatSlug && (
        <div>
          <FunnelHeatDivider
            heatSlug={heatSlug}
            startColor={heatColor}
            stopColor={nextHeatColor}
            className="mx-auto"
            style={{ width: `${dividerPercentageWidth}%`, height: '3.5rem' }}
          />
        </div>
      )}
    </>
  )
}

FunnelHeat.propTypes = {
  heat: PropTypes.object.isRequired,
  nextHeatSlug: PropTypes.string,
  heatAds: PropTypes.array.isRequired,
  heatIndex: PropTypes.number.isRequired,
  totalHeats: PropTypes.number.isRequired,
  className: PropTypes.string,
}

FunnelHeat.defaultProps = {
  nextHeatSlug: '',
  className: null,
}

export default FunnelHeat
