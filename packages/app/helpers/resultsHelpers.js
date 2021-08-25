/* eslint-disable import/prefer-default-export */
import * as api from '@/helpers/api'
import copy from '@/app/copy/ResultsPageCopy'

const formatResultsData = (data) => {
  const formattedData = Object.entries(data).reduce((newObject, [key, value]) => {
    const { asset, ...stats } = value
    const [postKey, postValue] = Object.entries(asset)[1]

    newObject[key] = stats
    newObject.posts.push({
      text: `${postValue} ${copy.popularPostDescription(postKey)}`,
      ...value.asset,
    })
    return newObject
  }, { posts: [] })

  return formattedData
}

// GET AD RESULTS SUMMARY
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getAdResultsSummary = async (artistId) => {
  // TODO: Switch endpoint when back-end is ready
  // const endpoint = `/artists/${artistId}/ad_results_summary`
  const endpoint = 'http://localhost:3000/stats.json'
  const payload = {}
  const errorTracking = {
    category: 'Results',
    action: 'Get ad results summary',
  }
  const { res } = await api.requestWithCatch('get', endpoint, payload, errorTracking)
  const formattedData = formatResultsData(res.summary)
  return formattedData
}
