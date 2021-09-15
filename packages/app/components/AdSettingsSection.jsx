import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const AdSettingsSection = ({
  header,
  copy,
  copyClassName,
  children,
  isDisabled,
}) => {
  return (
    <section className={[
      'mb-10 last:mb-0',
      isDisabled ? 'text-grey-2' : null,
    ].join(' ')}
    >
      <h3 className="font-body font-bold text-lg mb-3">{header}</h3>
      {copy && <MarkdownText markdown={copy} className={copyClassName} />}
      {children}
    </section>
  )
}

AdSettingsSection.propTypes = {
  header: PropTypes.string.isRequired,
  copy: PropTypes.string,
  copyClassName: PropTypes.string,
  isDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

AdSettingsSection.defaultProps = {
  copy: '',
  copyClassName: null,
  isDisabled: false,
}


export default AdSettingsSection
