import { createDrawerNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import CalendarAnalysis from './components/newView/Calendar';
import TaskAdvance from './components/newView/TaskAdvance';
import Search from './components/newView/Search';
import User from './components/newView/User';
import SecretTask from './components/newView/SecretTask';
import AllTask from './components/newView/AllTask';
import Done from './components/newView/Done';
import UnDone from './components/newView/UnDone';

const DashBoard = createBottomTabNavigator({
    All: {
      screen: AllTask
    },
    Done: {
      screen: Done
    },
    UnDone: {
      screen: UnDone
    }
  }, 
  {
    tabBarposition: 'bottom', 
    swipeEnabled: true, 
    tabBarOptions: { 
      safeAreaInset: { bottom: 'never', top: 'never' } ,
      activeTintColor: '#f2f2f2',
      inactiveTintColor: '#666',
      style: {
          backgroundColor: '#171F33' // TabBar background
      },
      labelStyle: {
        fontSize: 16,
        padding: 12
      }
    }
  }
);

const DashBoardNav = createStackNavigator(
  {
  Home: DashBoard,
  TaskAdvance: TaskAdvance,
  Search: Search
  },
  {
    headerMode: 'none',
    navigationOptions: {
      safeAreaInset: { bottom: 'never', top: 'never' }
    }
  }  
);

const Home = createDrawerNavigator({
    Home: DashBoardNav,
    Calendar: CalendarAnalysis,
    'Secret Task': SecretTask,
    User: User
  },
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#3A3D5E',
    contentOptions: {
      activeTintColor: '#FBB321',
      activeBackgroundColor: '#6D32E2',
      inactiveTintColor: 'white'
    }
  }
);

export default createAppContainer(Home);