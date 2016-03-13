/**
 * Definition der Navbar-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import navbarComponent from './navbar.component';

let navbarModule = angular.module('navbar', [
    uiRouter
])
    .directive('navbar',navbarComponent);

export default navbarModule;