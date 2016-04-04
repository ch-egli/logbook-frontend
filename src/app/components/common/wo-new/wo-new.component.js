/**
 * Definition der WoNew-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import template from './wo-new.html';
import controller from './wo-new.controller';
import './wo-new.css';

let woNewComponent = function () {
    return {
        restrict: 'E', scope: {}, template, controller, controllerAs: 'vm', bindToController: true
    };
};

export default woNewComponent;