import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Button, Alert} from 'react-native';

class DeleteTaskBtn extends Component{
  constructor(props){
    super(props);
  }

  taskDelete = (e) => {
    Alert.alert(
      'Delete Notice',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          firebase
            .database()
            .ref(`users/${this.props.firebaseUID}`)
            .child(e)
            .remove();
        }},
      ],
      {cancelable: false},
    );
  }
  
  render(){ 
    return (
      <Button 
        style={styles.taskBtn} 
        title="&#10005;"               
        color='#fa3620'
        onPress={() => this.taskDelete(this.props.item)} ></Button> 
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

export default connect(mapStateToProps)(DeleteTaskBtn);

const styles = StyleSheet.create({
  taskBtn: {
    flex: 1
  }
});