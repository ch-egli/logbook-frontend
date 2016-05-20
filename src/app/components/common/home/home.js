/**
 * Definition der Home-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import uiGrid from 'angular-ui-grid/ui-grid.js';
import 'angular-ui-grid/ui-grid.css';

import {name as ngTable} from 'ng-table/dist/ng-table.js';
import 'ng-table/dist/ng-table.css';

import template from './home.html';
import controller from './home.controller';


let homeModule = angular.module('home', [
    uiRouter, uiBootstrap, 'ui.grid', ngTable
])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/', template: '<home></home>',
                resolve: {
                    /*@ngInject*/
                    loggedIn: function(oAuthService) {
                            return oAuthService.isLoggedIn();
                        }
                    },
                /*@ngInject*/
                onEnter: function($state, loggedIn) {
                    if (!loggedIn) {
                        $state.go('login');
                    }
                }
            });
    })

    .component('home', {
        template,
        controller
    });

export default homeModule;
