import { AppRegistry, YellowBox } from 'react-native';
import Nav from './navigators/navigator';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Remote debugger (...) seperated windows).', 'Module RCTImageLoader']);
AppRegistry.registerComponent('Contact', () => Nav);
