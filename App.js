import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthScreen from './screens/AuthScreen';
import {Provider} from 'react-redux';
import store from './store/store';
import Navigator from './Navigation/Navigator';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
