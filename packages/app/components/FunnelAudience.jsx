import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import TooltipButton from '@/elements/TooltipButton'
import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import FunnelAudienceAds from '@/app/FunnelAudienceAds'
import FunnelAudienceDivider from '@/app/FunnelAudienceDivider'

import { getAudienceTournamentLink } from '@/app/helpers/funnelHelpers'

const FunnelAudience = ({
  audience,
  nextAudience,
  audienceAds,
  audienceIndex,
  totalAudiences,
  activeFunnelId,
  className,
}) => {
  const { slug: audienceSlug, color: audienceColor } = audience
  const { slug: nextAudienceSlug, color: nextAudienceColor } = nextAudience
  // Divider
  const basePercetageWidth = 45
  const dividerPercentageWidth = basePercetageWidth - (basePercetageWidth * (audienceIndex / totalAudiences))
  // Link
  const linkHref = getAudienceTournamentLink({ audienceSlug, funnelSlug: activeFunnelId })
  return (
    <>
      <section
        className={[
          'p-5 border-solid border-4 rounded-dialogue',
          className,
        ].join(' ')}
        style={{
          borderColor: audienceColor,
        }}
      >
        {/* HEADER */}
        <header className="flex justify-between -mt-1 mb-5">
          <h4 className="font-body font-bold">{audience.title}</h4>
          {/* TOOLTIP */}
          <TooltipButton
            copy={audience.tooltip}
            direction="left"
            trackLabel={`${audience.title} audience`}
            buttonStyle={{ transform: 'translate(0.5rem, -0.2rem)' }}
          />
        </header>
        <MarkdownText className="mb-6" markdown={audience.description} />
        {/* ADS */}
        <FunnelAudienceAds
          className={[
            'flex items-center',
            'xs:w-3/4 sm:w-full',
            'mx-auto mb-10',
          ].join(' ')}
          audienceAds={audienceAds}
        />
        {/* VIEW MORE */}
        <div className="flex justify-center mb-4">
          <Link href={linkHref}>
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
      {nextAudienceSlug && (
        <div>
          <FunnelAudienceDivider
            audienceSlug={audienceSlug}
            startColor={audienceColor}
            stopColor={nextAudienceColor}
            className="mx-auto"
            style={{ width: `${dividerPercentageWidth}%`, height: '3.5rem' }}
          />
        </div>
      )}
    </>
  )
}

FunnelAudience.propTypes = {
  audience: PropTypes.object.isRequired,
  nextAudience: PropTypes.object.isRequired,
  audienceAds: PropTypes.array.isRequired,
  audienceIndex: PropTypes.number.isRequired,
  totalAudiences: PropTypes.number.isRequired,
  activeFunnelId: PropTypes.string.isRequired,
  className: PropTypes.string,
}

FunnelAudience.defaultProps = {
  className: null,
}

export default FunnelAudience
