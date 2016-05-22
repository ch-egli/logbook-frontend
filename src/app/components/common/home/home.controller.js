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

        let wos = this.workouts;
        this.tableParams = new NgTableParams(
            { page: 1, count: 5 },
            {
                counts: [5, 10, 25],
                total: 0,
                getData: function(params) {
                    return wos.$promise.then(function(data) {
                        params.total(8);
                        return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
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

    isMyWorkout(workout) {
        return this.username === workout.benutzername;
    }

}

export default HomeController;