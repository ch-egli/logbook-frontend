/**
 * Definition des About-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class AboutController {
    /*@ngInject*/
    constructor($translate, postsService, $log) {
        this.$translate = $translate;
        this.$log = $log;

        this.aboutMessage = 'Über dieses Template';
        this.posts = postsService.getAllPosts();

        this.postById = postsService.getPostById(40);
    }

    /**
     * Wechselt die Sprache
     * @param lang Die gewunschte Sprache
     */
    changeLanguage(lang) {
        this.$log.debug('Die Sprache wurde gewechselt auf: ' + lang);
        this.$translate.use(lang);
    }
}

export default AboutController;