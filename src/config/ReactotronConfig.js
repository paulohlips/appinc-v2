import Reactotron, { asyncStorage } from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";
import sagaPlugin from "reactotron-redux-saga";

if (__DEV__) {
  const tron = Reactotron.configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(asyncStorage())
    .connect({
      server: "192.168.56.101", // for Genymotion
      port: 9090,
      enabled: true,
    }); // let's connect!

  console.tron = tron;
  tron.clear();
}
