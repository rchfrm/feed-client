import React from 'react'
import PropTypes from 'prop-types'

import useBreakpointTest from '@/hooks/useBreakpointTest'

import SplitViewOptions from '@/app/SplitViewOptions'
import SplitViewContent from '@/app/SplitViewContent'

const SplitView = ({
  slug,
  contentComponents,
  options,
  basePath,
  hasEvenColumns,
  breakpoint,
  className,
}) => {
  const isDesktopLayout = useBreakpointTest(breakpoint)
  const [activeOption, setActiveOption] = React.useState(!basePath ? options[0].key : slug)

  return (
    <div className={className}>
      <div className={hasEvenColumns ? 'col-span-6' : 'col-span-5 md:col-span-4'}>
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
          className={hasEvenColumns ? 'col-span-6' : 'col-span-7 md:col-span-8'}
        />
      )}
    </div>
  )
}

SplitView.propTypes = {
  slug: PropTypes.string,
  contentComponents: PropTypes.object,
  options: PropTypes.array,
  basePath: PropTypes.string,
  hasEvenColumns: PropTypes.bool,
  breakpoint: PropTypes.string,
}

SplitView.defaultProps = {
  slug: '',
  contentComponents: null,
  options: [],
  basePath: '',
  hasEvenColumns: false,
  breakpoint: 'md',
}

export default SplitView
