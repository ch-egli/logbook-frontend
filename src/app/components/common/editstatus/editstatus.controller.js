/**
 * Definition des EditStatus-Controllers
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 20.06.2016
 */
import gefuehlImage1 from "../images/grinning.png"
import gefuehlImage2 from "../images/smirking.png"
import gefuehlImage3 from "../images/frowning.png"
import gefuehlImage4 from "../images/fearful.png"
import gefuehlImage1g from "../images/grinning-g.png"
import gefuehlImage2g from "../images/smirking-g.png"
import gefuehlImage3g from "../images/frowning-g.png"
import gefuehlImage4g from "../images/fearful-g.png"

class EditStatusController {
    /*@ngInject*/
    constructor(statusService, oAuthService, config, $window, $log, $state, $stateParams) {
        this.statusService = statusService;
        this.$log = $log;
        this.$state = $state;
        this.$window = $window;

        this.oAuthService = oAuthService;
        this.config = config;

        this.title = 'Status bearbeiten...';
        this.id = $stateParams.id;
        this.$log.debug('status-id: ' + this.id);

        this.username = null;
        let authData = this.oAuthService.getAuthData();
        if (authData !== null) {
            this.username = authData.name;
        }
        this.$log.debug('username (in constructor): ' + this.username);

        this.statusData = {};
        this.resetImages();
        this.statusData = statusService.getStatusById(this.id);
/*
        $scope.$watch(angular.bind(this, function () {
                          return this.statusData;
                        }), function(newValue, oldValue) {
            console.log('newVal: ' + newValue.gefuehl + ' oldVal: ' + oldValue.gefuehl);
        });
*/

/*
        this.statusData = {};
        let svc = this;

        let promise = statusService.getStatusById2(this.id);
        this.statusData = promise.then(function(result) {
                let res = {};
                res.datum = result.data.datum;
                res.schlaf = result.data.schlaf;
                res.gefuehl = '' + result.data.gefuehl;
                res.bemerkung = result.data.bemerkung;
            });
*/
        this.statusData.id = this.id;
        this.statusData.username = this.username;

/*
        $scope.$watch('$ctrl.statusData', function(newValue, oldValue) {
            console.log('newVal: ' + newValue + ' oldVal: ' + oldValue);
        });

        this.refresh = function() {
            let state = this.$state;
            console.log('update with timeout fired');
            state.go('editstatus');
        };
        $timeout(this.refresh(), 3000);
*/
        //this.image1 = (this.statusData.gefuehl) === 1 ? gefuehlImage1 : gefuehlImage1g;

/*
        $timeout(function() {
            console.log('jetzt');
        }, 3000);
*/
/*
        promise.then(function(data) {
            console.log('jetzt: ' + data);
            //svc.$state.go('editstatus');
        });
*/

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
        this.$log.debug('id: ' + this.statusData.id);
        this.$log.debug('benutzername: ' + this.statusData.username);
        this.$log.debug('datum: ' + this.statusData.datum);
        this.$log.debug('schlaf: ' + this.statusData.schlaf);
        this.$log.debug('gefuehl: ' + this.statusData.gefuehl);
        this.$log.debug('bemerkung: ' + this.statusData.bemerkung);

        // add status
        let dataObj = {
            "id": this.statusData.id,
            "benutzername": this.statusData.username,
            "datum": this.statusData.datum,
            "schlaf": this.statusData.schlaf,
            "gefuehl": this.statusData.gefuehl,
            "bemerkung": this.statusData.bemerkung
        };
        this.statusService.editStatus(dataObj);

        // navigate home...
        this.$window.localStorage['activeTab'] = 0;
        this.$state.go('home');
    }

    cancelStatus() {
        // navigate home...
        this.$state.go('home');
    }

    selectImage1() {
        this.$log.debug('image 1 selected...');
        this.statusData.gefuehl = 1;
        this.resetImages();
        this.statusData.image1 = gefuehlImage1;
    }

    selectImage2() {
        this.$log.debug('image 2 selected...');
        this.statusData.gefuehl = 2;
        this.resetImages();
        this.statusData.image2 = gefuehlImage2;
    }

    selectImage3() {
        this.$log.debug('image 3 selected...');
        this.statusData.gefuehl = 3;
        this.resetImages();
        this.statusData.image3 = gefuehlImage3;
    }

    selectImage4() {
        this.$log.debug('image 4 selected...');
        this.statusData.gefuehl = 4;
        this.resetImages();
        this.statusData.image4 = gefuehlImage4;
    }

    resetImages() {
        this.statusData.image1 = gefuehlImage1g;
        this.statusData.image2 = gefuehlImage2g;
        this.statusData.image3 = gefuehlImage3g;
        this.statusData.image4 = gefuehlImage4g;
    }

}

export default EditStatusController;