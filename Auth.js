import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import LogIn from './components/newView/LogIn';
import SignUp from './components/newView/SignUp';

const Auth = createBottomTabNavigator({
  LogIn: {
    screen: LogIn 
  },
  SignUp: {
    screen: SignUp
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

export default createAppContainer(Auth);