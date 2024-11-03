import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import Flows from './src/screens/Flows';
import Quiz from './src/screens/Quiz';
import Starter from './src/starter';

export type RootStackParamList = {
  Home: undefined;
  Flows: undefined;
  Quiz: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type NavigatorProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Flows" component={Flows} />
        <Stack.Screen name="Quiz" component={Quiz} />
      </Stack.Navigator>
      <Starter />
    </NavigationContainer>
  );
};

export default Navigator;
