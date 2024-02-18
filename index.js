/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/Redux/Store';
// import { PersistGate } from 'redux-persist/integration/react'


const store = configureStore();
const RNRedux = () => (
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
            <App />
        {/* </PersistGate> */}
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
