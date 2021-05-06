import './styles/sass/app.scss';

import angular from 'angular';
import moment from 'moment';

// Dependencies
import 'jquery';
import 'angular-animate';
import 'angular-cookies';
import 'angular-translate';
import 'angular-loading-bar';
import 'angular-route';
import 'angular-ui-router';
import 'ng-dialog';
import 'jsonformatter';
import 'angular-ui-sortable';
import 'angular-ui-tree';
import 'angular-filter';
import 'bootstrap-sass';
import 'bootstrap-colorpicker';
import ngFileSaver from 'angular-file-saver';

// Modules
import coreModule from './core/core.module';
import layoutModule from './layout/layout.module';

// App routes
import appRoutes from './app.routes';

angular
  .module('movies-plus-app', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    'angular-loading-bar',
    'cfp.loadingBar',
    'pascalprecht.translate',
    'ngDialog',
    'jsonFormatter',
    'ui.sortable',
    'angular.filter',
    'ui.tree',
    ngFileSaver,
    layoutModule.name,
    coreModule.name
  ])
  .constant('moment', moment)
  .config([
    '$qProvider',
    '$translateProvider',
    'cfpLoadingBarProvider',
    '$stateProvider',
    // '$locationProvider',
    (
      $qProvider,
      $translateProvider,
      cfpLoadingBarProvider,
      $stateProvider
      /* $locationProvider, */
    ) => {
      /* $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
      }); */

      $translateProvider.preferredLanguage('es');

      $qProvider.errorOnUnhandledRejections(false);

      // Loading bar
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.loadingBarTemplate = '<div id="loading-bar"><div class="bar"></div></div>';

      // Initial Routes
      appRoutes($stateProvider);
    }
  ]);
