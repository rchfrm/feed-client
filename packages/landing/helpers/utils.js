import url from 'url'

export const getLinkType = (href) => {
  if (href.startsWith('/')) return 'internal'
  if (href.startsWith('#')) return 'pageAnchor'
  if (href.startsWith('mailto:')) return 'email'
  return 'external'
}

export const formatCurrency = (value, currency = 'GBP', hideMinorUnits) => {
  if (value === null || typeof value === 'undefined' || Number.isNaN(value)) return
  const currencyToUse = currency === null ? 'GBP' : currency
  const valueFloat = parseFloat(value)
  return valueFloat.toLocaleString('en-GB', {
    style: 'currency',
    currency: currencyToUse,
    ...(hideMinorUnits && { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
  })
}

// Use this to parse local URLs to get path and queries
/**
 * @param {array} arr the array to sort
 * @param {string} key the value of the prop to sort by
 * @param {string} sortDirection
 * @returns {array}
 */
export const sortArrayByKey = (arr, key, sortDirection = 'asc') => {
  return arr.sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })
}

// Use this to parse local URLs to get path and queries
/**
 * @param {string} urlString
 * @returns {object} {
 *  pathname,
 *  queryString,
 *  query: {
 *    queryName: 'queryValue',
 *    ...
 *  }
 * }
 */
export const parseUrl = (urlString) => {
  if (! urlString) return {}
  const {
    host,
    protocol,
    pathname,
    query,
  } = url.parse(urlString)
  const basicUrl = `${protocol}//${host}${pathname}`
  const res = {
    host,
    protocol,
    pathname,
    basicUrl,
  }
  if (! query) {
    return {
      ...res,
      queryString: '',
      query: null,
    }
  }
  // Format query into key value object
  const queryValues = query.split('&')
  const queryObject = queryValues.reduce((result, query) => {
    const [queryKey, queryValue = ''] = query.split('=')
    result[queryKey] = queryValue
    return result
  }, {})
  // Return result
  return {
    ...res,
    queryString: query,
    query: queryObject,
  }
}
