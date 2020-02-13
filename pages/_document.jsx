import Document, { Html, Head, Main, NextScript } from 'next/document'
import Favicons from '../components/Favicons'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* PWA config and Favicons */}
          <Favicons />
          {/* Include Stripe in the head */}
          <script src="https://js.stripe.com/v3/" />
          {/* Meta details (title is set in _app.js) */}
          <meta key="meta-description" name="description" content="Audience growth for artists, built by archForm" />
          <meta key="meta-og:title" property="og:title" content="archForm" />
          <meta key="meta-og:url" property="og:url" content="https://archform.ltd" />
          <meta key="meta-og:image" property="og:image" content="https://s3.eu-west-2.amazonaws.com/archform.ltd/media/Fb_OG.png" />
          <meta key="meta-og:site_name" property="og:site_name" content="archForm" />
          <meta key="meta-og:description" property="og:description" content="archForm" />
          <meta key="meta-twitter:card" name="twitter:card" content="summary_large_image" />
          <meta key="meta-twitter:site" name="twitter:site" content="@rchfrm" />
          <meta key="meta-twitter:creator" name="twitter:creator" content="@rchfrm" />
          <meta key="meta-twitter:domain" name="twitter:domain" content="https://archform.ltd" />
          <meta key="meta-twitter:title" name="twitter:title" content="archForm" />
          <meta key="meta-twitter:description" name="twitter:description" content="archForm" />
          <meta key="meta-twitter:image" name="twitter:image" content="https://s3.eu-west-2.amazonaws.com/archform.ltd/media/Tw_OG.png" />
          <meta key="meta-twitter:image:width" name="twitter:image:width" content="600px" />
          <meta key="meta-twitter:image:height" name="twitter:image:height" content="315px" />
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
