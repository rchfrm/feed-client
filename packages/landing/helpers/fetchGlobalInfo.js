const path = require('path')
const fs = require('fs')

// CONSTANTS
const cachedDataDir = path.resolve(process.cwd(), 'tempData')
const getDatoData = require('./getDatoData')
const getQuery = require('../graphQl/globalInfoQuery')

// FORMAT DATA
const getFormattedData = (data) => {
  const { globalInfo, home } = data
  const legalLinks = home.legalPages.map(({ title, slug }) => {
    return {
      title,
      href: `/legal/${slug}`,
    }
  })
  return {
    joinLink: globalInfo.feedSignUpLink,
    loginLink: globalInfo.feedLoginLink,
    blogLink: globalInfo.blogLink,
    footerLinks: globalInfo.footerLinks,
    legalLinks,
  }
}

// LOAD GLOBAL DATA FROM DATO
const fetchGlobalInfo = () => {
  const query = getQuery()
  const pageKey = 'globalInfo'
  const forceLoad = true
  return getDatoData(query, pageKey, forceLoad).then((data) => {
    const dataFormatted = getFormattedData(data.data)
    const dataString = JSON.stringify(dataFormatted)
    const cachedFile = `${cachedDataDir}/${pageKey}.json`
    fs.writeFileSync(cachedFile, dataString)
  })
}

module.exports = fetchGlobalInfo
