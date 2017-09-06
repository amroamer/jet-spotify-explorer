/**
 * Header module
 */
define(
  ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojrouter',
    'ojs/ojbutton', 'ojs/ojselectcombobox'],
  function (oj, ko, $) {
    /**
     * The view model for the header module
     */
    function HeaderViewModel () {
      var router;
      var self = this;

      router = oj.Router.rootInstance;

      // Labels
      self.title = ko.observable('JET Spotify Explorer');
      self.labelCreateAccount = ko.observable(
        oj.Translations.getTranslatedString('create-account'));

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

      // i18n - default language
      self.lang = ko.observable($('html').attr('lang'));
      // i18n - language changed
      self.langValueChanged = function (context, option) {
        var newLang = String(option.value);
        if (!newLang || newLang.length === 0) {
          return;
        }
        oj.Config.setLocale(newLang,
          function () {
            self.lang(newLang);
            console.log("change lang to '" + newLang + "'");
            if (newLang === 'ar') {
              $('html').attr('dir', 'rtl');
            } else {
              $('html').attr('dir', 'ltr');
            }

            // update i18n text
            self.labelCreateAccount(
              oj.Translations.getTranslatedString('create-account'));
          }
        );
      };
    }
    return HeaderViewModel;
  }
);
