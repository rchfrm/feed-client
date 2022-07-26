const getQuery = () => `
query {
  globalInfo {
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
  _site {
    globalSeo {
      siteName
      twitterAccount
      fallbackSeo {
        description
        image {
          url
        }
      }
    }
  }
}
`

module.exports = getQuery
