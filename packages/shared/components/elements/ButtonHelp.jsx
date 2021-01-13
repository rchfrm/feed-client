import React from 'react'
import PropTypes from 'prop-types'

import LightbulbIcon from '@/icons/LightbulbIcon'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import MarkdownText from '@/elements/MarkdownText'

import { track } from '@/app/helpers/trackingHelpers'

const ButtonHelp = React.forwardRef(({
  content,
  text,
  reverseText,
  label,
  className,
}, ref) => {
  const { setSidePanelContent, setSidePanelContentLabel, setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)
  const SidePanelContent = React.useMemo(() => {
    return typeof content === 'string' ? <MarkdownText markdown={content} className="mb-0" /> : content
  }, [content])
  const toggleHelp = React.useCallback(() => {
    setSidePanelContentLabel('Help Panel')
    setSidePanelContent(SidePanelContent)
    setSidePanelButton(null)
    toggleSidePanel(true)
    track({
      action: 'click_help_button',
      label,
      category: 'generic',
    })
  }, [setSidePanelContent, setSidePanelContentLabel, setSidePanelButton, toggleSidePanel, SidePanelContent, label])

  return (
    <button
      ref={ref}
      className={[
        'relative flex items-center',
        'h-12',
        reverseText ? 'flex-row-reverse' : null,
        className,
      ].join(' ')}
      onClick={toggleHelp}
      aria-label="Help"
      title="Help"
    >
      <div
        className={[
          'flex items-center',
          'w-12 h-12',
          'rounded-full bg-sc',
          className,
        ].join(' ')}
      >
        <LightbulbIcon className="h-6 w-auto mx-auto" />
      </div>
      {text && (
        <strong className={reverseText ? 'mr-5' : 'ml-5'}>
          {text}
        </strong>
      )}
    </button>
  )
})

ButtonHelp.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  text: PropTypes.string,
  label: PropTypes.string.isRequired,
  reverseText: PropTypes.bool,
  className: PropTypes.string,
}

ButtonHelp.defaultProps = {
  text: '',
  reverseText: false,
  className: null,
}

ButtonHelp.displayName = 'ButtonHelp'

export default ButtonHelp
