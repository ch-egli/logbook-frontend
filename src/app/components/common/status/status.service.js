/**
 * Definition eines Rest-Services für Benutzer Stati
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 20.06.2016
 */
class StatusService {
    /*@ngInject*/
    constructor(config, $resource, $http, $log, $cookies, $state) {
        this.$log = $log;
        this.config = config;
        this.$http = $http;
        this.$resource = $resource;
        this.$cookies = $cookies;
        this.$state = $state;
        this.authData = {};

        this.$log.debug('username (in StatusService constructor): ' + this.authData.name);
    }

    /**
     * Get all status depending of user role.
     */
    getAllStati(mPage, mSize, mFilter) {
        let service = this;
        this._setAuthorizationHeader();

        let userRoles = this.authData.roles;
        let statusDiscriminator = null;
        if (userRoles.indexOf('trainer') > -1) {
            statusDiscriminator = 'all';
        } else {
            statusDiscriminator = this.authData.name;
        }

        let statusApi = this.$resource(service.config.resourceServerUrl + 'v1/users/' + statusDiscriminator + '/status');
        let queryParams = {
            page:mPage,
            size:mSize
        };
        let status = statusApi.get(queryParams);
        return status;
    }


    getStatusByUser(username) {
        let service = this;
        this._setAuthorizationHeader();
        if (username) {
            let status = this.$resource(service.config.resourceServerUrl + 'v1/users/' + username + '/status/top/' + 7);
            return status.query();
        }
        return {};
    }

    /**
     * Liefert einen bestimmten Status von der REST-Resource zurueck
     * @param id Die zu suchende statusId
     * @returns {*} Den Status als Objekt
     */
    getStatusById(id) {
        let service = this;
        let statusData = {};
        if (id) {
            this._setAuthorizationHeader();
            let res = this.$http.get(service.config.resourceServerUrl + 'v1/users/all/status/' + id);
            res.success(function(data, status, headers, config) {
                //console.log('got data: ' + status);
                if (data) {
                    statusData.datum = data.datum;
                    statusData.schlaf = data.schlaf;
                    statusData.gefuehl = '' + data.gefuehl;
                    statusData.bemerkung = data.bemerkung;
                }
                return statusData;
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        }
        return statusData;
    }

    addStatus(status) {
        let service = this;
        this._setAuthorizationHeader();
        let res = this.$http.post(service.config.resourceServerUrl + 'v1/users/' + status.benutzername + '/status', status);
        res.success(function(data, status, headers, config) {
            //console.log('added status with id: ' + data.id);
            service.$state.reload();
        });
        res.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    editStatus(status) {
        let service = this;
        this._setAuthorizationHeader();
        let res = this.$http.put(service.config.resourceServerUrl + 'v1/users/' + status.benutzername + '/status/' + status.id, status);
        res.success(function(data, status, headers, config) {
            //console.log('updated status with id: ' + data.id);
            service.$state.reload();
        });
        res.error(function(data, status, headers, config) {
            alert( "PUT failure message: " + JSON.stringify({data: data}));
        });
    }

    deleteStatus(status) {
        let service = this;
        this._setAuthorizationHeader();
        let res = this.$http.delete(service.config.resourceServerUrl + 'v1/users/' + status.benutzername + '/status/' + status.id);
        res.success(function(data, status, headers, config) {
            //console.log('deleted status with id: ' + data.id);
            service.$state.reload();
        });
        res.error(function(data, status, headers, config) {
            alert( "DELETE failure message: " + JSON.stringify({data: data}));
        });
    }

    exportStatiToExcel(year, user) {
        let service = this;
        this._setAuthorizationHeader();

        if (!user) {
            user = service.authData.name;
        }
        let downloadUrl = service.config.resourceServerUrl + 'v1/user/' + user + '/excelresults/' + year;

        // with jQuery: $("body").append("<iframe src='" + downloadUrl + "' style='display: none;' ></iframe>");
        let iframe = document.createElement("iframe");
        iframe.setAttribute("src", downloadUrl);
        iframe.setAttribute("style", "display: none");
        document.body.appendChild(iframe);
    }

    _getAuthData() {
        let cookie = this.$cookies.getObject('auth');
        if (cookie && cookie.authData) {
            return cookie.authData;
        } else {
            return {};
        }
    }

    _setAuthorizationHeader() {
        this.authData = this._getAuthData();
        this.$http.defaults.headers.common['Authorization'] = this.authData.authheader;
    }
}

export default StatusService;