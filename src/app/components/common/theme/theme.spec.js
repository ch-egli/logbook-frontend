/**
 * Unit-Tests Theme.
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import ThemeModule from './theme';
import ThemeController from './theme.controller';
import ThemeComponent from './theme.component';
import ThemeTemplate from './theme.html';

describe('Theme', () => {
    let $rootScope, makeController;

    beforeEach(window.module(ThemeModule.name));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new ThemeController();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        //it('has a name property [title]', () => {
        //    let controller = makeController();
        //    expect(controller.title).toBe('ESTA WebJS - Starterkit');
        //});
        //it('has a name property [welcomeMessage]', () => {
        //    let controller = makeController();
        //    expect(controller.welcomeMessage).toBe('Herzlich Willkommen');
        //});
    });

    describe('Template', () => {
        // Use regex to ensure correct bindings are used e.g., {{  }}
        //it('has name in template [title]', () => {
        //    expect(ThemeTemplate).toMatch(/{{\s?vm\.title\s?}}/g);
        //});
        //it('has name in template [welcomeMessage]', () => {
        //    expect(ThemeTemplate).toMatch(/{{\s?vm\.welcomeMessage\s?}}/g);
        //});
    });

    describe('Component', () => {
        let component = new ThemeComponent();

        it('includes the intended template', () => {
            expect(component.template).toBe(ThemeTemplate);
        });

        it('uses `controllerAs` syntax', () => {
            expect(component.controllerAs).not.toBeNull();
        });

        it('invokes the right controller', () => {
            expect(component.controller).toBe(ThemeController);
        });
    });
});