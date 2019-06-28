import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Button} from 'react-native';

class SecretTaskBtn extends Component{
  constructor(props){
    super(props);
  }

  taskSecret = (e) => {
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}/task`)
    .child(e)
    .update({
      "secret": true
    });
  }

  render(){
    return (
      <Button 
      style={styles.taskBtn} 
      title="&#128273;" 
      onPress={() => this.taskSecret(this.props.item)} ></Button>         
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

export default connect(mapStateToProps)(SecretTaskBtn);

const styles = StyleSheet.create({
  taskBtn: {
    flex: 1
  }
});