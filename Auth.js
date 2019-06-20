import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import LogIn from './LogIn';
import SignUp from './SignUp';

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
      activeBackgroundColor: '#5eb8d6', 
      inactiveTintColor: '#666',
      labelStyle: {
        fontSize: 16,
        padding: 12
      }
    }
  }
);

export default createAppContainer(Auth);