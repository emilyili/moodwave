// https://observablehq.com/@computron/spotify-auth@258
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Spotify-Auth`
)});
  main.variable(observer("ClientID")).define("ClientID", function(){return(
'10666c8ed75b4be7aafd5d27880aaf66'
)});
  main.variable(observer("viewof token")).define("viewof token", ["getTokenView","ClientID"], function(getTokenView,ClientID){return(
getTokenView(ClientID)
)});
  main.variable(observer("token")).define("token", ["Generators", "viewof token"], (G, _) => G.input(_));
  main.variable(observer("response")).define("response", function(){return(
Object.assign(
  ...window.location.hash //spotify response is in the hash
    .substring(1) //remove leading #
    .split('&') //split everything in query string into an array of key-value pairs
    .map(x => x.split('=')) // split pairs into array of key followed by value
    .map(([key, val]) => ({ [key]: val })) //flatten the array of [key, value]s into an object
)
)});
  main.variable(observer("permissions")).define("permissions", function(){return(
{
  Images: ["ugc-image-upload"],
  Playlists: [
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "playlist-modify-private"
  ],
  SpotifyConnect: [
    "user-read-currently-playing",
    "user-modify-playback-state",
    "user-read-playback-state"
  ],
  ListeningHistory: ["user-read-recently-played", "user-top-read"],
  Follow: ["user-follow-read", "user-follow-modify"],
  Playback: ["app-remote-control", "streaming"],
  Users: ["user-read-private", "user-read-email"],
  Library: ["user-library-modify", "user-library-read"]
}
)});
  main.variable(observer("permissionsString")).define("permissionsString", ["permissions"], function(permissions){return(
Object.values(permissions)
  .flat()
  .join("+")
)});
  main.variable(observer("getTokenView")).define("getTokenView", ["permissionsString","response","md","getTokenButton","authorizationUrl"], function(permissionsString,response,md,getTokenButton,authorizationUrl){return(
(
  clientId = "10666c8ed75b4be7aafd5d27880aaf66",
  redirect = document.baseURI,
  scopes = permissionsString
) =>
  response.access_token
    ? Object.assign(md`# Signed in`, { value: response.access_token })
    : getTokenButton(authorizationUrl(scopes, redirect, clientId, 'token'))
)});
  main.variable(observer("getTokenButton")).define("getTokenButton", ["html"], function(html){return(
url => html`<form>
  <button 
    style="
      background-color: #1ed760;
      border-radius: 500px;
      border-width: 0;
      color: #fff;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      line-height: 1;
      padding: 11px 32px 9px;
      text-align: center;
      text-transform: uppercase;
      vertical-align: middle;
    "
    onclick="window.open('${url}');window.close()"
  >
    Get Spotify Access Token
  </button>
`
)});
  main.variable(observer("authorizationUrl")).define("authorizationUrl", function(){return(
(permissionsArray, redirect, clientId, type) =>
  `https://accounts.spotify.com/en/authorize` +
  `?response_type=${type}` +
  `&client_id=${clientId}` +
  `&redirect_uri=${encodeURIComponent(redirect)}` +
  `&scope=${permissionsArray}` +
  `&show_dialog=false`
)});
  return main;
}
