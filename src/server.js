import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import queryString from 'query-string'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const config = {
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
  authUrl: process.env.AUTH_URL,
  tokenUrl: process.env.ACCESS_TOKEN_URL,
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpiration: 315360000,
  gallerySearchUrl: 'https://api.imgur.com/3/gallery/search'
}

// https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=REQUESTED_RESPONSE_TYPE&state=APPLICATION_STATE
const authParams = queryString.stringify({
  client_id: config.clientId,
  // redirect_uri: config.redirectUrl,
  response_type: 'token'
  // scope: 'openid profile email',
  // access_type: 'offline',
  // state: 'standard_oauth'
  // prompt: 'consent'
})

const getTokenParams = (refreshToken) => queryString.stringify({
  client_id: config.clientId,
  client_secret: config.clientSecret,
  refresh_token: refreshToken,
  grant_type: 'refresh_token'
  // redirect_uri: config.redirectUrl
})

const getConfig = () => {
  return {
    headers: { Authorization: `Client-ID ${config.clientId}` }
  }
}

const app = express()

app.use(cors({
  origin: [
    config.clientUrl
  ],
  credentials: true
}))

app.use(cookieParser())

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: 'Unauthorized' })
    jwt.verify(token, config.tokenSecret)
    return next()
  } catch (err) {
    console.log('Error: ', err)
    res.status(401).json({ message: 'Unauthorized' })
  }
}

app.get('/auth/url', (_, res) => {
  res.json({
    url: `${config.authUrl}?${authParams}`
  })
})

app.get('/auth/token', async (req, res) => {
  const { refreshToken } = req.query

  if (!refreshToken) return res.status(400).json({ message: 'Authorization code must be provided' })
  try {
    // Get all parameters needed to hit authorization server
    const tokenParams = getTokenParams(refreshToken)
    // Exchange authorization code for access token (id token is returned here too)
    const { data } = await axios.post(`${config.tokenUrl}`, tokenParams)
    if (!data) return res.status(400).json({ message: 'Auth error' })
    // Get user info from id token
    const user = { accountId: data.account_id, accountName: data.account_username }
    // Sign a new token
    const token = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration })
    // Set cookies for user
    res.cookie('token', token, { maxAge: config.tokenExpiration, httpOnly: true })
    // You can choose to store user in a DB instead
    res.json({
      user
    })
  } catch (err) {
    console.error('Error: ', err)
    res.status(500).json({ message: err.message || 'Server error' })
  }
})

app.get('/auth/logged_in', (req, res) => {
  try {
    // Get token from cookie
    const token = req.cookies.token
    if (!token) return res.json({ loggedIn: false })
    const { user } = jwt.verify(token, config.tokenSecret)
    const newToken = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration })
    // Reset token in cookie
    res.cookie('token', newToken, { maxAge: config.tokenExpiration, httpOnly: true })
    res.json({ loggedIn: true, user })
  } catch (err) {
    res.json({ loggedIn: false })
  }
})

app.post('/auth/logout', (_, res) => {
  // clear cookie
  res.clearCookie('token').json({ message: 'Logged out' })
})

app.get('/gallery/search', auth, async (req, res) => {
  try {
    const { data } = await axios.get(`${config.gallerySearchUrl}/time/all/${req.query?.page || 0}?q=cats`, getConfig(req.cookies.token))
    res.json({ cats: data?.data?.slice(0, 5) })
  } catch (err) {
    console.error('Error: ', err)
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`))
