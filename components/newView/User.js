import React, { Component } from "react";
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { View, ScrollView, TextInput, Button, StyleSheet, Alert, Text, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import MyHeader from '../component/MyHeader';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      info: false,
      birthday: this.props.profile.birthday || '',
      name: this.props.profile.name || '',
    }
  }

  update = () => {
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}/profile`)
    .update({
      'name': this.state.name,
      'birthday': this.state.birthday
    })
    .then(() => {
      this.setState({
        info: false
      })
    })
  }

  LogOut = () =>{
    Alert.alert(
      'Logout Notice',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          firebase
          .auth()
          .signOut()
        }}
      ]
    );
  } 

  render(){
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.container}>
            <MyHeader menu={true} search={false} navigation={this.props.navigation} title="User" />
            {
              this.props.profile.name && !this.state.info ? 
              <View style={styles.nameBox}>
                <Text style={styles.name}>{`Hi, ${this.props.profile.name}`}</Text>
              </View> :
              <View></View>
            }
            {
              this.state.info ?
                <View style={{flex: 1, paddingBottom: 30}}>
                  <ScrollView  keyboardShouldPersistTaps='always' style={styles.addTask}>
                    <View style={{marginBottom: 30}}>
                      <Text style={{color: '#fff'}}>UID: {this.props.firebaseUID}</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <Text style={styles.inputTitle}>Name: </Text>
                      <View style={styles.input}>
                        <TextInput 
                          style={{color: '#fff'}}
                          placeholder="name"
                          placeholderTextColor='rgba(225,225,225,0.7)'
                          value={this.state.name} 
                          onChangeText={(name) => this.setState({name})}
                        ></TextInput>
                      </View>
                    </View>
                    <View style={styles.inputBox}>
                      <Text style={styles.inputTitle}>Birthday: </Text>
                      <View style={styles.input}>
                        <TextInput 
                          style={{color: '#fff'}}
                          placeholder="xxxx-xx-xx"
                          placeholderTextColor='rgba(225,225,225,0.7)'
                          value={this.state.birthday} 
                          onChangeText={(birthday) => this.setState({birthday})}
                        ></TextInput>
                      </View>
                    </View>
                  </ScrollView>
                  <Button 
                      style={styles.inputBtn} 
                      title="UPDATE" 
                      color='#FBB321'
                      onPress={this.update}
                    ></Button>
                </View> :
                <View style={styles.editBtn}>
                <Button  
                title="More info & Edit"
                color='#FBB321'
                onPress={() => this.setState({info: true})} ></Button>
              </View>
            }
            <View style={styles.logoutBtn}>
              <Button  
              title="LOGOUT"
              color='#fa3620'
              onPress={() => this.LogOut()} ></Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>  
    )
  }
};

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.list.profile){
    return {
      profile: state.CheckLoginReducer.list.profile,
      firebaseUID: state.CheckLoginReducer.uid
    }
  }
  return {
    profile: {},
    firebaseUID: state.CheckLoginReducer.uid
  }
}

export default connect(mapStateToProps)(User);


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
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
  },
  center:{
    textAlign: 'center',
    alignItems: 'center',
  },
  nameBox:{
    paddingBottom: 10, 
    paddingTop: 10
  },
  name: {
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 24
  },
  addTask: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  inputBox: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',    
    marginBottom: 30
  },
  inputTitle: {
    color: '#fff'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    padding: 12,
    color: '#fff',
    borderRadius: 10,
    flex: 1
  },
  inputBtn:{
    height: 40,
    textAlign: 'center'
  }
});