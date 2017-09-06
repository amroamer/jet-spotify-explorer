define(['jquery'], function ($) {
  var webserviceUrl = 'http://spotify-explorer-api.herokuapp.com/';

  /**
   * Search the spotify database for the given query.
   * @param {string} query the query string that you want to search for
   * @return {Promise} a promise that resolves with the artists in JSON format
   * or rejects with an error description
   */
  var search = function search (query) {
    return $.ajax(
      webserviceUrl + 'search/' + query, {
        dataType: 'json',
        method: 'GET'
      }
    );
  };

  /**
   * Load all albums of the specified artist.
   * @param  {string} artistId the artist's id (get one via search)
   * @return {Promise} a promise that resolves with the albums in JSON format
   * or rejects with an error description
   */
  var fetchAlbumsByArtist = function fetchAlbumsByArtist (artistId) {
    return $.ajax(
      webserviceUrl + 'fetchAlbumsByArtist/' + artistId, {
        dataType: 'json',
        method: 'GET'
      }
    );
  };

  /**
   * Load the details of the specified album.
   * @param  {string} albumId the album's id (get one via search)
   * @return {Promise} a promise that resolves with the albums in JSON format
   * or rejects with an error description
   */
  var fetchAlbumDetails = function fetchAlbumDetails (albumId) {
    return $.ajax(
      webserviceUrl + 'fetchAlbumDetails/' + albumId, {
        dataType: 'json',
        method: 'GET'
      }
    );
  };

  return {
    fetchAlbumDetails: fetchAlbumDetails,
    fetchAlbumsByArtist: fetchAlbumsByArtist,
    search: search
  };
});
