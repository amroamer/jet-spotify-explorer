/**
 * Search module
 */
define([
  'ojs/ojcore',
  'knockout',
  'jquery',
  '../spotify',
  'ojs/ojarraytabledatasource',
  'ojs/ojinputtext',
  'ojs/ojlistview'
], function (oj, ko, $, spotify) {
  /**
   * The view model for the search module
   */
  function SearchViewModel () {
    var self = this;
    self.query = ko.observable('');
    self.artists = ko.observableArray([]);
    self.dataSource = new oj.ArrayTableDataSource(self.artists, {idAttribute: "id"});
    self.selectedArtist = ko.observable({});

    self.search = function search () {
      self.artists.removeAll(); // clear previous search results
      spotify.search(self.query(), [['type', 'artist']]).then(
        function onFulfilled (response) {
          // filter artists
          response.artists.items.forEach(function (artist, index) {
            artist.thumbnail = artist.images.pop();
            artist.cover = artist.images[0] || artist.thumbnail;
            artist.index = index;
            self.artists.push(artist);
          }
        );
      }, function onRejected (error) {
        console.error(error);
      })
    };

    self.selectArtist = function selectArtist (data, event) {
      var artist, index;
      index = Number(event.currentTarget.id);
      artist = self.artists()[index];
      self.selectedArtist(artist);
      ko.dataFor(document.getElementById('page')).router.go('artist');
    };
  }
  return SearchViewModel;
});
