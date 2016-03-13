/**
 * Definition der About-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import template from './about.html';
import controller from './about.controller';
import './about.css';

let aboutComponent = function () {
    return {
        restrict: 'E', scope: {}, template, controller, controllerAs: 'vm', bindToController: true
    };
};

export default aboutComponent;