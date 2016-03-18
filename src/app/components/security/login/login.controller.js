/**
 * Definition des Login-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class LoginController {

    /*@ngInject*/
    constructor(oAuthService, $log) {
        this.oAuthService = oAuthService;
        this.$log = $log;

        this.title = 'Logbook for Climbing Workouts';
        this.welcomeMessage = 'Herzlich Willkommen';

        this.benutzername = "";
        this.passwort = "";
    }

    submitLogin() {
        this.$log.debug('### submitted, benutzername: ' + this.benutzername);

        this.oAuthService.login(this.benutzername, this.passwort);

        this.benutzername = "";
        this.passwort = "";
    }

}

export default LoginController;