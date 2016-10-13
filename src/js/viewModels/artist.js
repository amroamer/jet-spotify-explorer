/**
 * Artist module
 */
define(
  ['ojs/ojcore', 'knockout', 'jquery', '../spotify', 'ojs/ojchart'],
  function(oj, ko, $, spotify) {
    /**
     * The view model for the Artist module
     */
    function ArtistViewModel() {
      var addAlbumDetails, isMostPopularAlbum, searchViewModel, self;

      self = this;
      searchViewModel = ko.dataFor(document.getElementById('search'));
      isMostPopularAlbum = function isMostPopularAlbum (album) {
        return self.albums().every(function isMostPopular (otherAlbum) {
          return album.name !== otherAlbum.name
            || album.popularity > otherAlbum.items[0];
        });
      }
      addAlbumDetails = function addAlbumDetails (albumId) {
        spotify.fetchAlbumDetails(albumId).then(
          function onAlbum (album) {
            if (isMostPopularAlbum(album)) {
              self.albums.push({
                id: album.id,
                name: album.name,
                items: [ album.popularity ]
              });
            }
          }
        );
      };

      self.artist = searchViewModel.selectedArtist;

      self.albums = ko.observableArray([]);

      spotify.fetchAlbumsByArtist(self.artist().id).then(
        function onAlbums (response) {
          response.items.forEach(function (albumSummary) {
            addAlbumDetails(albumSummary.id);
          })
        }
      );
    }
    return ArtistViewModel;
  });
