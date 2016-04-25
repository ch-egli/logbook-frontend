/**
 * Definition des EditWo-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class EditWoController {
    /*@ngInject*/
    constructor(workoutsService, oAuthService, config, $log, $state, $stateParams, $http, $uibModal) {
        this.workoutsService = workoutsService;
        this.$log = $log;
        this.$state = $state;
        this.$http = $http;

        this.oAuthService = oAuthService;
        this.config = config;

        this.title = 'Logbook for Climbing Workouts';
        this.welcomeMessage = 'Herzlich Willkommen';

        this.workoutLocations = this.config.workoutLocations;

        this.workoutForm = {};
        this.id = $stateParams.id;

        //this.id = $stateParams.id;
        this.$log.debug('workout-id: ' + this.id);

        this.username = null;
        let authData = this.oAuthService.getAuthData();
        if (authData !== null) {
            this.username = authData.name;
        }
        this.$log.debug('username (in constructor): ' + this.username);

        this.woData = workoutsService.getWorkoutById(this.id);
        this.woData.id = this.id;
        this.woData.username = this.username;


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

          this.open = function (size) {
/*
             var modalInstance = $uibModal.open({
               animation: true,
               templateUrl: 'myModalContent.html',
               controller: 'ModalInstanceCtrl',
               size: size
             });
*/
             var modalInstance = $uibModal.open({
               animation: true,
               template: '<img ng-src="./belastung.png" alt="Belastung Info">',
               size: size
             });
           };

    }

    submitWorkout() {
        this.$log.debug('id: ' + this.woData.id);
        this.$log.debug('benutzername: ' + this.woData.username);
        this.$log.debug('datum: ' + this.woData.datum);
        this.$log.debug('ort1: ' + this.woData.ort1);
        this.$log.debug('ort2: ' + this.woData.ort2);
        this.$log.debug('schlaf: ' + this.woData.schlaf);
        this.$log.debug('lead: ' + this.woData.lead);
        this.$log.debug('bouldern: ' + this.woData.bouldern);
        this.$log.debug('kraftraum: ' + this.woData.kraftraum);
        this.$log.debug('dehnen: ' + this.woData.dehnen);
        this.$log.debug('campus: ' + this.woData.campus);
        this.$log.debug('mentaltraining: ' + this.woData.mentaltraining);
        this.$log.debug('geraete: ' + this.woData.geraete);
        this.$log.debug('belastung: ' + this.woData.belastung);
        this.$log.debug('zuege12: ' + this.woData.zuege12);
        this.$log.debug('zuege23: ' + this.woData.zuege23);
        this.$log.debug('zuege34: ' + this.woData.zuege34);
        this.$log.debug('gefuehl: ' + this.woData.gefuehl);
        this.$log.debug('sonstiges: ' + this.woData.sonstiges);

        // add workout
        let dataObj = {
            "id": this.woData.id,
            "benutzername": this.woData.username,
            "datum": this.woData.datum,
            "ort": this.woData.ort2 != null ? this.woData.ort2 : this.woData.ort1,
            "schlaf": this.woData.schlaf,
            "lead": this.woData.lead === true ? 1 : null,
            "bouldern": this.woData.bouldern === true ? 1 : null,
            "kraftraum": this.woData.kraftraum === true ? 1 : null,
            "dehnen": this.woData.dehnen === true ? 1 : null,
            "campus": this.woData.campus === true ? 1 : null,
            "mentaltraining": this.woData.mentaltraining === true ? 1 : null,
            "geraete": this.woData.geraete === true ? 1 : null,
            "belastung": this.woData.belastung,
            "zuege12": this.woData.zuege12,
            "zuege23": this.woData.zuege23,
            "zuege34": this.woData.zuege34,
            "trainingszeit": this.woData.trainingszeit,
            "gefuehl": this.woData.gefuehl,
            "sonstiges": this.woData.sonstiges
        };
        this.workoutsService.editWorkout(dataObj);

        // navigate home...
        this.$state.go('home');
    }

    cancelWorkout() {
        // navigate home...
        this.$state.go('home');
    }

}

export default EditWoController;