import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) {
  const tron = Reactotron
    .configure({host:'10.1.1.21'}) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(asyncStorage())
    .connect(); // let's connect!

  console.tron = tron;
  tron.clear();
}
