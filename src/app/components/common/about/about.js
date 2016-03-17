/**
 * Definition der About-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import aboutComponent from './about.component';
import './about.css';

let aboutModule = angular.module('about', [
    uiRouter, uiBootstrap
])
    .config(/*@ngInject*/($stateProvider) => {
        $stateProvider.state('about', {
            url: '/about', template: '<about></about>'
        });
    })

    .directive('about', aboutComponent);

export default aboutModule;