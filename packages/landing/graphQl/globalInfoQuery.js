const getQuery = () => `
query {
  globalInfo {
    blogLink
    feedLoginLink
    feedSignUpLink
    footerLinks {
      id
      links
    }
  }
  home {
    legalPages {
      id
      slug
      title
    }
  }
}
`

module.exports = getQuery
