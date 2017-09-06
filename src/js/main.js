/**
  Copyright (c) 2015, 2016, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
  {
    baseUrl: './js',

    // Path mappings for the logical module names
    paths:
    // eslint-disable-next-line spaced-comment
    //injector:mainReleasePaths
    {
      'knockout': 'libs/knockout/knockout-3.4.0.debug',
      'jquery': 'libs/jquery/jquery-3.1.1',
      'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
      'promise': 'libs/es6-promise/es6-promise',
      'hammerjs': 'libs/hammer/hammer-2.0.8',
      'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
      'ojs': 'libs/oj/v3.0.0/debug',
      'ojL10n': 'libs/oj/v3.0.0/ojL10n',
      'ojtranslations': 'libs/oj/v3.0.0/resources',
      'text': 'libs/require/text',
      'signals': 'libs/js-signals/signals',
      'customElements': 'libs/webcomponents/CustomElements',
      'proj4': 'libs/proj4js/dist/proj4-src',
      'css': 'libs/require-css/css',
      'knockout-postbox': 'libs/knockout-postbox/knockout-postbox',
      'spotify': 'spotify',
      'address-form-oraclejet': 'libs/address-form-oraclejet'
    }
    // eslint-disable-next-line spaced-comment
    //endinjector
    // eslint-disable-next-line comma-style
    ,
    // Shim configurations for modules that do not expose AMD
    shim:
    {
      jquery:
      {
        exports: ['jQuery', '$']
      }
    },
    config: {
      ojL10n: {
        merge: {
          'ojtranslations/nls/ojtranslations': 'resources/nls/translations'
        }
      }
    }
  }
);

function getPagePath (page) {
  // NOTE: Does not support nested pages
  return page + '/' + page;
}

require(
  [
    'ojs/ojcore', 'knockout', 'jquery', 'knockout-postbox',
    'ojs/ojknockout', 'ojs/ojrouter', 'ojs/ojmodule', 'ojs/ojmoduleanimations'
  ],
  function (oj, ko, $) {
    oj.ModuleBinding.defaults.modelPath = './';
    oj.ModuleBinding.defaults.viewPath = 'text!./';

    // Retrieve the router static instance and configure the states
    var router = oj.Router.rootInstance;
    router.configure({
      'search': {value: getPagePath('search'), label: 'Suche', isDefault: true},
      'artist': {value: getPagePath('artist'), label: 'Interpret'},
      'album': {value: getPagePath('album'), label: 'Album'},
      'add-artist': {value: getPagePath('add-artist'), label: 'Add Artist'},
      'create-account': {value: getPagePath('create-account'), label: 'Create Account'}
    });

    var switcher = function (context) {
      var params = ko.unwrap(context.valueAccessor()).params;
      if (params.ojRouter.direction === 'back') {
        return 'navParent';
      }
      return 'navChild';
    };

    var viewModel = {
      router: router,
      moduleConfig: ko.computed(function () {
        return $.extend(
				true,
				{},
				router.moduleConfig,
				{animation: oj.ModuleAnimations.switcher(switcher)}
			);
      })
    };

    $(document).ready(function () {
      oj.Router.sync().then(function () {
        ko.applyBindings(viewModel, document.getElementById('page'));
      });
    });
  }
);
