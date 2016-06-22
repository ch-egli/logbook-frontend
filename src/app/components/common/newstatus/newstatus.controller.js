/**
 * Definition des NewStatus-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 20.06.2016
 */
class NewStatusController {
    /*@ngInject*/
    constructor(statusService, oAuthService, config, $window, $log, $state) {
        this.statusService = statusService;
        this.$log = $log;
        this.$state = $state;
        this.$window = $window;

        this.oAuthService = oAuthService;
        this.config = config;

        this.title = 'Neuen Status erfassen...';

        this.username = null;
        let authData = this.oAuthService.getAuthData();
        if (authData !== null) {
            this.username = authData.name;
        }
        this.$log.debug('username (in constructor): ' + this.username);

        // init default values
        this.schlaf = this.config.workoutDefaultSchlaf;
        this.gefuehl = this.config.workoutDefaultGefuehl;

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
        this.$log.debug('username: ' + this.username);
        this.$log.debug('datum: ' + this.datum);
        this.$log.debug('schlaf: ' + this.schlaf);
        this.$log.debug('gefuehl: ' + this.gefuehl);
        this.$log.debug('bemerkung: ' + this.gefuhltext);

        // add status
        let dataObj = {
            "benutzername": this.username,
            "datum": this.datum,
            "schlaf": this.schlaf,
            "gefuehl": this.gefuehl,
            "bemerkung": this.bemerkung
        };
        this.statusService.addStatus(dataObj);

        this.schlaf = this.config.workoutDefaultSchlaf;
        this.gefuehl = this.config.workoutDefaultGefuehl;
        this.bemerkung = null;

        this.statusForm.$setPristine();

        // navigate home...
        this.$window.localStorage['activeTab'] = 1;
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

export default NewStatusController;