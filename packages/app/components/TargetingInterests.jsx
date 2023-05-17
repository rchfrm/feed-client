import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import TargetingSectionHeader from '@/app/TargetingSectionHeader'
import TargetingInterestsList from '@/app/TargetingInterestsList'
import TargetingInterestsSearch from '@/app/TargetingInterestsSearch'
import DisabledSection from '@/app/DisabledSection'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/app/copy/targetingPageCopy'

const TargetingInterests = ({
  className,
}) => {
  const { artist: { hasBasicPlan, hasSetUpProfile } } = React.useContext(ArtistContext)

  return (
    <section className={[className].join(' ')}>
      <TargetingSectionHeader className="mb-5" header="Interests" />
      <MarkdownText markdown={copy.interestDescription} />
      <DisabledSection
        section="interests"
        isDisabled={hasBasicPlan && hasSetUpProfile}
      >
        <TargetingInterestsList />
        <TargetingInterestsSearch />
      </DisabledSection>
    </section>
  )
}

TargetingInterests.propTypes = {
  className: PropTypes.string,
}

TargetingInterests.defaultProps = {
  className: null,
}

export default TargetingInterests
