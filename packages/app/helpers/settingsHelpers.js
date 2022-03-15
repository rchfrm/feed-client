import get from 'lodash/get'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'
import { requestWithCatch } from '@/helpers/api'

// PIXELS
// ------

// Get currrent pixel
/**
* @param {object} artist
* @returns {string}
*/
export const getCurrentPixelId = (artist) => {
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')
  return facebookIntegration?.pixel_id
}

// Get artist pixel (SERVER)
/**
* @param {string} artistId
* @returns {Promise<object>} { res, error }
*/
export const getArtistPixels = (artistId) => {
  const requestUrl = `/artists/${artistId}/pixels`
  const errorTracking = {
    category: 'Pixels',
    action: 'Get artist pixels',
  }
  return requestWithCatch('get', requestUrl, null, errorTracking)
}

// Get pixel info (SERVER)
/**
* @param {string} artistId
* @param {string} pixelId
* @returns {Promise<object>} { res, error }
*/
export const getPixelInfo = (artistId, pixelId) => {
  const requestUrl = `/artists/${artistId}/pixels/${pixelId}`
  const errorTracking = {
    category: 'Pixels',
    action: 'Get pixels info',
  }
  return requestWithCatch('get', requestUrl, null, errorTracking)
}

// Create new pixel (SERVER)
/**
* @param {string} artistId
* @param {string} pixelName
* @returns {Promise<object>} { res, error }
*/
export const createNewPixel = (artistId, pixelName) => {
  const requestUrl = `/artists/${artistId}/pixels`
  const payload = {
    name: pixelName,
  }
  const errorTracking = {
    category: 'Pixels',
    action: 'Create new pixel',
  }
  return requestWithCatch('post', requestUrl, payload, errorTracking)
}

// Create new pixel (SERVER)
/**
* @param {string} artistId
* @param {string} pixelId
* @returns {Promise<object>} { res, error }
*/
export const setPixel = async (artistId, pixelId) => {
  const requestUrl = `artists/${artistId}`
  const payload = {
    integrations: {
      facebook: {
        pixel_id: pixelId,
      },
    },
  }
  const errorTracking = {
    category: 'Pixels',
    action: 'Set pixel',
  }
  const { res, error } = await requestWithCatch('patch', requestUrl, payload, errorTracking)
  if (error) return { error }
  // Get new pixel ID from res
  const { integrations: newIntegrations } = res
  const newPixelId = get(newIntegrations, ['facebook', 'pixel_id'], '')
  return { newPixelId, newIntegrations }
}
