import produce from 'immer'

import * as utils from '@/helpers/utils'
import * as server from '@/app/helpers/appServer'
import * as api from '@/helpers/api'
import { track } from '@/helpers/trackingHelpers'

// * UTILS
// ------------

export const defaultFolderId = '_default'
export const integrationsFolderId = '_integrations'
export const defaultPostLinkId = '_default'
export const usedLinkErrorCode = 'link_reference_error'

export const folderStatesStorageKey = 'linkFolderStates'

export const dummyLinks = [
  {
    id: '0',
    name: 'Folder 1',
    isDefaultLink: false,
    links: [
      {
        id: '1',
        folder_id: '_default',
        href: 'https://www.website.com/',
        name: 'Link 1',
        isDefaultLink: false,
      },
      {
        id: '2',
        folder_id: '_default',
        href: 'https://www.website.com/',
        name: 'Link 2',
        isDefaultLink: false,
      },
    ],
    type: 'folder',
  },
  {
    id: '3',
    folder_id: '_default',
    href: 'https://www.website.com/',
    name: 'Link 3',
    isDefaultLink: false,
  },
  {
    id: '4',
    folder_id: '_default',
    href: 'https://www.website.com/',
    name: 'Link 4',
    isDefaultLink: false,
  },
]

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

const formatLinkForComparison = (link) => {
  if (! link) return

  return link
    .replace(/\/?(\?.*)?$/, '') // remove utm tags & query params
    .replace(/\/?(#.*)?$/, '') // remove page anchors
    .replace(/^((http|https):\/\/)(www\.)?(.+)/, '$4') // remove protocol and www subdomain
}

// Get link by ID
export const getLinkById = (linkFolders, linkId) => {
  if (! linkId) return null

  const allLinks = linkFolders.reduce((arr, { links }) => {
    return [...arr, ...links]
  }, [])
  return allLinks.find(({ id }) => id === linkId)
}

// Get link by platform
export const getLinkByPlatform = (linkFolders, linkPlatform) => {
  const allLinks = linkFolders.reduce((arr, { links }) => {
    return [...arr, ...links]
  }, [])
  return allLinks.find(({ platform }) => platform === linkPlatform)
}

// Get link by href
export const getLinkByHref = (linkFolders, linkHref) => {
  const allLinks = linkFolders.reduce((arr, { links }) => {
    return [...arr, ...links]
  }, [])
  return allLinks.find(({ href }) => {
    if (! href) return null

    return formatLinkForComparison(href) === formatLinkForComparison(linkHref)
  })
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
  const createNewFolder = !! folderName
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
    // If deleting last link of folder, also delete the folder
    const folder = savedFolders.find(({ id }) => id === folderId)
    if (! folder || folder.totalLinks > 1) return { res: deleteLinkRes }
    await server.updateFolder(artistId, folder, 'delete', force)
    return { res: deleteLinkRes }
  }
}

// DEFAULT LINK
/**
 * @param {string} linkId
 * @returns {Promise<any>}
 */
export const setDefaultLink = async ({ artistId, linkId, hasSalesObjective }) => {
  return server.setLinkAsDefault(artistId, linkId, hasSalesObjective)
}

// * UPDATE STORE AFTER CHANGES
// ----------------------------

// EDITING DEFAULT LINK
export const afterEditDefaultLink = ({ newLink, defaultLink }) => {
  return produce(defaultLink, (draftDefaultLink) => {
    draftDefaultLink.name = newLink.name
    draftDefaultLink.href = newLink.href
    draftDefaultLink.folder_id = newLink.folder_id
  })
}


// EDIT LINK
export const afterEditLink = ({ newLink, oldLink, nestedLinks, defaultLink }) => {
  // TRACK
  const { host: linkDomain } = utils.parseUrl(newLink.href)
  track('edit_link', {
    linkDomain,
  })

  const { folder_id: newLinkFolderId, folder_name: newFolderName, id: linkId } = newLink
  const { folder_id: oldFolderId } = oldLink
  const hasMovedFolder = newLinkFolderId !== oldFolderId
  const isDefaultLink = newLink.id === defaultLink.id

  // Add the default link prop to the new link
  const newLinkUpdated = produce(newLink, (newLinkDraft) => { newLinkDraft.isDefaultLink = isDefaultLink })

  // UPDATE DEFAULT LINK (if needed)
  const defaultLinkUpdated = isDefaultLink ? afterEditDefaultLink({ newLink, defaultLink }) : null

  // Edit link in same folder
  if (! hasMovedFolder) {
    const nestedLinksUpdated = produce(nestedLinks, (draftNestedLinks) => {
      const folderIndex = draftNestedLinks.findIndex((folder) => folder.id === newLinkFolderId)
      const linkIndex = draftNestedLinks[folderIndex].links.findIndex((link) => link.id === linkId)
      // Update link
      draftNestedLinks[folderIndex].links[linkIndex] = newLinkUpdated
    })

    return { nestedLinksUpdated, defaultLinkUpdated }
  }

  // Edit link in different folder...
  const { folder_id: newFolderId } = newLinkUpdated
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  const newFolderIndex = nestedLinks.findIndex(({ id }) => id === newFolderId)
  // REBUILD STATE
  const nestedLinksUpdated = produce(nestedLinks, (draftNestedLinks) => {
    // Add to new folder (if exists)
    if (newFolderIndex > -1) {
      draftNestedLinks[newFolderIndex].links.push(newLinkUpdated)
    // Else create new folder
    } else {
      // Create new folder
      const newFolder = {
        id: newFolderId,
        name: newFolderName,
        links: [newLinkUpdated],
      }
      draftNestedLinks.push(newFolder)
    }
    // Remove from old folder
    const oldFolderLinks = draftNestedLinks[oldFolderIndex].links
    draftNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== newLink.id)
  })

  return { nestedLinksUpdated, defaultLinkUpdated }
}

