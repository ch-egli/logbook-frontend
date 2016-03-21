/**
 * Definition des Home-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class HomeController {
    constructor() {
        this.title = 'Logbook for Climbing Workouts';
        this.welcomeMessage = 'Herzlich Willkommen';

        this.workoutForm = {};
        this.username = "";

        this.workouts = null;
        //this.workoutById = workoutsService.getWorkoutById(2);
        //this.workouts = 2;
        //this.workoutById = workoutsService.getWorkoutById(2);
    }

}

export default HomeController;