import Document, { Html, Head, Main, NextScript } from 'next/document'
import TheHead from '@/elements/TheHead'

const siteUrl = 'https://beta.tryfeed.co'
const metaDescription = 'Simplify the process of growing your audience through automated social media promotion'
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
            noIndex={process.env.build_env === 'staging'}
            includeStripe
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
