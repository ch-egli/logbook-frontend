/**
 * Definition des Navbar-Controllers

 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class NavbarController {
    /*@ngInject*/
    constructor(oAuthService) {
        this.name = 'navbar';
        this.navCollapsed = true;
        this.oAuthService = oAuthService;
    }
}

export default NavbarController;