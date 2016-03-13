/**
 * Definition der Messages-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';

import service from './messages.service';
import component from './messages.component';

let messagesModule = angular.module('messages', [])
    .service('messagesService', service)

    .directive('messages', component);

export default messagesModule;