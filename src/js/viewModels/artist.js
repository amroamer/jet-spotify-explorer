/**
 * Artist module
 */
define(['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    /**
     * The view model for the Artist module
     */
  function ArtistViewModel () {
    var searchViewModel, self;

    self = this;
    searchViewModel = ko.dataFor(document.getElementById('search'));

    self.artist = searchViewModel.selectedArtist;
  }
  return ArtistViewModel;
});
