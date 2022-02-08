import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Spinner from '@/elements/Spinner'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import copy from '@/app/copy/getStartedCopy'

const GetStartedAnalysePostsStep = () => {
  const { next } = React.useContext(WizardContext)
  const [isLoading, setIsLoading] = React.useState(true)

  const handleNext = () => {
    next()
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [next])

  return (
    <div className="flex flex-1 flex-column justify-center items-center">
      {isLoading ? (
        <>
          <div className="flex w-full mb-16">
            <Spinner width={24} className="flex-none w-auto mr-2" />
            <h2 className="mb-0 font-normal text-xl">Analysing your posts...</h2>
          </div>
          <MarkdownText className="w-2/3 mx-auto text-center" markdown={copy.analysingPosts} />
        </>
      ) : (
        <>
          <h2 className="w-full mb-16 font-normal text-xl">These are the posts we recommend promoting first...</h2>
          <div className="flex mb-16">
            <div className="w-40 h-40 mx-4 bg-green rounded-dialogue" />
            <div className="w-40 h-40 mx-4 bg-green rounded-dialogue" />
          </div>
          <div className="flex">
            <Button
              version="outline-black"
              onClick={handleNext}
              className="w-56 mx-4"
              trackComponentName="GetStartedPostsStep"
            >
              Load more...
            </Button>
            <Button
              version="green"
              onClick={handleNext}
              className="w-56 mx-4"
              trackComponentName="GetStartedPostsStep"
            >
              Save
              <ArrowAltIcon
                className="ml-3"
                direction="right"
                fill="white"
              />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

GetStartedAnalysePostsStep.propTypes = {
}

GetStartedAnalysePostsStep.defaultProps = {
}

export default GetStartedAnalysePostsStep
