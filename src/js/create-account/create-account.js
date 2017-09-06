/**
 * Create account module
 */
define(
  ['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojrouter', 'address-form-oraclejet/loader'],
  function (oj, ko) {
    /**
     * The view model for the create account module
     */
    function CreateAccountViewModel () {
      var self = this;

      self.user = ko.observable({});

      window.addEventListener('address-form:submit', function (event) {
        self.user(event.detail);
        oj.Router.rootInstance.go('search');
      });
    }

    return CreateAccountViewModel;
  }
);
