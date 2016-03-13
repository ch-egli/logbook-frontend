/**
 * Definition der Messages-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import template from './messages.html';
import controller from './messages.controller';

let messagesComponent = function () {
    return {
        restrict: 'E', scope: {}, template, controller, controllerAs: 'vm', bindToController: true
    };
};

export default messagesComponent;