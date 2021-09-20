export default function MessengerChatPlugin() {
  return (
    <>
      {/* Load Facebook SDK for JavaScript */}
      <div id="fb-root" />

      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  xfbml: true,
                  version: 'v7.0'
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

      {/* Your Chat Plugin code */}
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="110394157234637"
        theme_color="#26547C"
        logged_in_greeting="👋 Do you have any questions or want to chat? We're on hand to talk"
        logged_out_greeting="👋 Do you have any questions or want to chat? We're on hand to talk"
      />

    </>
  )
}
