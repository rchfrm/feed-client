import produce from 'immer'

import * as utils from '@/helpers/utils'

// UPDATE STORE AFTER CHANGES
// --------------------------

export const afterEditLink = ({ newLink, oldLink, nestedLinks }) => {
  const { folder_id: newLinkFolderId, id: linkId } = newLink
  const { folder_id: oldLinkFolderId } = oldLink
  const hasMovedFolder = newLinkFolderId !== oldLinkFolderId
  // Edit link in same folder
  if (!hasMovedFolder) {
    // EDIT NESTED LINK
    const newNestedLinks = produce(nestedLinks, oldNestedLinks => {
      const folderIndex = oldNestedLinks.findIndex((folder) => folder.id === newLinkFolderId)
      const linkIndex = oldNestedLinks[folderIndex].links.findIndex((link) => link.id === linkId)
      // Update link
      oldNestedLinks[folderIndex].links[linkIndex] = newLink
    })
    return newNestedLinks
  }
  // Edit link in different folder...
  const { folder_id: oldFolderId } = oldLink
  const { folder_id: newFolderId } = newLink
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  const newFolderIndex = nestedLinks.findIndex(({ id }) => id === newFolderId)
  // Update nested links
  const newNestedLinks = produce(nestedLinks, oldNestedLinks => {
    // Add to new folder
    const updatedFolder = oldNestedLinks[newFolderIndex].links.push(newLink)
    oldNestedLinks[newFolderIndex].links = utils.sortArrayByKey(updatedFolder, 'name')
    const oldFolderLinks = oldNestedLinks[oldFolderIndex].links
    oldNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== newLink.id)
  })
  return newNestedLinks
}

export const afterDeleteLink = ({ oldLink, nestedLinks }) => {
  return nestedLinks
}
