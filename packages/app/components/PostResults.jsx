import React from 'react'
import PropTypes from 'prop-types'
import AdSettingsSection from '@/app/AdSettingsSection'
import PostResultsScore from '@/app/PostResultsScore'
import PostResultsList from '@/app/PostResultsList'
import { postResultsConfig } from '@/app/helpers/postsHelpers'
import sidePanelStyles from '@/SidePanel.module.css'
import copy from '@/app/copy/PostsPageCopy'

const PostResults = ({
  results,
  shouldShowTitle,
  className,
}) => {
  return (
    <div
      className={[
        'md:max-w-none',
      ].join(' ')}
    >
      {shouldShowTitle && <h2 className={sidePanelStyles.SidePanel__Header}>Post results</h2>}
      <div className={className}>
        <AdSettingsSection copy={copy.resultsDescription}>
          <div className="md:grid grid-cols-12 items-center pt-4">
            <div className="col-span-4">
              <PostResultsScore
                score={results?.engagementScore}
                className={[
                  'mb-8 mx-auto',
                  'xs:mx-0',
                  'md:mb-0 md:-mt-2',
                ].join(' ')}
              />
            </div>
            <PostResultsList
              results={results}
              content={postResultsConfig}
              className="col-span-7 col-start-6"
            />
          </div>
        </AdSettingsSection>
      </div>
    </div>
  )
}

PostResults.propTypes = {
  results: PropTypes.object,
  shouldShowTitle: PropTypes.bool,
  className: PropTypes.string,
}

PostResults.defaultProps = {
  results: null,
  shouldShowTitle: true,
  className: null,
}

export default PostResults
