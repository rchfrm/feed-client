/* eslint-disable import/prefer-default-export */

import axios from 'axios'
import path from 'path'
import fs from 'fs'

// Get dato consts
const datoUrl = 'https://graphql.datocms.com'
const datoKey = process.env.dato_key
const cachedDataDir = '../shared/tempData/'
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

const getDatoData = async (query, cachedFilename, forceFetch) => {
  const currentPath = process.cwd()
  const cachedFile = `${cachedDataDir}${cachedFilename}.json`
  // Return cached data (if running locally and cached version exists)
  if (!fetchLiveData && !forceFetch) {
    // Check if cached data exists
    const cachedDataPath = path.resolve(currentPath, cachedFile)
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

  // Handle errors...
  if (status !== 200) {
    const errorMessage = statusText
    throw new Error(errorMessage)
  }

  if (data.errors) {
    const errorMessage = data.errors.map(error => error.message).join(',')
    throw new Error(errorMessage)
  }

  // Save data to cached file
  const dataString = JSON.stringify(data)
  fs.writeFileSync(cachedFile, dataString)

  return data
}

export default getDatoData
