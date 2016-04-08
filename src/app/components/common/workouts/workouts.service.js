/**
 * Definition eines Rest-Services
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
class WorkoutsService {
    /*@ngInject*/
    constructor(config, oAuthService, $resource, $http, $log) {
        this.$log = $log;
        this.config = config;
        this.$http = $http;
        this.$resource = $resource;

        this.authData = oAuthService.getAuthData();
        if (this.authData == null) {
            this.authData = {};
        }
        this.username = this.authData.name;
        this.$log.debug('username (in WorkoutsService constructor): ' + this.username);
    }

    /**
     * Liefert alle Workouts der REST-Resource zurueck
     * @returns {angular.resource.IResourceArray<T>}
     */
    getAllWorkouts() {
        let service = this;
        this._setAuthorizationHeader();
        let workouts = this.$resource(service.config.resourceServerUrl + 'v1/public/lastworkouts');
        return workouts.query();
    }

    /**
     * Liefert einen bestimmten Workout von der REST-Resource zurueck
     * @param id Die zu suchende workoutId
     * @returns {*} Den Workout als Objekt
     */
    getWorkoutById(id) {
        let service = this;
        let woData = {};
        if (id) {
            this._setAuthorizationHeader();
            let res = this.$http.get(service.config.resourceServerUrl + 'v1/users/' + service.username + '/workouts/' + id);
            res.success(function(data, status, headers, config) {
                console.log('got data: ' + status);
                if (data) {
                    woData.datum = data.datum;
                    if (service.config.workoutLocations.indexOf(data.ort) > -1) {
                        woData.ort1 = data.ort;
                        woData.ort2 = null;
                    } else {
                        woData.ort1 = service.config.workoutLocations[service.config.workoutLocations.length - 1];
                        woData.ort2 = data.ort;
                    }
                    woData.ort = data.ort;
                    woData.schlaf = data.schlaf;
                    woData.lead = data.lead ? true : false;
                    woData.bouldern = data.bouldern ? true : false;
                    woData.kraftraum = data.kraftraum ? true : false;
                    woData.dehnen = data.dehnen ? true : false;
                    woData.campus = data.campus ? true : false;
                    woData.mentaltraining = data.mentaltraining ? true : false;
                    woData.geraete = data.geraete ? true : false;
                    woData.belastung = '' + data.belastung;
                    woData.zuege12 = data.zuege12;
                    woData.zuege23 = data.zuege23;
                    woData.zuege34 = data.zuege34;
                    woData.trainingszeit = data.trainingszeit;
                    woData.gefuehl = '' + data.gefuehl;
                    woData.sonstiges = data.sonstiges;
                }
                return woData;
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        }
        return woData;
    }

    addWorkout(workout) {
        let service = this;
        this._setAuthorizationHeader();
        let res = this.$http.post(service.config.resourceServerUrl + 'v1/users/' + workout.benutzername + '/workouts', workout);
        res.success(function(data, status, headers, config) {
            console.log('It works: ' + status);
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    editWorkout(workout) {
        let service = this;
        this._setAuthorizationHeader();
        let res = this.$http.put(service.config.resourceServerUrl + 'v1/users/' + workout.benutzername + '/workouts/' + workout.id, workout);
        res.success(function(data, status, headers, config) {
            console.log('PUT works: ' + status);
        });
        res.error(function(data, status, headers, config) {
            alert( "PUT failure message: " + JSON.stringify({data: data}));
        });
    }

    deleteWorkout(workout) {
        let service = this;
        this._setAuthorizationHeader();
        let res = this.$http.delete(service.config.resourceServerUrl + 'v1/users/' + workout.benutzername + '/workouts/' + workout.id);
        res.success(function(data, status, headers, config) {
            console.log('DELETE works: ' + status);
        });
        res.error(function(data, status, headers, config) {
            alert( "DELETE failure message: " + JSON.stringify({data: data}));
        });
    }

    _setAuthorizationHeader() {
        this.$http.defaults.headers.common['Authorization'] = this.authData.authheader;
    }
}

export default WorkoutsService;