// DELETE LINK
export const afterDeleteLink = ({ oldLink, nestedLinks }) => {
  const { folder_id: oldFolderId } = oldLink
  const { host: linkDomain } = utils.parseUrl(oldLink.href)
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  // TRACK
  track('delete_link', {
    linkDomain,
  })
  // REBUILD STATE
  const nestedLinksUpdated = produce(nestedLinks, (draftNestedLinks) => {
    // Remove link from folder
    const oldFolderLinks = draftNestedLinks[oldFolderIndex].links
    draftNestedLinks[oldFolderIndex].links = oldFolderLinks.filter(({ id }) => id !== oldLink.id)
  })
  return { nestedLinksUpdated }
}

// ADD LINK
export const afterAddLink = ({ newLink, nestedLinks }) => {
  const { folder_id: newFolderId, folder_name: newFolderName } = newLink
  const newFolderIndex = nestedLinks.findIndex(({ id }) => id === newFolderId)
  // TRACK
  const { host: linkDomain } = utils.parseUrl(newLink.href)
  track('saved_new_link', {
    linkDomain,
  })
  // REBUILD STATE
  const nestedLinksUpdated = produce(nestedLinks, (draftNestedLinks) => {
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
  return { nestedLinksUpdated }
}

// EDIT FOLDER
export const afterEditFolder = ({ newFolder, nestedLinks }) => {
  const { id: folderId } = newFolder
  const folderIndex = nestedLinks.findIndex(({ id }) => id === folderId)
  const nestedLinksUpdated = produce(nestedLinks, (draftNestedLinks) => {
    // Edit folder name
    draftNestedLinks[folderIndex].name = newFolder.name
  })
  return { nestedLinksUpdated }
}

// DELETE FOLDER
export const afterDeleteFolder = ({ oldFolder, nestedLinks }) => {
  const { id: oldFolderId } = oldFolder
  const oldFolderIndex = nestedLinks.findIndex(({ id }) => id === oldFolderId)
  const nestedLinksUpdated = produce(nestedLinks, (draftNestedLinks) => {
    // Remove folder
    draftNestedLinks.splice(oldFolderIndex, 1)
  })
  return { nestedLinksUpdated }
}

// Validate link
/**
* @param {string} link
* @returns {Promise<object>} { isValid, link }
*/
export const validateLink = (link) => {
  const requestUrl = '/actions/validate_link'
  const payload = { link }

  const errorTracking = {
    category: 'Link',
    action: 'Validate link',
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}
