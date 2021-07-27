import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import PrinterScreen from './src/screens/PrinterScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Printer: PrinterScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: '누구의 프린터',
    },
  }
);

export default createAppContainer(navigator);
