import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/redux-store'
import { NavigationContainer } from "@react-navigation/native";
import NavigatorContainer from './src/components/NavigatorContainer/NavigatorContainer';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
  'Require cycle'
]);


const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NavigatorContainer />
      </Provider>
    </NavigationContainer>
  );
}

export default App