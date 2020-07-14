/* eslint-disable import/prefer-default-export */

import axios from 'axios'
import path from 'path'
import fs from 'fs'

// Get dato consts
const datoUrl = 'https://graphql.datocms.com'
const datoKey = process.env.dato_key
const cachedDataDir = '../shared/datoQueriesCached/'
// Decide whether to fetch data or not
const fetchLiveData = process.env.build_env !== 'development'

const axiosClient = axios.create({
  baseURL: datoUrl,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${datoKey}`,
    'Content-Type': 'application/json',
  },
})

const getDatoData = async (query, cachedFilename) => {
  // Return cached data (if running locally and cached version exists)
  if (!fetchLiveData) {
    // Check if cached data exists
    const currentPath = process.cwd()
    const cachedDataPath = path.resolve(currentPath, `${cachedDataDir}${cachedFilename}.json`)
    const cachedDataExists = fs.existsSync(cachedDataPath)
    if (cachedDataExists) {
      const cachedData = JSON.parse(fs.readFileSync(cachedDataPath, 'utf8'))
      return cachedData
    }
  }

  // Else get live data
  const { status, statusText, data } = await axiosClient({
    url: '/',
    method: 'POST',
    data: { query },
  })

  if (status !== 200) {
    const errorMessage = statusText
    throw new Error(errorMessage)
  }

  if (data.errors) {
    const errorMessage = data.errors.map(error => error.message).join(',')
    throw new Error(errorMessage)
  }

  return data
}

export default getDatoData
