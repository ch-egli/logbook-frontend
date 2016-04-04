/**
 * Definition der WoNew-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import template from './wo-new.html';
import controller from './wo-new.controller';
import './wo-new.css';

let woNewModule = angular.module('wo-new', [
    uiRouter, uiBootstrap
])
    .config(/*@ngInject*/($stateProvider) => {
        $stateProvider.state('wo-new', {
            url: '/wo-new', template: '<wo-new></wo-new>'
        });
    })

    .component('wo-new', {
        template,
        controller
    });

export default woNewModule;