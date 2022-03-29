module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://tryfeed.co',
        permanent: false,
      },
      {
        source: '/instagram',
        destination: 'https://tryfeed.co',
        permanent: false,
      },
    ]
  },
}
