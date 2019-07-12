import React, { Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import TaskItem from '../../components/TaskBar/TaskItem';
import DoneTaskItem from '../../components/TaskBar/DoneTaskItem';
import MyHeader from '../component/MyHeader';
import AddTask from '../component/AddTask';

class AllTask extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{flex: 1}}>
          <MyHeader menu={true} search={true} navigation={this.props.navigation} title="Task" />
          <AddTask />
          <View style={styles.inputBtnAdvance}>
            <Button
              color='#FBB321'
              title="Advance Setting"
              onPress={() => this.props.navigation.navigate('TaskAdvance')}
            />
          </View>
          {
            Object.keys(this.props.taskList).length === 0 ?
              <View style={styles.noTask}>
                <Text style={{color: 'white'}}>{this.props.status === "Login" ? 'No Task!' : 'Loading'}</Text>
              </View>
            :
              <View style={{flex: 1, paddingBottom: 10, backgroundColor: '#3A3D5E'}}>
                <ScrollView keyboardShouldPersistTaps='always' style={{flex: 1, backgroundColor: '#3A3D5E'}}>
                  {
                    Object.keys(this.props.taskList).map(item => {
                      if (!this.props.taskList[item].secret){
                        if (!this.props.taskList[item].done){
                          return (
                            <TaskItem key={item} item={item} data={this.props.taskList[item]} /> 
                          ) 
                        } else {
                          return (
                            <DoneTaskItem key={item} item={item} data={this.props.taskList[item]} /> 
                          ) 
                        }
                      }
                    })
                  }
                </ScrollView>
              </View>
          }
        </View>  
      </KeyboardAvoidingView> 
    )
  }
}

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.list.task){
    return {
      taskList: state.CheckLoginReducer.list.task,
      status: state.CheckLoginReducer.status
    }
  } 
  return {
    taskList: {},
    status: state.CheckLoginReducer.status
  }
}

export default connect(mapStateToProps)(AllTask);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3D5E'
  },
  task: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3F4674',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 10
  },
  taskDone: {
    backgroundColor: '#6b6e70',
  },
  taskText: {
    flex: 3,
    padding: 16,
    height: 50,
    color: 'white',
    fontSize: 15
  },
  taskBtn: {
    flex: 1
  },
  taskTextDone: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },
  inputBtnAdvance:{
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#3A3D5E',
  }
});