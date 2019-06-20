import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Button} from 'react-native';

class UnSecretTaskBtn extends Component{
  constructor(props){
    super(props);
  }

  taskUnSecret = (e) => {
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}`)
    .child(e)
    .update({
      "secret": false
    });
  }

  render(){
    return (
      <Button 
      style={styles.taskBtn} 
      title="&#127757;" 
      onPress={() => this.taskUnSecret(this.props.item)} ></Button>         
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

export default connect(mapStateToProps)(UnSecretTaskBtn);

const styles = StyleSheet.create({
  taskBtn: {
    flex: 1
  }
});