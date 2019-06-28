import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Keyboard } from 'react-native';
import TaskItem from '../../components/TaskBar/TaskItem';
import MyHeader from '../component/MyHeader';
import moment from "moment";

class UnDone extends Component{
  constructor(props){
    super(props);
    this.state = {
      taskList: {},
      task: ''
    }
  }

  componentDidMount(){
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}/task`)
    .on("value", snap => {
      if (snap.val() !==  null){
        this.setState({
          taskList: snap.val()
        })
      }
    })
  }

  addTaskClick = () => {
    if (this.state.task.trim() !== ''){
      firebase
      .database()
      .ref(`users/${this.props.firebaseUID}/task`)
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
        {
          Object.keys(this.state.taskList).length === 0 ?
            <View style={styles.noTask}>
              <Text style={{color: 'white'}}>No Task!</Text>
            </View>
          :
            <View style={{flex: 1, paddingBottom: 10, backgroundColor: '#3A3D5E'}}>
              <ScrollView style={{flex: 1, backgroundColor: '#3A3D5E'}}>
                {
                  Object.keys(this.state.taskList).map(item => {
                    if (!this.state.taskList[item].secret){
                      if (!this.state.taskList[item].done){
                        return (
                          <TaskItem key={item} item={item} data={this.state.taskList[item]} />
                        ) 
                      }
                    }
                  })
                }
              </ScrollView>
            </View>
        }
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

export default connect(mapStateToProps)(UnDone);

const styles = StyleSheet.create({
  noTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3D5E'
  },
  addTask: {
    flexDirection: 'row',
    backgroundColor: '#3A3D5E',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 20
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
