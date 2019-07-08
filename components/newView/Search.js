import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Text } from "react-native";
import MyHeader from '../component/MyHeader';
import TaskItem from '../../components/TaskBar/TaskItem';
import DoneTaskItem from '../../components/TaskBar/DoneTaskItem';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: ''
    }
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <MyHeader menu={false} search={false} navigation={this.props.navigation} title="Search" />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            placeholder='Search Task' 
            placeholderTextColor='rgba(225,225,225,0.7)'
            onChangeText={
              (text) => {
                if (text.trim() !== ''){
                  this.setState({text})
                } else {
                  this.setState({
                    text: ''
                  })
                }
              }
            }
          />
          {
            this.state.text !== ''  ? 
            <ScrollView keyboardShouldPersistTaps='always' style={{flex: 1, backgroundColor: '#3A3D5E'}}>
              {
                Object.keys(this.props.taskList).map(item => {
                  if (this.props.taskList[item].task.toLowerCase().includes(this.state.text.toLowerCase())){
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
                  }
                })
              }
            </ScrollView> : 
            <View style={{flex: 1,textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'white'}}>NO RESULT</Text>
            </View>
          }
        </View>
      </KeyboardAvoidingView>
    )
  }
};


const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.list.task){
    return {
      taskList: state.CheckLoginReducer.list.task,
    }
  } 
  return {
    taskList: {}
  }
}

export default connect(mapStateToProps)(User);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3D5E'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    color: '#fff',
    borderRadius: 30
  }
});