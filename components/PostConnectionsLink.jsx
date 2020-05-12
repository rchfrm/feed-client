// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
import Input from './elements/Input'
// IMPORT HELPERS
import * as utils from './helpers/utils'
// IMPORT STYLES
import styles from './Integrations.module.css'

const PostConnectionsLink = ({
  platform,
  setValue,
  setDisabled,
  url,
  valid,
  value = '',
}) => {
  // FUNCTIONS
  // Generate phrase for input placeholder
  const placeholder = platform => {
    const beginning = 'Enter the URL of your'

    if (platform === 'website') {
      return `${beginning} ${platform}`
    } if (platform === 'youtube') {
      return `${beginning} ${utils.capitalise(platform)} channel`
    }

    let correctedPlatform = platform
    if (correctedPlatform === 'apple') {
      correctedPlatform = 'Apple Music'
    } else {
      correctedPlatform = utils.capitalise(correctedPlatform)
    }

    return `${beginning} ${correctedPlatform} page`
  }

  // Handle changes in the input field
  const handleChange = e => {
    e.preventDefault()
    setDisabled(false)
    setValue(e.target.value)
    setValue(e.target.value || '')
  }
  // END FUNCTIONS

  if (valid) {
    return (
      <a className={styles.a} href={url} target="_blank" rel="noopener noreferrer">{utils.shortenUrl(url)}</a>
    )
  }
  return (
    <Input
      className={styles.input}
      name="Connection"
      version="text"
      label=""
      placeholder={value || placeholder(platform)}
      value={value}
      handleChange={handleChange}
    />
  )
}

export default PostConnectionsLink
