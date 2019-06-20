import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import TaskItem from './TaskItem';

class UnDone extends Component{
  constructor(props){
    super(props);
    this.state = {
      taskList: {}
    }
  }

  componentDidMount(){
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}`)
    .on("value", snap => {
      if (snap.val() !==  null){
        this.setState({
          taskList: snap.val()
        })
      }
    })
  }

  render(){
    if (Object.keys(this.state.taskList).length === 0){
      return (
        <View style={styles.noTask}>
          <Text style={{color: 'white'}}>No Task!</Text>
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}}>
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

export default connect(mapStateToProps)(UnDone);

const styles = StyleSheet.create({
  noTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3D5E'
  }
});