import React from 'react'
import MarkdownText from '@/elements/MarkdownText'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'
import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsInstagramNotConnected = () => {
  return (
    <div className="flex items-center mb-5">
      <ExclamationCircleIcon
        color={brandColors.red}
        className="w-4 h-auto mr-1 flex-shrink-0"
      />
      <MarkdownText
        markdown={copy.objectiveInstagramNotConnected}
        className="text-sm text-red mb-0"
      />
    </div>
  )
}

export default ObjectiveSettingsInstagramNotConnected
