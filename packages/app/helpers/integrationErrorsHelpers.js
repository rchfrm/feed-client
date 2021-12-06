const testForMissingPages = (scopes) => {
  if (scopes.length > 2) return false
  if (
    scopes.includes('pages_manage_ads')
    && scopes.includes('pages_show_list')
  ) {
    return true
  }
  return false
}

export default testForMissingPages
