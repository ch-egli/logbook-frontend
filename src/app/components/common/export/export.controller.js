/**
 * Definition des Export-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 07.05.2016
 */
class ExportController {
    /*@ngInject*/
    constructor($log, $state, workoutsService) {
        this.$log = $log;
        this.$state = $state;
        this.workoutsService = workoutsService;

        this.title = 'Trainingseinheiten nach Excel exportieren...';

        this.athlet = null;
        this.year = 2016;
    }

    getExport() {
        this.workoutsService.exportWorkoutsToExcel(this.year, this.athlet);

        // navigate home...
        this.$state.go('home');
    }

    cancelExport() {
        // navigate home...
        this.$state.go('home');
    }

}

export default ExportController;