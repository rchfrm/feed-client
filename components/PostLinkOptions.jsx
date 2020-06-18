// IMPORT PACKAGES
import React from 'react'
// IMPORT ELEMENTS
import Select from '@/elements/Select'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
// IMPORT STYLES
import styles from '@/PostItem.module.css'


const PostLinkOptions = ({
  artist,
  postLinkPlatform,
  setPostLinkPlatform,
  setAddUrl,
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
    setAddUrl(showChooseLink)
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
