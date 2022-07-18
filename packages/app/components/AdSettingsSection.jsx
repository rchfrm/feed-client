import React from 'react'
import PropTypes from 'prop-types'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import DisabledSection from '@/app/DisabledSection'

import MarkdownText from '@/elements/MarkdownText'

const AdSettingsSection = ({
  children,
  header,
  copy,
  section,
  hasPlanRestriction,
  isDisabled,
  className,
}) => {
  const { artist: { hasSetUpProfile } } = React.useContext(ArtistContext)

  return (
    <section className={[
      'mb-10 last:mb-0',
    ].join(' ')}
    >
      <div className={isDisabled ? 'text-grey-2' : null}>
        <h3 className="font-body font-bold text-lg mb-3">{header}</h3>
        <DisabledSection
          section={section}
          isDisabled={hasPlanRestriction && hasSetUpProfile}
          className="mb-10"
        >
          {copy && <MarkdownText markdown={copy} className={className} />}
          {children}
        </DisabledSection>
      </div>
    </section>
  )
}

AdSettingsSection.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  copy: PropTypes.string,
  section: PropTypes.string,
  hasPlanRestriction: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

AdSettingsSection.defaultProps = {
  copy: '',
  section: '',
  hasPlanRestriction: false,
  isDisabled: false,
  className: null,
}


export default AdSettingsSection
