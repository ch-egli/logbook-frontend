/**
 * Definition des EditStatus-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 20.06.2016
 */
class EditStatusController {
    /*@ngInject*/
    constructor(statusService, oAuthService, config, $window, $log, $state, $stateParams) {
        this.statusService = statusService;
        this.$log = $log;
        this.$state = $state;
        this.$window = $window;

        this.oAuthService = oAuthService;
        this.config = config;

        this.title = 'Status bearbeiten...';
        this.id = $stateParams.id;
        this.$log.debug('status-id: ' + this.id);

        this.username = null;
        let authData = this.oAuthService.getAuthData();
        if (authData !== null) {
            this.username = authData.name;
        }
        this.$log.debug('username (in constructor): ' + this.username);

        this.statusData = statusService.getStatusById(this.id);
        this.statusData.id = this.id;
        this.statusData.username = this.username;


        /*
         * Start adding Angular UI Datepicker functions...
         */
        this.today = function() {
            this.datum = new Date();
        };
        this.today();

        this.clear = function() {
            this.datum = null;
        };

        this.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        this.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(2014, 12, 31),
            startingDay: 1
        };

        function disabled(data) {
            var date = data.date,
            mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }


        this.toggleMin = function() {
            this.inlineOptions.minDate = this.inlineOptions.minDate ? null : new Date();
            this.dateOptions.minDate = this.inlineOptions.minDate;
        };

        this.toggleMin();

        this.open1 = function() {
            this.popup1.opened = true;
        };

        this.setDate = function(year, month, day) {
            this.datum = new Date(year, month, day);
        };

        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        this.format = this.formats[2];
        this.altInputFormats = ['M!/d!/yyyy'];

        this.popup1 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);

        this.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < this.events.length; i++) {
                    var currentDay = new Date(this.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                      return this.events[i].status;
                    }
                }
            }

            return '';
        }

        /*
         * End Angular UI Datepicker functions...
         */

    }

    submitStatus() {
        this.$log.debug('id: ' + this.statusData.id);
        this.$log.debug('benutzername: ' + this.statusData.username);
        this.$log.debug('datum: ' + this.statusData.datum);
        this.$log.debug('schlaf: ' + this.statusData.schlaf);
        this.$log.debug('gefuehl: ' + this.statusData.gefuehl);
        this.$log.debug('bemerkung: ' + this.statusData.bemerkung);

        // add status
        let dataObj = {
            "id": this.statusData.id,
            "benutzername": this.statusData.username,
            "datum": this.statusData.datum,
            "schlaf": this.statusData.schlaf,
            "gefuehl": this.statusData.gefuehl,
            "bemerkung": this.statusData.bemerkung
        };
        this.statusService.editStatus(dataObj);

        // navigate home...
        this.$window.localStorage['activeTab'] = 0;
        this.$state.go('home');
    }

    cancelStatus() {
        // navigate home...
        this.$state.go('home');
    }

    showInfo() {
        this.showInfoImage = !this.showInfoImage;
    }

    getInfoImage() {
        this.$log.debug('got info image...');
        return infoDialogImage;
    }
}

export default EditStatusController;