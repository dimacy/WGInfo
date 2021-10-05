import ReactotronFlipper from 'reactotron-react-native/dist/flipper';
import Reactotron from 'reactotron-react-native';

Reactotron.setAsyncStorageHandler() // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: 'WGInfo',
    createSocket: path => new ReactotronFlipper(path),
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
