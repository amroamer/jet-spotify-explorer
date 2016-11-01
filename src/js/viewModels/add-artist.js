/**
 * Add-artist module
 */
define([
  'ojs/ojcore',
  'knockout',
  'jquery',
  '../spotify',
  'knockout-postbox',
  'ojs/ojbutton',
  'ojs/ojinputnumber',
  'ojs/ojinputtext',
  'ojs/ojselectcombobox'
], function (oj, ko, $, spotify) {
  /**
   * The view model for the add-artist module
   */
  function AddArtistViewModel () {
    var self = this;

    self.name = ko.observable('');
    self.genre = ko.observableArray(['rock']);
    self.year = ko.observable(new Date().getFullYear());

    self.tracker = ko.observable();

    self.save = function () {
      ko.postbox.publish('add-artist', {
        name: self.name(),
        genre: self.genre()[0],
        year: self.year()
      });
      window.history.back();
    };
  }
  return AddArtistViewModel;
});
