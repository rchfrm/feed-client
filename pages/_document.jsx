import Document, { Html, Main, NextScript } from 'next/document'
import TheHead from '@/TheHead'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const siteUrl = 'https://beta.getfed.app'

    return (
      <Html lang="en">
        <TheHead siteUrl={siteUrl} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
