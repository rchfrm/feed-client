import React from 'react'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/getStartedCopy'

const GetStartedPaymentMethod = () => {
  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-xl">{copy.paymentMethodSubtitle}</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown={copy.paymentMethodDescription} />
    </div>
  )
}

GetStartedPaymentMethod.propTypes = {
}

GetStartedPaymentMethod.defaultProps = {
}

export default GetStartedPaymentMethod
