// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from '@/contexts/ArtistContext'
// IMPORT ELEMENTS
import PostLinkSaveButton from '@/app/PostLinkSaveButton'
import Select from '@/elements/Select'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
// IMPORT STYLES
import styles from '@/app/PostItem.module.css'


const PostLinkOptions = ({
  artist,
  postLinkPlatform,
  setPostLinkPlatform,
  setAdUrlDialogueOpen,
}) => {
  const links = Object.entries(artist.URLs).reduce((allLinks, [linkType, linkValue]) => {
    if (!linkValue) return allLinks
    const linkName = utils.extractPlatformFromPriorityDSP(linkType)
    const link = { name: linkName, value: linkName }
    return [...allLinks, link]
  }, [])

  // Include add new link option (if necessary)
  const allLinkComplete = Object.values(artist.URLs).every((value) => value)
  if (!allLinkComplete) {
    links.push({
      name: '+ Add another link',
      value: 'add-url',
    })
  }

  // Handle changes in the drop down
  const handleChange = (e) => {
    const chosenLink = e.target.value
    // Update chosen link
    setPostLinkPlatform(chosenLink)
    // Toggle choose link dialogue
    const showChooseLink = !!(chosenLink === 'add-url')
    setAdUrlDialogueOpen(showChooseLink)
  }

  return (
    <div>
      <div className={styles.linkSelection}>
        <Select
          className={styles.linkSelection__select}
          handleChange={handleChange}
          name="Choose link"
          options={links}
          selectedValue={postLinkPlatform}
          version="box"
        />
      </div>
    </div>
  )
}

export default PostLinkOptions
