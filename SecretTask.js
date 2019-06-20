import React, { Component } from "react";
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from "react-native";
import MyHeader from "./MyHeader";
import SecretTaskItem from './SecretTaskItem';
import SecretDoneTaskItem from './SecretDoneTaskItem';

class SecretTask extends Component{
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
    return (
      <View style={styles.container}>
        <MyHeader menu={true} navigation={this.props.navigation} title="Secret Task" />
        <View style={styles.details}>
            <ScrollView style={{flex: 1, backgroundColor: '#3A3D5E'}}>
              {
                Object.keys(this.state.taskList).map(item => {
                  if (this.state.taskList[item].secret){
                    if (this.state.taskList[item].done){
                      return (
                        <SecretDoneTaskItem key={item} item={item} data={this.state.taskList[item]} /> 
                      ) 
                    } else {
                      return (
                        <SecretTaskItem key={item} item={item} data={this.state.taskList[item]} /> 
                      ) 
                    }
                  }
                })
              }
            </ScrollView>
          </View>
      </View>
    )
  }
};

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.uid){
    return {
      firebaseUID: state.CheckLoginReducer.uid
    }
  }
}

export default connect(mapStateToProps)(SecretTask);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3D5E',
  },
  details:{
    flex: 1,
  }
});