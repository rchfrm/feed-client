import Document, { Html, Main, NextScript } from 'next/document'
import TheHead from '@/elements/TheHead'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const siteUrl = 'https://admin.tryfeed.co'
    const metaDescription = ''

    return (
      <Html lang="en">
        <TheHead siteUrl={siteUrl} metaDescription={metaDescription} noIndex />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
