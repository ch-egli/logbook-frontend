/**
 * Definition der Theme-Komponente.
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import template from './theme.html';
import controller from './theme.controller';

let themeComponent = function () {
    return {
        restrict: 'E', scope: {}, template, controller, controllerAs: 'vm', bindToController: true
    };
};

export default themeComponent;