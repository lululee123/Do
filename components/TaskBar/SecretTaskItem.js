import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Keyboard, TextInput} from 'react-native';
import DeleteTaskBtn from '../buttons/DeleteTaskBtn';
import DoneTaskBtn from '../buttons/DoneTaskBtn';
import UnSecretTaskBtn from '../buttons/UnSecretTaskBtn';

class TaskItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      msg: ""
    }
  }

  taskEditSave = (e, task) => {
    Keyboard.dismiss();

    this.setState({
      msg: "",
      edit: false
    })

    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}/task`)
    .child(e)
    .update({
      "task": task
    });
  }

  render(){ 
    if (this.state.edit){
      return (
        <View style={styles.task} >
          <TextInput 
          style={styles.taskText}
          value={this.state.msg}
          onChangeText={(val) => this.setState({ msg: val })}
          ></TextInput>
          <Button 
          style={styles.taskBtn} 
          title="&#10003;" 
          onPress={() => this.taskEditSave(this.props.item, this.state.msg) }></Button>
        </View>
      )
    } else {
      return (
        <View style={styles.task} >
          <Text style={styles.taskText}>{ this.props.data.task }</Text>
          <DeleteTaskBtn item={this.props.item} />
          <DoneTaskBtn item={this.props.item} />
          <Button 
          style={styles.taskBtn} 
          title="&#9998;" 
          onPress={() => this.setState({ msg: this.props.data.task, edit: true}) }></Button>
          <UnSecretTaskBtn item={this.props.item} />
        </View>   
      )
    }
  }
}

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.uid){
    return {
      firebaseUID: state.CheckLoginReducer.uid
    }
  }
}

export default connect(mapStateToProps)(TaskItem);

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  noTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3D5E'
  },
  task: {
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
    color: 'white',
    fontSize: 15,
    flexWrap: "wrap"
  },
  taskBtn: {
    flex: 1
  }
});