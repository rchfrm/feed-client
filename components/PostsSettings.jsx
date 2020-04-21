import React from 'react'

// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
import { SidePanelContext } from './contexts/SidePanelContext'
// IMPORT ELEMENTS
import MarkdownText from './elements/MarkdownText'
import RadioButtons from './elements/RadioButtons'
import Button from './elements/Button'
// IMPORT COMPONENTS
import PostConnections from './PostConnections'
// IMPORT COPY
import copy from '../copy/PostsPageCopy'

import styles from './PostSettings.module.css'
import sidePanelStyles from './SidePanel.module.css'

const postSettingOptions = [
  {
    value: true,
    label: 'Yes',
    name: 'posts-enabled',
  },
  {
    value: false,
    label: 'No',
    name: 'posts-disabled',
  },
]

const PostsSettings = () => {
  // Get artist context
  const { artist } = React.useContext(ArtistContext)
  // Get side panel context
  const { setSidePanelButton, toggleSidePanel } = React.useContext(SidePanelContext)
  // Define initial post settings
  const initialPostSettings = React.useRef({
    globalPostSettings: true,
  })
  // Update post status settings
  const [globalPostSettings, setGlobalPostSettings] = React.useState(initialPostSettings.current.globalPostSettings)
  const updateGlobalStatus = (value) => {
    setGlobalPostSettings(value)
  }
  // Define submit function
  const handleSubmit = React.useCallback(() => {
    console.log('globalPostSettings', globalPostSettings)
    // If nothing has changed, just close the side panel
    const { globalPostSettings: initialGlobalPostSettings } = initialPostSettings.current
    if (initialGlobalPostSettings === globalPostSettings) {
      toggleSidePanel()
      return
    }
    console.log('loading')
  }, [globalPostSettings])
  // Define sidepanel button
  const SidepanelButton = () => {
    return (
      <Button version="green" onClick={handleSubmit}>
        Save changes
      </Button>
    )
  }
  // Update sidepanel button when global post settings change
  React.useEffect(() => {
    setSidePanelButton(SidepanelButton)
  }, [globalPostSettings])

  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
      <div className="content">
        {/* GLOBAL POST STATE SELECTOR */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Post Status</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalToggleIntro} />
          <RadioButtons
            className="settingSection__options"
            buttonOptions={postSettingOptions}
            onChange={updateGlobalStatus}
            selectedValue={globalPostSettings}
          />
        </div>
        {/* CONNECTIONS */}
        <div className={styles.settingSection}>
          <h3 className="settingSection__header">Connections</h3>
          <MarkdownText className="settingSection__intro" markdown={copy.globalConnectionsIntro} />
          <PostConnections className={styles.connectionsList} artist={artist} />
        </div>
      </div>
    </section>
  )
}

export default PostsSettings
