const functions = require('firebase-functions')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const UserAgent = require('./helpers/userAgent')

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const HTTP_STATUS_PERMANENT_REDIRECT = 308

app.get('/instagram/:handle', (req, res) => {
  const { params: { handle }, headers } = req
  const userAgent = UserAgent(headers['user-agent'])

  if (userAgent.isIOS) {
    return res.redirect(HTTP_STATUS_PERMANENT_REDIRECT, `instagram://user?username=${handle}`)
  }

  if (userAgent.isAndroid) {
    return res.redirect(HTTP_STATUS_PERMANENT_REDIRECT, `intent://www.instagram.com/${handle}#Intent;package=com.instagram.android;scheme=https;end`)
  }

  return res.redirect(HTTP_STATUS_PERMANENT_REDIRECT, `https://instagram.com/${handle}`)
})

app.get('/spotify/:id', (req, res) => {
  const { params: { id }, headers } = req
  const userAgent = UserAgent(headers['user-agent'])

  if (userAgent.isIOS || userAgent.isAndroid) {
    return res.redirect(HTTP_STATUS_PERMANENT_REDIRECT, `spotify:artist:${id}`)
  }

  return res.redirect(HTTP_STATUS_PERMANENT_REDIRECT, `https://open.spotify.com/artist/${id}`)
})

app.get('*', (req, res) => {
  return res.redirect(HTTP_STATUS_PERMANENT_REDIRECT, 'https://tryfeed.co')
})

exports.instagramRedirect = functions.https.onRequest(app)
