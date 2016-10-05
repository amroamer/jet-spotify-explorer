/**
 * Header module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout'], function (oj, ko, $) {
    /**
     * The view model for the header module
     */
  function HeaderViewModel () {
    var self = this;
    self.title = ko.observable('JET Spotify Explorer');

    // Media Queries for repsonsive header and navigation
    // Create small screen media query to update button menu display
    var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
    self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
  }
  return HeaderViewModel;
});
