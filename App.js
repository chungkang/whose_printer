import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';
import ListScreen from './src/screens/ListScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    List: ListScreen,
  },
  {
    initialRouteName: 'Map',
    defaultNavigationOptions: {
      title: '누구의 프린터',
    },
  }
);

export default createAppContainer(navigator);
