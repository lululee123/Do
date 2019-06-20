import { createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import CalendarAnalysis from './Calendar';
import TaskAdvance from './TaskAdvance';
import DashBoard from './DashBoard';
import User from './User';
import SecretTask from './SecretTask';

const DashBoardNav = createStackNavigator(
  {
  Home: DashBoard,
  TaskAdvance: TaskAdvance,
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