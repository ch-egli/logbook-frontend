/**
 * Definition der Home-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import homeComponent from './home.component';

let homeModule = angular.module('home', [
    uiRouter
])
    .config(/*@ngInject*/($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/', template: '<home></home>',
                resolve: {
                    loggedIn: function(oAuthService) {
                            return oAuthService.isLoggedIn();
                        }
                    },
                onEnter: function($state, loggedIn) {
                    if (!loggedIn) {
                        $state.go('login');
                    }
                }
            });
    })

    .directive('home', homeComponent);

export default homeModule;
