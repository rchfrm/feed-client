import React from 'react'
import PropTypes from 'prop-types'

import LightbulbIcon from '@/icons/LightbulbIcon'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'
import MarkdownText from './MarkdownText'

const ButtonHelp = React.forwardRef(({
  content,
  text,
  className,
}, ref) => {
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)
  const SidePanelContent = React.useMemo(() => {
    return typeof content === 'string' ? <MarkdownText markdown={content} /> : content
  }, [content])
  const toggleHelp = React.useCallback(() => {
    setSidePanelContent(SidePanelContent)
    toggleSidePanel(true)
  }, [setSidePanelContent, toggleSidePanel, SidePanelContent])

  return (
    <button
      ref={ref}
      className={[
        'relative flex items-center',
        'h-12',
        className,
      ].join(' ')}
      onClick={toggleHelp}
      aria-label="Help"
      title="Help"
    >
      <div
        className={[
          'flex items-center',
          'w-12 h-full',
          'rounded-full bg-sc',
          className,
        ].join(' ')}
      >
        <LightbulbIcon className="h-6 w-auto mx-auto" />
      </div>
      {text && (
        <strong className="ml-5">
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
  className: PropTypes.string,
}

ButtonHelp.defaultProps = {
  text: '',
  className: null,
}

ButtonHelp.displayName = 'ButtonHelp'

export default ButtonHelp
