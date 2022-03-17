import React from 'react'
import PropTypes from 'prop-types'

import GetStartedSummarySentenceObjective from '@/app/GetStartedSummarySentenceObjective'
import GetStartedSummarySentencePosts from '@/app/GetStartedSummarySentencePosts'
import GetStartedSummarySentenceAdAccount from '@/app/GetStartedSummarySentenceAdAccount'
import GetStartedSummarySentenceTargeting from '@/app/GetStartedSummarySentenceTargeting'

import Error from '@/elements/Error'

const GetStartedSummarySentence = ({ className }) => {
  const [error, setError] = React.useState(null)

  return (
    <>
      <div className={[
        'flex flex-wrap items-center',
        'mr-auto sm:mr-0 mb-10',
        className,
      ].join(' ')}
      >
        <GetStartedSummarySentenceObjective />
        <GetStartedSummarySentencePosts />
        <GetStartedSummarySentenceAdAccount setError={setError} />
        <GetStartedSummarySentenceTargeting />
      </div>
      <Error error={error} />
    </>
  )
}

GetStartedSummarySentence.propTypes = {
  className: PropTypes.string,
}

GetStartedSummarySentence.defaultProps = {
  className: null,
}

export default GetStartedSummarySentence
