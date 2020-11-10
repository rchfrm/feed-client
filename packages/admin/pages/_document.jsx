import Document, { Html, Head, Main, NextScript } from 'next/document'
import TheHead from '@/elements/TheHead'

const siteUrl = 'https://admin.tryfeed.co'
const metaDescription = ''
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <TheHead
            siteUrl={siteUrl}
            metaDescription={metaDescription}
            noIndex
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
