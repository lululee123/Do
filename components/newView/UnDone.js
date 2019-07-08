import React, { Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import TaskItem from '../../components/TaskBar/TaskItem';
import MyHeader from '../component/MyHeader';
import AddTask from '../component/AddTask';

class UnDone extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{flex: 1}}>
          <MyHeader menu={true} search={false} navigation={this.props.navigation} title="Task" />
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
                <Text style={{color: 'white'}}>No Task!</Text>
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
      taskList: state.CheckLoginReducer.list.task
    }
  }
  return {
    taskList: {}
  }
}

export default connect(mapStateToProps)(UnDone);

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
  inputBtnAdvance:{
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#3A3D5E',
  }
});
