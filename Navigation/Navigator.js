import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StartupScreen from '../screens/StartupScreen';
import AuthScreen from '../screens/AuthScreen';
import ItemsListScreen, {
  screenOptions as itemsListOptions,
} from '../screens/ItemsListScreen';
import NewItemScreen from '../screens/NewItemScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

const screenDefaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: 'white',
  headerTintStyle: {
    fontWeight: 'bold',
  },
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenDefaultOptions}>
        <Stack.Screen
          name="Startup"
          component={StartupScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{title: 'Authenticate'}}
        />
        <Stack.Screen
          name="ItemsList"
          component={ItemsListScreen}
          options={itemsListOptions}
        />
        <Stack.Screen
          name="NewItem"
          component={NewItemScreen}
          options={{title: 'Add New Item'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
