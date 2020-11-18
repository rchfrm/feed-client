import produce from 'immer'

import * as utils from '@/helpers/utils'
import { getPostLinkData } from '@/app/helpers/postsHelpers'
import * as server from '@/app/helpers/appServer'

// * UTILS
// ------------

export const defaultFolderId = '_default'
export const integrationsFolderId = '_integrations'
export const defaultPostLinkId = '_default'
export const usedLinkErrorCode = 'link_reference_error'

export const folderStatesStorageKey = 'linkFolderStates'

// Split links into loose and folders
export const splitLinks = (nestedLinks = []) => {
  return nestedLinks.reduce((obj, folder) => {
    const { id: folderId, links: folderLinks } = folder
    // Split out loose links
    if (folderId === defaultFolderId) {
      obj.looseLinks = folderLinks
      return obj
    }
    // Split out integration links
    if (folderId === integrationsFolderId) {
      obj.integrationLinks = folderLinks
      return obj
    }
    obj.linkFolders = [...obj.linkFolders, folder]
    return obj
  }, { looseLinks: [], integrationLinks: [], linkFolders: [] })
}

// Get link by ID
export const getLinkById = (linkFolders, linkId) => {
  const allLinks = linkFolders.reduce((arr, { links }) => {
    return [...arr, ...links]
  }, [])
  return allLinks.find(({ id }) => id === linkId)
}

// * SERVER
// ------------

// FETCH SAVED LINKS
export const fetchSavedLinks = async (artistId) => {
  return server.fetchSavedLinks(artistId)
}

// SAVE FOLDER
/**
 * @param {object} folder
 * @param {string} action 'edit' | 'delete'
 * @returns {Promise<any>}
 */
export const saveFolder = async (artistId, folder, action = 'edit', isDefaultLinkInFolder, force = false) => {
  if (action === 'delete' && isDefaultLinkInFolder) {
    return {
      error: { message: 'You cannot delete the folder that contains the default link. If you want to remove it please choose another default link.' },
    }
  }
  // UPDATE FOLDER
  return server.updateFolder(artistId, folder, action, force)
}

// SAVE LINK
/**
 * @param {string} artistId
 * @param {object} link
 * @param {string} action 'add' | 'edit' | 'delete'
 * @returns {Promise<any>}
 */
export const saveLink = async (artistId, link, savedFolders, action = 'add', force = false) => {
  // Disable deleting default link
  // (you shouldn't be able to do this, but just in case...)
  if (action === 'delete' && link.defaultLink) {
    return {
      error: { message: 'You cannot delete the default link. If you want to remove it please choose another default link.' },
    }
  }
  const { href, name, folderName, folder_id: folderId, id: linkId } = link
  // ADD link
  const hrefSanitised = utils.enforceUrlProtocol(href)
  const createNewFolder = !!folderName
  let { folder_id } = link
  // ADD or EDIT
  if (action === 'add' || action === 'edit') {
    // Create new folder if necessary
    if (createNewFolder) {
      const folder = { name: folderName }
      const { res: savedFolder, error } = await server.updateFolder(artistId, folder, 'add')
      if (error) return { error }
      folder_id = savedFolder.id
    }
    // If a folder is being added, do that first
    const { res, error } = await server.updateLink(artistId, { id: linkId, href: hrefSanitised, name, folder_id }, action)
    if (error) return { error }
    if (createNewFolder) {
      const newLink = { ...res, folder_name: folderName }
      return { res: newLink }
    }
    return { res }
  }
  // DELETE link
  if (action === 'delete') {
    const { res: deleteLinkRes, error } = await server.updateLink(artistId, { id: linkId }, action, force, usedLinkErrorCode)
    if (error) return { error }
    // If deleting last link of folder, also delete
    const folder = savedFolders.find(({ id }) => id === folderId)
    if (!folder) return { res: deleteLinkRes }
    await server.updateFolder(artistId, folder, 'delete', force)
    return { res: deleteLinkRes }
  }
  console.error('No action defined in saveLink')
}

// DEFAULT LINK
/**
 * @param {string} linkId
 * @returns {Promise<any>}
 */
export const setDefaultLink = async (artistId, linkId) => {
  return server.setLinkAsDefault(artistId, linkId)
}


// LINKS ON A POST
/**
 * @param {string} linkId
 * @returns {Promise<any>}
 */
export const setPostLink = async (artistId, linkId, assetId) => {
  // Handle choosing "Use default" from post link
  if (linkId === '_default') {
    linkId = null
  }
  const { res: newPost, error } = await server.setPostLink(artistId, assetId, linkId)
  if (error) return { error }
  // Get new link ID from response
  const linkData = getPostLinkData(newPost)
  return { res: linkData }
}


// * UPDATE STORE AFTER CHANGES
// --------------------------

// EDIT LINK
export const afterEditLink = ({ newLink, oldLink, nestedLinks }) => {
  const { folder_id: newLinkFolderId, folder_name: newFolderName, id: linkId } = newLink
  const { folder_id: oldFolderId } = oldLink
  const hasMovedFolder = newLinkFolderId !== oldFolderId
  // Edit link in same folder
  if (!hasMovedFolder) {
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
    // Add to new folder (if exists)
    if (newFolderIndex > -1) {
      draftNestedLinks[newFolderIndex].links.push(newLink)
    }
    // Create new folder if necessary
    if (newFolderIndex === -1) {
      // Create new folder
      const newFolder = {
        id: newFolderId,
        name: newFolderName,
        links: [newLink],
      }
      draftNestedLinks.push(newFolder)
    }
    // Remove from old folder
    const oldFolderLinks = draftNestedLinks[oldFolderIndex].links
    draftNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== newLink.id)
  })
}

// DELETE LINK
export const afterDeleteLink = ({ oldLink, nestedLinks }) => {
  const { folder_id: oldFolderId } = oldLink
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  return produce(nestedLinks, draftNestedLinks => {
    // Remove link from folder
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

// EDIT FOLDER
export const afterEditFolder = ({ newFolder, nestedLinks }) => {
  const { id: folderId } = newFolder
  const folderIndex = nestedLinks.findIndex(({ id }) => id === folderId)
  return produce(nestedLinks, draftNestedLinks => {
    // Edit folder name
    draftNestedLinks[folderIndex].name = newFolder.name
  })
}

// DELETE FOLDER
export const afterDeleteFolder = ({ oldFolder, nestedLinks }) => {
  const { id: oldFolderId } = oldFolder
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  return produce(nestedLinks, draftNestedLinks => {
    // Remove folder
    draftNestedLinks.splice(oldFolderIndex, 1)
  })
}
