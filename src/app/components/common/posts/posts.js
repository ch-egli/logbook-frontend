/**
 * Definition des NewsfetcherService-Komponente
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import postsService from './posts.service';

/*@ngInject*/
let postsModule = angular.module('postsService', ['ngResource'])

.service('postsService', postsService);

export default postsModule;