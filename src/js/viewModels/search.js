/**
 * Search module
 */
define(['ojs/ojcore', 'knockout', 'jquery', '../spotify', 'ojs/ojinputtext'], function (oj, ko, $, spotify) {
    /**
     * The view model for the search module
     */
  function SearchViewModel () {
    var self = this;
    self.query = ko.observable('');
    self.results = ko.observable('No results');
    self.search = function () {
      spotify.search(self.query(), [['type', 'artist']]).then(function onFulfilled (value) {
        self.results(JSON.stringify(value));
      }, function onRejected (error) {
        console.error(error);
      })
    };
  }
  return SearchViewModel;
});
