/**
 * Definition des Home-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import modalConfirmDeletion from "./confirmDeletion.html"

class HomeController {
    /*@ngInject*/
    constructor(workoutsService, oAuthService, $log, $uibModal, NgTableParams) {
        this.workoutsService = workoutsService;
        this.oAuthService = oAuthService;
        this.$uibModal = $uibModal;
        this.$log = $log;

        this.title = 'RZ-BeO Trainings-Logbook';
        this.welcomeMessage = 'Herzlich Willkommen, ' + this.oAuthService.getFirstname();

        this.username = this.oAuthService.getUsername();

        this.workoutForm = {};

        this.workouts = this.workoutsService.getAllWorkouts();
        this.myWorkouts = this.workoutsService.getWorkoutsByUser(this.username);

          this.data = [
            {id: 1, benutzername: 'liv', ort: 'k44'},
            {id: 2, benutzername: 'zoe', ort: 'matten'},
            {id: 3, benutzername: 'liv', ort: 'griffbar'},
            {id: 4, benutzername: 'zoe', ort: 'k44'},
            {id: 5, benutzername: 'liv', ort: 'matten'},
            {id: 6, benutzername: 'zoe', ort: 'griffbar'},
            {id: 7, benutzername: 'liv', ort: 'k44'},
            {id: 8, benutzername: 'zoe', ort: 'matten'},
            {id: 9, benutzername: 'liv', ort: 'griffbar'},
          ];

/*
        this.tableParams = new NgTableParams(
            { page: 1, count: 5 },
            {
                counts: [5, 10, 25],
                //total: 9,
                dataset: this.data
            });
*/
        let wos = this.workouts;
        this.tableParams = new NgTableParams(
            { page: 1, count: 5 },
            {
                counts: [5, 10, 25],
                getData: function(params) {
                    // ajax request to api
                    return wos.$promise.then(function(data) {
                        params.total(data.inlineCount); // recal. page nav controls
                        return data.results;
                    });
                }
            });


        this.filter = false;
    }

    askAndDelete(workout) {
         let log = this.$log;
         let woService = this.workoutsService;
         let modalInstance = this.$uibModal.open({
             animation: true,
             template: modalConfirmDeletion
         });

         modalInstance.result.then(function () {
             log.debug('Deletion of workout ' + workout.id + ' has been confirmed');
             woService.deleteWorkout(workout);
         }, function () {
             log.debug('Confirmation dialog has been dismissed');
         });
    }

/*
    showData(workout) {
         let log = this.$log;
         let woService = this.workoutsService;
         let modalInstance = this.$uibModal.open({
             animation: true,
             template: '<info></info>',
             resolve: {
                 wo: function () {
                   return workout;
                 }
             }

         });

         modalInstance.result.then(function () {
             log.debug('Workout dialog has been closed');
         }, function () {
             log.warn('Error in ShowData dialog');
         });
    }
*/

    isMyWorkout(workout) {
        return this.username === workout.benutzername;
    }

}

export default HomeController;