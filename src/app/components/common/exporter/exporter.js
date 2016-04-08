/**
 * Definition der Exporter-Komponente.
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import template from './exporter.html';
import controller from './exporter.controller';


let exporterModule = angular.module('exporter', [
    uiRouter
])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('exporter', {
            url: '/exporter', template: '<exporter></exporter>'
        });
    })

    .component('exporter', {
        template,
        controller
    });

export default exporterModule;