const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const util = require('util')
const SpotifyStrategy = require('passport-spotify').Strategy

let ourURL = process.env.PUBLIC_URL || 'http://localhost:3001',
    clientID = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
    sessionSecret = process.env.SESSION_SECRET || 'no_security_lol'

if(!(!!clientID && !!clientSecret)) {
  throw("You're missing SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET ENV variables!")
}

app.use(passport.initialize())
app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false }))
app.use(passport.session())

passport.use(new SpotifyStrategy(
  {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: `${ourURL}/auth/spotify/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, { accessToken: accessToken, profile: profile })
  }
))
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.get('/login', passport.authenticate('spotify'))
app.get('/auth/spotify/callback', 
  passport.authenticate('spotify', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
)

app.get('/', (req, res) => {
  console.log(util.inspect(req.session))
  res.send('Hi')
})

let port = process.env.PORT || 3001
app.listen(port, () => console.log(`App listening on port ${port}`))
