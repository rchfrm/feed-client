import React from 'react'

import MarkdownText from './elements/MarkdownText'
import RadioButtons from './elements/RadioButtons'


import copy from '../copy/PostsPageCopy'

import styles from './PostSettings.module.css'
import sidePanelStyles from './SidePanel.module.css'

const postSettingOptions = [
  {
    value: true,
    label: 'All posts enabled',
    name: 'posts-enabled',
  },
  {
    value: false,
    label: 'All posts disabled',
    name: 'posts-disabled',
  },
]

const PostsSettings = () => {
  // Update post settings
  const [currentPostsSetting, setCurrentPostsSetting] = React.useState(true)
  const updateGlobalStatus = (value) => {
    setCurrentPostsSetting(value)
  }

  return (
    <section>
      <h2 className={sidePanelStyles.SidePanel__Header}>Post Settings</h2>
      <div className="content">
        {/* GLOBAL POST STATE SELECTOR */}
        <div className="settingSection">
          <MarkdownText className="settingSection__intro" markdown={copy.globalToggleIntro} />
          <RadioButtons
            className="settingSection__options"
            buttonOptions={postSettingOptions}
            onChange={updateGlobalStatus}
            selectedValue={currentPostsSetting}
          />
        </div>
      </div>
    </section>
  )
}

export default PostsSettings
