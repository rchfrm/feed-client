import produce from 'immer'

import * as utils from '@/helpers/utils'

// UPDATE STORE AFTER CHANGES
// --------------------------

export const afterEditLink = ({ newLink, oldLink, nestedLinks }) => {
  const { folder_id: newLinkFolderId, id: linkId } = newLink
  const { folder_id: oldFolderId } = oldLink
  const hasMovedFolder = newLinkFolderId !== oldFolderId
  // Edit link in same folder
  if (!hasMovedFolder) {
    // EDIT NESTED LINK
    return produce(nestedLinks, oldNestedLinks => {
      const folderIndex = oldNestedLinks.findIndex((folder) => folder.id === newLinkFolderId)
      const linkIndex = oldNestedLinks[folderIndex].links.findIndex((link) => link.id === linkId)
      // Update link
      oldNestedLinks[folderIndex].links[linkIndex] = newLink
    })
  }
  // Edit link in different folder...
  const { folder_id: newFolderId } = newLink
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  const newFolderIndex = nestedLinks.findIndex(({ id }) => id === newFolderId)
  // Update nested links
  return produce(nestedLinks, oldNestedLinks => {
    // Add to new folder
    const updatedFolder = oldNestedLinks[newFolderIndex].links.push(newLink)
    oldNestedLinks[newFolderIndex].links = utils.sortArrayByKey(updatedFolder, 'name')
    const oldFolderLinks = oldNestedLinks[oldFolderIndex].links
    oldNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== newLink.id)
  })
}

export const afterDeleteLink = ({ oldLink, nestedLinks }) => {
  const { folder_id: oldFolderId } = oldLink
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  return produce(nestedLinks, oldNestedLinks => {
    // Remove from folder
    const oldFolderLinks = oldNestedLinks[oldFolderIndex].links
    oldNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== oldLink.id)
  })
}
