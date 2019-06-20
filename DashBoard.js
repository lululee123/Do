import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, View, Button, TextInput, Keyboard } from 'react-native';
import Task from './Task';
import MyHeader from './MyHeader';
import moment from "moment";

class DashBoard extends Component{
  constructor(){
    super();
    this.state = {
      task: ''
    }
  }

  addTaskClick = () => {
    if (this.state.task.trim() !== ''){
      firebase
      .database()
      .ref(`users/${this.props.firebaseUID}`)
      .push({
        "task": this.state.task.trim(),
        "done": false,
        "secret": false,
        "date": moment(new Date()).format("YYYY-MM-DD")
      })
      .then(
        this.setState({ task: '' })
      );
    }
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <MyHeader menu={true} navigation={this.props.navigation} title="Task" />
        <View >
          <View style={styles.addTask}>
            <View style={styles.inputBox}>
              <TextInput 
                style={{color: '#fff'}}
                placeholder="ADD TASK"
                placeholderTextColor='rgba(225,225,225,0.7)'
                value={this.state.task} 
                onChangeText={task => this.setState({ task: task })}
              ></TextInput>
            </View>
            <Button 
              style={styles.inputBtn} 
              title="ADD" 
              color='#FBB321'
              onPress={() => {this.addTaskClick(); Keyboard.dismiss();}}
            ></Button>
          </View>
        </View>
        <View style={styles.inputBtnAdvance}>
          <Button
            color='#FBB321'
            title="Advance Setting"
            onPress={() => this.props.navigation.navigate('TaskAdvance')}
          />
        </View>
        <Task />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.uid){
    return {
      firebaseUID: state.CheckLoginReducer.uid
    }
  }
}

export default connect(mapStateToProps)(DashBoard);

const styles = StyleSheet.create({
  addTask: {
    flexDirection: 'row',
    backgroundColor: '#3A3D5E',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  inputBox: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    padding: 12,
    color: '#fff',
    flex: 4,
    borderRadius: 30,
  },
  inputBtn:{
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputBtnAdvance:{
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#3A3D5E',
  }
});