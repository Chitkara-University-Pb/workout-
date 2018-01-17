// import Dropbox from 'dropbox';
// import parseQueryString from './parse_query_string';

export const CLIENT_ID = 'wn0u32mes7scte9';

export const parseUrlHash = () => window.location.hash
  .split('&');
  
export const isAuthenticated = (parsedHash) => parsedHash.length > 1;

 // Parses the url and gets the access token if it is in the urls hash
export const getAccessTokenParsedHash = (parsedHash) => parsedHash[0].replace('#/access_token=', '');


// Render a list of items to #files
export const renderItems = (items) => items.forEach(
  (item) => console.log(item.name)
);

// if (isAuthenticated()) {
//   // Create an instance of Dropbox with the access token and use it to
//   // fetch and render the files in the users root directory.
//   var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
//   dbx.filesListFolder({path: ''})
//     .then(function(response) {
//       renderItems(response.entries);
//     })
//     .catch(function(error) {
//       console.error(error);
//     });
// } else {
//   // Set the login anchors href using dbx.getAuthenticationUrl()
//   var dbx = new Dropbox({ clientId: CLIENT_ID });
//   var authUrl = dbx.getAuthenticationUrl('http://localhost:8080/auth');
//   document.getElementById('authlink').href = authUrl;
// }