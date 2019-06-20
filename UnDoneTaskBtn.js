import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Button} from 'react-native';

class UnDoneTaskBtn extends Component{
  constructor(props){
    super(props);
  }

  taskUnDone = (e) => {
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}`)
    .child(e)
    .update({
      "done": false
    });
  }

  render(){
    return (
      <Button 
      style={styles.taskBtn} 
      title="&#x21BA;" 
      color='#7EF483'
      onPress={() => this.taskUnDone(this.props.item)} ></Button>         
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

export default connect(mapStateToProps)(UnDoneTaskBtn);

const styles = StyleSheet.create({
  taskBtn: {
    flex: 1
  }
});