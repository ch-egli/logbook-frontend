/**
 * Angular-Modul der Common-Komponenten
 * - Hier werden alle Common-Komponenten als Modul exportiert
 *
 * @author Christian Egli
 * @version: 0.0.1
 * @since 28.01.2016
 */
import angular from 'angular';
import Home from './home/home';
//import NewWo from './newwo/newwo';
import Navbar from './navbar/navbar';
import Posts from './posts/posts';
import Workouts from './workouts/workouts';
import Messages from './messages/messages';
import Theme from './theme/theme';

let commonModule = angular.module('app.components.common', [
    Home.name, Navbar.name, Posts.name, Workouts.name, Messages.name, Theme.name
]);

export default commonModule;