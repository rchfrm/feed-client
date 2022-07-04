import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import SplitViewOptions from '@/app/SplitViewOptions'
import SplitViewContent from '@/app/SplitViewContent'

const SplitView = ({
  slug,
  contentComponents,
  options,
  optionsHeader,
  basePath,
  hasEvenColumns,
  breakpoint,
  className,
}) => {
  const isDesktopLayout = useBreakpointTest(breakpoint)
  const [activeOption, setActiveOption] = React.useState(!basePath ? options[0].name : slug)

  return (
    <div className={className}>
      <div className={hasEvenColumns ? 'col-span-6' : 'col-span-4'}>
        <div className="mb-8">
          {optionsHeader && optionsHeader}
        </div>
        {/* SETTINGS MENU */}
        <SplitViewOptions
          contentComponents={contentComponents}
          options={options}
          basePath={basePath}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
      </div>
      {/* SETTINGS VIEW */}
      {isDesktopLayout && (
        <SplitViewContent
          activeOption={activeOption}
          contentComponents={contentComponents}
          className={hasEvenColumns ? 'col-span-6' : 'col-span-8'}
        />
      )}
    </div>
  )
}

SplitView.propTypes = {
  slug: PropTypes.string,
  contentComponents: PropTypes.object,
  options: PropTypes.array,
  optionsHeader: PropTypes.node,
  basePath: PropTypes.string,
  hasEvenColumns: PropTypes.bool,
  breakpoint: PropTypes.string,
  className: PropTypes.string,
}

SplitView.defaultProps = {
  slug: '',
  contentComponents: null,
  options: [],
  optionsHeader: null,
  basePath: '',
  hasEvenColumns: false,
  breakpoint: 'md',
  className: null,
}

export default SplitView
