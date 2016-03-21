/**
 * Definition eines Rest-Services
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class WorkoutsService {
    /*@ngInject*/
    constructor(config, $resource, $http) {
        //this.$log = $log;
        this.config = config;
        //this.$log.debug('workout config: ' + this.config);
        this.Workouts = $resource(config.resourceServerUrl + 'v1/public/lastworkouts');
        //this.Workouts = $resource('http://localhost:8181/workouts/:workoutId', {workoutId: '@id'});
        //this.Workouts = $resource('http://54.93.84.56:8181/workouts/:workoutId', {workoutId: '@id'});
        this.$http = $http;
    }

    /**
     * Liefert alle Workouts der REST-Resource zurueck
     * @returns {angular.resource.IResourceArray<T>}
     */
    getAllWorkouts() {
        return this.Workouts.query();
    }

    /**
     * Liefert einen bestimmten Workout von der REST-Resource zurueck
     * @param id Die zu suchende workoutId
     * @returns {*} Den Workout als Objekt
     */
    getWorkoutById(id) {
        return this.Workouts.get({workoutId: id});
    }

    addWorkout(workout) {
        //let res = this.$http.post('http://54.93.84.56:8181/workouts', workout);
        let service = this;
        //let res = this.$http.post('http://localhost:8181/' + 'v1/users/' + workout.benutzername + '/workouts', workout);
        let res = this.$http.post(service.config.resourceServerUrl + 'v1/users/' + workout.benutzername + '/workouts', workout);
        res.success(function(data, status, headers, config) {
            console.log('It works: ' + status);
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }
}

export default WorkoutsService;