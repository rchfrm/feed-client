import React from 'react'
import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'

import Button from '@/elements/Button'
import CloseCircleIcon from '@/icons/CloseCircleIcon'
import TickCircleIcon from '@/icons/TickCircleIcon'

import brandColors from '@/constants/brandColors'

const GetStartedFacebookPixelQuestion = ({ setShouldShowPixelSelector }) => {
  const { next } = React.useContext(WizardContext)

  return (
    <div className="w-full flex flex-1 flex-column sm:flex-row justify-center items-center">
      <Button
        version="outline-black"
        onClick={next}
        spinnerFill={brandColors.black}
        className="w-full sm:w-56 mx-4 mb-5 sm:mb-0"
        trackComponentName="GetStartedFacebookPixelQuestion"
      >
        <CloseCircleIcon
          fill={brandColors.greyDark}
          className="w-6 h-6 mr-2"
        />
        No
      </Button>
      <Button
        version="outline-black"
        onClick={() => setShouldShowPixelSelector(true)}
        spinnerFill={brandColors.black}
        className="w-full sm:w-56 mx-4"
        trackComponentName="GetStartedFacebookPixelQuestion"
      >
        <TickCircleIcon
          className="w-6 h-6 mr-2"
        />
        Yes
      </Button>
    </div>
  )
}

GetStartedFacebookPixelQuestion.propTypes = {
  setShouldShowPixelSelector: PropTypes.func.isRequired,
}

GetStartedFacebookPixelQuestion.defaultProps = {
}

export default GetStartedFacebookPixelQuestion
