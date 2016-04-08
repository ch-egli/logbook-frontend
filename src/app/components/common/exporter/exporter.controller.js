/**
 * Definition des Export-Controllers.
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class ExporterController {
    /*@ngInject*/
    constructor(workoutsService, $log) {
        this.$log = $log;
        this.$log.debug('ExporterController called');
    }

export default ExporterController;