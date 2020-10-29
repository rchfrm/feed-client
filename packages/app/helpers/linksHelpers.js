import produce from 'immer'

// * UPDATE STORE AFTER CHANGES
// --------------------------

// EDIT LINK
export const afterEditLink = ({ newLink, oldLink, nestedLinks }) => {
  const { folder_id: newLinkFolderId, id: linkId } = newLink
  const { folder_id: oldFolderId } = oldLink
  const hasMovedFolder = newLinkFolderId !== oldFolderId
  // Edit link in same folder
  if (!hasMovedFolder) {
    // EDIT NESTED LINK
    return produce(nestedLinks, draftNestedLinks => {
      const folderIndex = draftNestedLinks.findIndex((folder) => folder.id === newLinkFolderId)
      const linkIndex = draftNestedLinks[folderIndex].links.findIndex((link) => link.id === linkId)
      // Update link
      draftNestedLinks[folderIndex].links[linkIndex] = newLink
    })
  }
  // Edit link in different folder...
  const { folder_id: newFolderId } = newLink
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  const newFolderIndex = nestedLinks.findIndex(({ id }) => id === newFolderId)
  // Update nested links
  return produce(nestedLinks, draftNestedLinks => {
    // Add to new folder
    draftNestedLinks[newFolderIndex].links.push(newLink)
    const oldFolderLinks = draftNestedLinks[oldFolderIndex].links
    console.log('oldFolderLinks', oldFolderLinks)
    draftNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== newLink.id)
  })
}

// DELETE LINK
export const afterDeleteLink = ({ oldLink, nestedLinks }) => {
  const { folder_id: oldFolderId } = oldLink
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  return produce(nestedLinks, draftNestedLinks => {
    // Remove from folder
    const oldFolderLinks = draftNestedLinks[oldFolderIndex].links
    draftNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== oldLink.id)
  })
}

// ADD LINK
export const afterAddLink = ({ newLink, nestedLinks }) => {
  const { folder_id: newFolderId, folder_name: newFolderName } = newLink
  const newFolderIndex = nestedLinks.findIndex(({ id }) => id === newFolderId)
  return produce(nestedLinks, draftNestedLinks => {
    // Add to folder (if exists)
    if (newFolderIndex > -1) {
      draftNestedLinks[newFolderIndex].links.push(newLink)
      return
    }
    // Create new folder
    const newFolder = {
      id: newFolderId,
      name: newFolderName,
      links: [newLink],
    }
    draftNestedLinks.push(newFolder)
  })
}

