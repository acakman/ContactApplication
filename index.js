import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Nav from './navigators/navigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Nav);
