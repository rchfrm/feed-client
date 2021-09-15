import React from 'react'
import PropTypes from 'prop-types'

import Script from 'next/script'

const SetupFacebookChatPlugin = ({ pageId }) => {
  // Stop here if in dev
  if (process.env.build_env === 'development') return null
  // Render
  return (
    <>
      <div id="fb-root" />
      <div id="fb-customer-chat" className="fb-customerchat" />
      <Script dangerouslySetInnerHTML={{
        __html: `
          var chatbox = document.getElementById('fb-customer-chat');
          chatbox.setAttribute("page_id", ${pageId});
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
    </>
  )
}

SetupFacebookChatPlugin.propTypes = {
  pageId: PropTypes.string.isRequired,
}

export default SetupFacebookChatPlugin
