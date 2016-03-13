/**
 * Unit-Tests Navbar
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import NavbarModule from './navbar';
import NavbarController from './navbar.controller';
import NavbarComponent from './navbar.component';
import NavbarTemplate from './navbar.html';

describe('Navbar', () => {
    let $rootScope, makeController;

    beforeEach(window.module(NavbarModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new NavbarController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [name]', () => {
            let controller = makeController();
            expect(controller.name).toBe('navbar');
        });
    });

    describe('Template', () => {
        // use regex to ensure correct bindings are used e.g., {{  }}
        it('has "Home" in template', () => {
            expect(NavbarTemplate).toMatch(/Home/g);
        });
        it('has "About" in template', () => {
            expect(NavbarTemplate).toMatch(/About/g);
        });
    });

    describe('Component', () => {
        let component = new NavbarComponent();

        it('includes the intended template', () => {
            expect(component.template).toBe(NavbarTemplate);
        });

        it('uses `controllerAs` syntax', () => {
            expect(component.controllerAs).not.toBeNull();
        });

        it('invokes the right controller', () => {
            expect(component.controller).toBe(NavbarController);
        });
    });
});