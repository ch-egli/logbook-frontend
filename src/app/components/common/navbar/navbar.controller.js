/**
 * Definition des Navbar-Controllers

 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class NavbarController {
    /*@ngInject*/
    constructor(oAuthService, workoutsService) {
        this.name = 'navbar';
        this.navCollapsed = true;
        this.oAuthService = oAuthService;
        this.workoutsService = workoutsService;
    }

    exportToExcel() {
        this.workoutsService.exportWorkoutsToExcel();
    }
}

export default NavbarController;