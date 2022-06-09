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
}) => {
  const isDesktopLayout = useBreakpointTest('md')
  const [activeOption, setActiveOption] = React.useState(!basePath ? options[0].key : slug)

  return (
    <div className="md:grid grid-cols-12 gap-8">
      <div className={hasEvenColumns ? 'col-span-6' : 'col-span-4'}>
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
  basePath: PropTypes.string,
  hasEvenColumns: PropTypes.bool,
}

SplitView.defaultProps = {
  slug: '',
  contentComponents: null,
  options: [],
  basePath: '',
  hasEvenColumns: false,
}

export default SplitView
