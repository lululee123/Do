import React, { Component } from "react";
import * as firebase from "firebase";
import { View, Button, StyleSheet } from "react-native";
import MyHeader from '../component/MyHeader';

class User extends Component{
  constructor(props){
    super(props);
  }

  LogOut = () =>{
    firebase
    .auth()
    .signOut()
    .then( () => {
      console.log('log out');
    }).catch( error => {
      console.log(error.toString(error));
    }) ;
  } 

  render(){
    return (
      <View style={styles.container}>
        <MyHeader menu={true} search={false} navigation={this.props.navigation} title="User" />
        <View style={styles.logoutBtn}>
          <Button  
          title="LOGOUT"
          color='#fa3620'
          onPress={() => this.LogOut()} ></Button>
        </View>
      </View>
    )
  }
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3D5E',
  },
  logoutBtn: {
    height: 50,
    alignItems: 'center',
    backgroundColor: '#3F4674',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
  }
});