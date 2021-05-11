import './styles/sass/app.scss';

import angular from 'angular';
import moment from 'moment';

// Dependencies
import 'jquery';
import 'angular-sanitize';
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
import 'ng-file-upload';
import 'ngstorage';
import ngFileSaver from 'angular-file-saver';
import 'ui-select';
import 'ng-notify';

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
    'ngSanitize',
    'angular-loading-bar',
    'cfp.loadingBar',
    'pascalprecht.translate',
    'ngDialog',
    'jsonFormatter',
    'ui.sortable',
    'angular.filter',
    'ui.tree',
    ngFileSaver,
    'ngFileUpload',
    'ngStorage',
    'ui.select',
    'ngNotify',
    layoutModule.name,
    coreModule.name
  ])
  .constant('moment', moment)
  .config([
    '$qProvider',
    '$httpProvider',
    '$translateProvider',
    'cfpLoadingBarProvider',
    '$stateProvider',
    (
      $qProvider,
      $httpProvider,
      $translateProvider,
      cfpLoadingBarProvider,
      $stateProvider
    ) => {
      $httpProvider.interceptors.push('httpInterceptor');
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
