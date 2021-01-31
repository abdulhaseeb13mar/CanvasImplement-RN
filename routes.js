import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/shared/RefNavigation';
import Home from './src/screens/Home/Home';
import Products from './src/screens/Products/Products';
import Search from './src/screens/Search/Search';
import ConfirmOrder from './src/screens/ConfirmOrder/ConfirmOrder';

const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
