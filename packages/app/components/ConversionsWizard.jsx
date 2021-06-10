import React from 'react'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import brandColors from '@/constants/brandColors'

const ConversionsWizard = () => {
  return (
    <Button
      version="green icon"
      onClick={() => console.log('Start running conversions')}
      className="w-full"
    >
      Start Running Conversions
      <ArrowAltIcon
        className="ml-3"
        fill={brandColors.white}
        direction="right"
      />
    </Button>
  )
}

ConversionsWizard.propTypes = {

}

export default ConversionsWizard
