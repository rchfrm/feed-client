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
          <div id="fb-root" />
          <div id="fb-customer-chat" className="fb-customerchat" />
          <script dangerouslySetInnerHTML={{
            __html: `
              var chatbox = document.getElementById('fb-customer-chat');
              chatbox.setAttribute("page_id", "110394157234637");
              chatbox.setAttribute("attribution", "biz_inbox");

              window.fbAsyncInit = function() {
                FB.init({
                  xfbml: true,
                  version: 'v11.0'
                });
              };

              (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_GB/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `,
          }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
