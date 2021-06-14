import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import ControlsContentOptions from '@/app/ControlsContentOptions'
import ControlsContentView from '@/app/ControlsContentView'
import ConversionsContent from '@/app/ConversionsContent'

const controlsComponents = {
  targeting: <h2>Targeting</h2>,
  links: <h2>Link bank</h2>,
  integrations: <h2>Integrations</h2>,
  ads: <h2>Ad Defaults</h2>,
  conversions: <ConversionsContent />,
}

const ControlsContent = ({ activeSlug }) => {
  const isDesktopLayout = useBreakpointTest('md')

  return (
    <div className="md:grid grid-cols-12 gap-8">
      {/* SETTINGS MENU */}
      <ControlsContentOptions
        activeSlug={activeSlug}
        className="col-span-6 col-start-1"
        controlsComponents={controlsComponents}
      />
      {/* SETTINGS VIEW */}
      {isDesktopLayout && (
        <ControlsContentView
          activeSlug={activeSlug}
          className="col-span-6 col-start-7"
          controlsComponents={controlsComponents}
        />
      )}
    </div>
  )
}

ControlsContent.propTypes = {
  activeSlug: PropTypes.string,
}

ControlsContent.defaultProps = {
  activeSlug: '',
}

export default ControlsContent
