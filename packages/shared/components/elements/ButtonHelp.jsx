import React from 'react'
import PropTypes from 'prop-types'

import LightbulbIcon from '@/icons/LightbulbIcon'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import MarkdownText from '@/elements/MarkdownText'

import { track } from '@/helpers/trackingHelpers'

import sidePanelStyles from '@/app/SidePanel.module.css'

const ButtonHelp = React.forwardRef(({
  content,
  contentHeader,
  text,
  reverseText,
  label,
  trackLocation,
  className,
}, ref) => {
  const { setSidePanelContent, setSidePanelContentLabel, setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)
  const SidePanelContent = React.useMemo(() => {
    const sidepanelContent = typeof content === 'string' ? (
      <div>
        {contentHeader && <h2 className={sidePanelStyles.SidePanel__Header}>{contentHeader}</h2>}
        <MarkdownText markdown={content} className="mb-0" />
      </div>
    ) : content
    return sidepanelContent
  }, [content, contentHeader])

  const toggleHelp = React.useCallback(() => {
    setSidePanelContentLabel('Help Panel')
    setSidePanelContent(SidePanelContent)
    setSidePanelButton(null)
    toggleSidePanel(true)
    track('click_help_button', {
      label,
      location: trackLocation,
    })
  }, [setSidePanelContent, setSidePanelContentLabel, setSidePanelButton, toggleSidePanel, SidePanelContent, label, trackLocation])

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
  contentHeader: PropTypes.string,
  text: PropTypes.string,
  label: PropTypes.string.isRequired,
  reverseText: PropTypes.bool,
  trackLocation: PropTypes.string,
  className: PropTypes.string,
}

ButtonHelp.defaultProps = {
  contentHeader: '',
  text: '',
  reverseText: false,
  trackLocation: '',
  className: null,
}

ButtonHelp.displayName = 'ButtonHelp'

export default ButtonHelp
