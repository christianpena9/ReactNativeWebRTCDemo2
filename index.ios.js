import { AppRegistry } from 'react-native';
import ReactNativeWebRCTDemo from './main';

if (!window.navigator.userAgent) {
    window.navigator.userAgent = 'react-native';
}

AppRegistry.registerComponent('ReactNativeWebRCTDemo', () => ReactNativeWebRCTDemo);
