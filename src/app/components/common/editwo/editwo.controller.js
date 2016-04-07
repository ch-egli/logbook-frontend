/**
 * Definition des EditWo-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class EditWoController {
    /*@ngInject*/
    constructor(workoutsService, oAuthService, config, $log, $state, $stateParams, $http) {
        this.workoutsService = workoutsService;
        this.$log = $log;
        this.$state = $state;
        this.$http = $http;

        this.id = $stateParams.id;
        this.$log.debug('workout-id: ' + this.id);

        this.oAuthService = oAuthService;
        this.config = config;

        this.title = 'Logbook for Climbing Workouts';
        this.welcomeMessage = 'Herzlich Willkommen';

        this.workoutForm = {};

        this.username = null;
        let authData = this.oAuthService._getAuthData();
        if (authData !== null) {
            this.username = authData.name;
        }
        this.$log.debug('username (in constructor): ' + this.username);

        let that = this;
        let res = this.$http.get(this.config.resourceServerUrl + 'v1/users/' + this.username + '/workouts/' + this.id);
        res.success(function(data, status, headers, config) {
            console.log('It works: ' + status);
            that.schlaf = data.schlaf;
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

        /*
         * Start adding Angular UI Datepicker functions...
         */
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

    submitWorkout() {
        this.$log.debug('username: ' + this.username);
        this.$log.debug('datum: ' + this.datum);
        this.$log.debug('ort1: ' + this.ort1);
        this.$log.debug('ort2: ' + this.ort2);
        this.$log.debug('schlaf: ' + this.schlaf);
        this.$log.debug('lead: ' + this.lead);
        this.$log.debug('bouldern: ' + this.bouldern);
        this.$log.debug('kraftraum: ' + this.kraftraum);
        this.$log.debug('dehnen: ' + this.dehnen);
        this.$log.debug('campus: ' + this.campus);
        this.$log.debug('mentaltraining: ' + this.mentaltraining);
        this.$log.debug('belastung: ' + this.belastung);
        this.$log.debug('zuege12: ' + this.zuege12);
        this.$log.debug('zuege23: ' + this.zuege23);
        this.$log.debug('zuege34: ' + this.zuege34);
        this.$log.debug('gefuehl: ' + this.gefuehl);
        this.$log.debug('sonstiges: ' + this.sonstiges);

        // add workout
        let dataObj = {
            "benutzername": this.username,
            "datum": this.datum,
            "ort": this.ort2 != null ? this.ort2 : this.ort1,
            "schlaf": this.schlaf,
            "lead": this.lead === true ? 1 : null,
            "bouldern": this.bouldern === true ? 1 : null,
            "kraftraum": this.kraftraum === true ? 1 : null,
            "dehnen": this.dehnen === true ? 1 : null,
            "campus": this.campus === true ? 1 : null,
            "mentaltraining": this.mentaltraining === true ? 1 : null,
            "belastung": this.belastung,
            "zuege12": this.zuege12,
            "zuege23": this.zuege23,
            "zuege34": this.zuege34,
            "trainingszeit": this.trainingszeit,
            "gefuehl": this.gefuehl,
            "sonstiges": this.sonstiges
        };
        this.workoutsService.addWorkout(dataObj);


        // navigate home...
        this.$state.go('home');
        this.$state.reload();
    }

}

export default EditWoController;