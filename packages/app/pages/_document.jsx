import Document, { Html, Main, NextScript } from 'next/document'
import TheHead from '@/elements/TheHead'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const siteUrl = 'https://beta.getfed.app'
    const metaDescription = 'Simplify the process of growing your audience through automated social media promotion'

    return (
      <Html lang="en">
        <TheHead siteUrl={siteUrl} metaDescription={metaDescription} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
