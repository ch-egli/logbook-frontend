/**
 * Definition des Home-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class HomeController {
    /*@ngInject*/
    constructor(workoutsService, oAuthService) {
        this.workoutsService = workoutsService;
        this.oAuthService = oAuthService;

        this.title = 'RZ-BeO Trainings-Logbook';
        this.welcomeMessage = 'Herzlich Willkommen, ' + this.oAuthService.getFirstname();

        this.username = this.oAuthService.getUsername();

        this.workoutForm = {};

        this.workouts = this.workoutsService.getAllWorkouts();
    }

    isMyWorkout(workout) {
        return this.username === workout.benutzername;
    }

    deleteWorkout(workout) {
        this.workoutsService.deleteWorkout(workout);
        this.$state.go('home');
    }

}

export default HomeController;