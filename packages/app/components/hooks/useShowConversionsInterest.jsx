import React from 'react'

import { SidePanelContext } from '@/app/contexts/SidePanelContext'

import MarkdownText from '@/elements/MarkdownText'
import Button from '@/elements/Button'

import sidePanelStyles from '@/app/SidePanel.module.css'

import copy from '@/app/copy/PostsPageCopy'

const useShowConversionsInterest = () => {
  // SIDE PANEL context
  const {
    setSidePanelContent,
    setSidePanelContentLabel,
    setSidePanelButton,
    toggleSidePanel,
  } = React.useContext(SidePanelContext)

  // CONTENT
  const CONTENT = (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Conversion ads</h2>
      <MarkdownText markdown={copy.conversionsInterestCopy} />
    </section>
  )

  // CLOSE BUTTON
  const CLOSE_BUTTON = (
    <Button onClick={() => toggleSidePanel(false)} version="green" trackComponentName="useShowConversionsInterest">
      Done
    </Button>
  )

  const openConversionsInterestPanel = React.useCallback(() => {
    setSidePanelContent(CONTENT)
    setSidePanelButton(CLOSE_BUTTON)
    setSidePanelContentLabel('Conversion Interest')
    toggleSidePanel(true)
  // eslint-disable-next-line
  }, [setSidePanelButton, setSidePanelContent, setSidePanelContentLabel, toggleSidePanel])

  return openConversionsInterestPanel
}

export default useShowConversionsInterest
