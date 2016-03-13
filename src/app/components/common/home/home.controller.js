/**
 * Definition des Home-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class HomeController {
    constructor(workoutsService, $log) {
        this.workoutsService = workoutsService;
        this.$log = $log;

        this.title = 'Logbook for Climbing Workouts';
        this.welcomeMessage = 'Herzlich Willkommen';

        this.workoutForm = {};
        this.username = "";

        //this.workouts = workoutsService.getAllWorkouts();
        //this.workoutById = workoutsService.getWorkoutById(2);
        this.workouts = 2;
        //this.workoutById = workoutsService.getWorkoutById(2);
    }

    submitWorkout() {
        this.$log.debug('### submitted, username: ' + this.username);

        // add workout
        let dataObj = {
            "benutzer": this.username,
            "datum": "2016-01-17",
            "ort": "k44",
            "schlaf": 9,
            "gefuehl": 1,
            "lead": 1,
            "bouldern": 0,
            "belastung": 15,
            "zuege12": 80,
            "zuege23": 100,
            "zuege34": 90,
            "trainingszeit": 180
  	    };
        this.workoutsService.addWorkout(dataObj);

        this.username = "";
        this.workoutForm.$setPristine();
    }

}

export default HomeController;