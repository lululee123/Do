import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import AllTask from './AllTask';
import Done from './Done';
import UnDone from './UnDone';

const TaskNavigator = createBottomTabNavigator({
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
      activeBackgroundColor: '#5eb8d6', 
      inactiveTintColor: '#666',
      labelStyle: {
        fontSize: 16,
        padding: 12
      }
    }
  }
);
const Task = createAppContainer(TaskNavigator);

export default Task;

