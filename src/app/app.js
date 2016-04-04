/**
 * Angular-Modul der Hauptkomponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */

// Vendor-Imports
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngCookies from 'angular-cookies';
import ngTranslate from 'angular-translate';
import ngTranslateStaticFilesLoader from 'angular-translate-loader-static-files';
import uiBootstrap from 'angular-ui-bootstrap';

// SBB Imports
import 'esta-webjs-style/build/css/style.css';

// Interne Modul-Imports
import Components from './components/components';
import AppComponent from './app.component';

// Language file import
import langDe from './languages/lang-de.json';
import langEn from './languages/lang-en.json';

angular.module('app', [
    uiRouter, ngTranslate, ngTranslateStaticFilesLoader, ngCookies, ngResource,
    uiBootstrap, Components.name
])
    .config(/*@ngInject*/($translateProvider, $httpProvider) => {

        // Translation settings
        $translateProvider.translations('de', langDe);
        $translateProvider.translations('en', langEn);
        $translateProvider.preferredLanguage('de').useSanitizeValueStrategy('escape');

        // Http service settings
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.interceptors.push('oAuthInterceptorService');
    })

    // Globale Konfigurationeinstellungen
    .constant('config', {
        resourceServerUrl: 'http://localhost:8181/',
        authServerUrl: 'http://localhost:8181/',
        //resourceServerUrl: '/',
        //authServerUrl: '/',
        authClientId: 'logbookAngularClient',
        authClientSecret: 'myAbcdghij9876Secret',

        workoutDefaultOrt1: 'K44',
        workoutDefaultOrt2: null,
        workoutDefaultSchlaf: null,
        workoutDefaultLead: null,
        workoutDefaultBouldern: null,
        workoutDefaultKraftraum: null,
        workoutDefaultDehnen: null,
        workoutDefaultCampus: null,
        workoutDefaultMentaltraining: null,
        workoutDefaultBelastung: '14',
        workoutDefaultTrainingszeit: null,
        workoutDefaultZuege12: null,
        workoutDefaultZuege23: null,
        workoutDefaultZuege34: null,
        workoutDefaultGefuehl: '1',
        workoutDefaultSonstiges: null
    })
    // Die App als Direktive exportieren
    .directive('app', AppComponent);

