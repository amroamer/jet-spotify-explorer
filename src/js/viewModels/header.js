/**
 * Header module
 */
define(
  ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojbutton'],
  function (oj, ko, $) {
    /**
     * The view model for the header module
     */
    function HeaderViewModel () {
      var router;
      var self = this;

      router = oj.Router.rootInstance;

      self.title = ko.observable('JET Spotify Explorer');

      // Media Queries for repsonsive header and navigation
      // Create small screen media query to update button menu display
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(
        oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
        smQuery);

      self.displayBackButton = ko.observable(false);
      self.displayCreateAccountButton = ko.observable(true);
      self.displayAddArtistButton = ko.observable(true);

      oj.Router.transitionedToState.add(function () {
        self.displayBackButton(router.stateId() !== 'search');
        self.displayCreateAccountButton(!self.displayBackButton());
        self.displayAddArtistButton(router.stateId() !== 'add-artist');
      });
      self.goBack = function goBack () {
        window.history.back();
      };
      self.goAddArtist = function goAddArtist () {
        router.go('add-artist');
      };
      self.goCreateAccount = function goCreateAccount () {
        router.go('create-account');
      };
    }
    return HeaderViewModel;
  }
);
