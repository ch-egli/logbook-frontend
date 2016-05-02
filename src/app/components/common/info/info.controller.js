/**
 * Definition des Info-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.04.2016
 */
import infoImage from "./images/belastung.png"

class InfoController {
    /*@ngInject*/
    constructor($log) {
        this.$log = $log;
        //this.$uibModalInstance = $uibModalInstance;
    }

    getInfoImage() {
        this.$log.debug('got info image...');
        return infoImage;
    }

    closeModal() {
        this.$log.debug('closeModal...');
    }

}

export default InfoController;