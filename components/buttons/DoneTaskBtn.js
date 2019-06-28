import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Button} from 'react-native';

class DoneTaskBtn extends Component{
  constructor(props){
    super(props);
  }

  taskDone = (e) => {
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}/task`)
    .child(e)
    .update({
      "done": true
    });
  }

  render(){
    return (
      <Button 
      style={styles.taskBtn} 
      title="&#10003;" 
      color='#7EF483'
      onPress={() => this.taskDone(this.props.item)} ></Button>         
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

export default connect(mapStateToProps)(DoneTaskBtn);

const styles = StyleSheet.create({
  taskBtn: {
    flex: 1
  }
});