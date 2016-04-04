/**
 * Unit-Tests WoNew
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import WoNewModule from './wo-new';
import WoNewController from './wo-new.controller';
import WoNewComponent from './wo-new.component';
import WoNewTemplate from './wo-new.html';

describe('WoNew', () => {
    let $rootScope, makeController, translateMock;

    beforeEach(window.module(WoNewModule.name));
    beforeEach(inject((_$rootScope_, _$log_) => {
        $rootScope = _$rootScope_;

        translateMock = {
            use: function () {
            }
        };

        makeController = () => {
            return new WoNewController(translateMock, {
                getAllPosts: function () {
                    return [{
                        postId: 1, title: 'hi 1'
                    }, {
                        postId: 2, title: 'hi 2'
                    }];
                }, getPostById: function () {
                    return {postId: 4, title: 'hi 4'};
                }
            }, _$log_);
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        it('has a name property [woNewMessage]', () => {
            let controller = makeController();
            expect(controller.woNewMessage).toBe('Über dieses Template');
        });

        it('has a name property [posts]', () => {
            let controller = makeController();
            expect(controller.posts.length).toBe(2);
            expect(controller.posts[0].title).toBe('hi 1');
            expect(controller.posts[1].title).toBe('hi 2');
        });

        it('has a name property [postById]', () => {
            let controller = makeController();
            expect(controller.postById.title).toBe('hi 4');
        });

        it('to change language with changeLanguage()', () => {
            let controller = makeController();

            spyOn(translateMock, 'use');

            controller.changeLanguage('de');

            expect(translateMock.use).toHaveBeenCalledWith('de');
        });
    });

    describe('Template', () => {
        it('has name in template [woNewMessage]', () => {
            expect(WoNewTemplate).toMatch(/{{\s?vm\.wo-newMessage\s?}}/g);
        });
        it('has name in template [posts.length]', () => {
            expect(WoNewTemplate).toMatch(/{{\s?vm\.posts\.length\s?}}/g);
        });
        it('has name in template [vm.posts[0].title]', () => {
            expect(WoNewTemplate).toMatch(/{{\s?vm\.posts\[0\]\.title\s?}}/g);
        });
        it('has name in template [vm.postById.id]', () => {
            expect(WoNewTemplate).toMatch(/{{\s?vm\.postById\.id\s?}}/g);
        });
        it('has name in template [vm.postById.title]', () => {
            expect(WoNewTemplate).toMatch(/{{\s?vm\.postById\.title\s?}}/g);
        });
    });

    describe('Component', () => {
        let component = new WoNewComponent();

        it('includes the intended template', () => {
            expect(component.template).toBe(WoNewTemplate);
        });

        it('uses `controllerAs` syntax', () => {
            expect(component.controllerAs).not.toBeNull();
        });

        it('invokes the right controller', () => {
            expect(component.controller).toBe(WoNewController);
        });
    });
});