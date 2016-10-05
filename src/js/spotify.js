define(['jquery'], function ($) {
  var webserviceUrl = 'https://api.spotify.com/v1/';

  /**
   * Search the spotify database for the given query.
   * @param query the query string that you want to search for
   * @param options a map (i.e. an array of arrays) containig search options (see https://developer.spotify.com/web-api/console/get-search-item/)
   */
  var search = function search (query, options) {
    if (!Array.isArray(options)) {
      console.error('Invalid options parameter ' + options);
      return;
    }

    var q = [ query ].concat(
        options.map(function (o) {
            return o[0] + '=' + o[1];
        })
    ).join('&');
    /*
     * Do a HTTP-GET call to the spotify API with the given options
     * The webservice returns results as a JSON string
     */
    return $.ajax(
      webserviceUrl + 'search?q=' + q,
      {
        dataType: 'json',
        method: 'GET'
      });
  };

  return {
    search: search
  };
});
