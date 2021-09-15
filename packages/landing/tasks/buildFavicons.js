const favicons = require('favicons')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const source = 'public/icons/icon.svg' // Source image(s). `string`, `buffer` or array of `string`
const outputDir = './public/pwa/'

const configuration = {
  path: '/pwa/', // Path for overriding default icons path. `string`
  appName: 'Feed', // Your application's name. `string`
  appShortName: null, // Your application's short_name. `string`. Optional. If not set, appName will be used
  appDescription: 'Simplify the process of growing your audience through automated social media promotion.',
  developerName: 'archForm',
  developerUrl: 'https://tryfeed.co',
  dir: 'auto', // Primary text direction for name, short_name, and description
  lang: 'en-GB', // Primary language for name and short_name
  background: '#F4F4F4',
  theme_color: '#0D1311',
  appleStatusBarStyle: 'black', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
  version: '1.0', // Your application's version string. `string`
  logging: false, // Print logs to console? `boolean`
  pixel_art: true, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
  loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
    //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
    //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    favicons: false, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
  },
}

const saveAssets = (images = [], files = []) => {
  const getDirName = path.dirname
  const assets = [...images, ...files]
  assets.forEach((image) => {
    const { name, contents } = image
    const outputPath = path.resolve(outputDir, name)
    mkdirp(getDirName(outputPath), (err) => {
      if (err) return console.error('err', err)
      fs.writeFile(outputPath, contents, () => {})
    })
  })
}

const buildMarkup = (htmlNodes = []) => {
  return htmlNodes.join('\n')
}

const callback = (error, response) => {
  if (error) {
    console.error(error.message) // Error description e.g. "An unknown error has occurred"
    return
  }
  const { images, files, html: htmlNodes } = response
  // Save images and manifest files
  saveAssets(images, files)
  // Log html
  const newFaviconMarkp = buildMarkup(htmlNodes)
  // Past this into Favicons.jsx
  console.log(newFaviconMarkp)
}

favicons(source, configuration, callback)
