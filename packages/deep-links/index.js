const functions = require('firebase-functions')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const UserAgent = require('./helpers/userAgent')

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.get('/instagram/:handle', (req, res) => {
  const { params: { handle }, headers } = req
  console.log(handle)
  const userAgent = UserAgent(headers['user-agent'])

  if (userAgent.isIOS) {
    res.redirect(308, `instagram://user?username=${handle}`)
  }

  if (userAgent.isAndroid) {
    res.redirect(308, `intent://www.instagram.com/${handle}#Intent;package=com.instagram.android;scheme=https;end`)
  }

  res.redirect(308, `https://instagram.com/${handle}`)
})

app.get('*', (req, res) => {
  res.redirect(308, 'https://tryfeed.co')
})

exports.instagramRedirect = functions.https.onRequest(app)
