# muzic
A little utility to find new music.

## Local Development
### API
In order to develop the API locally, you'll need a Spotify Client ID and Secret, which means you'll need to [register an Application](https://developer.spotify.com/my-applications/) on their developer site. 
You'll also have to add your development environment to your Spotify app as a white-listed redirect URI.
I've been using [ngrok](https://ngrok.com/) locally to tunnel the requests, but you can use whichever methods you prefer as long as your development environment will be publicly accessible.
Don't forget to append `/auth/spotify/callback` to the end of your redirect URI!

When running the Node server, you'll need to set the following ENV variables:
- `PUBLIC_URL` - The publicly accessible URL your development will be available on, used for Spotify auth callbacks.
- `SPOTIFY_CLIENT_ID` - Exactly what it says on the tin.
- `SPOTIFY_CLIENT_SECRET` - Exactly what it says on the tin.

You can also set the following optional ENV variables:
- `PORT` - Specifies which port the application will run on. Defaults to 3001.
- `SESSION_SECRET` - The secret used to sign the session ID cookie. Defaults to `no_security_lol`

### UI
