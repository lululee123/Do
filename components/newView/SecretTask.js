import React, { Component } from "react";
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { CalendarList } from 'react-native-calendars';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, Text, TouchableOpacity, Keyboard } from "react-native";
import MyHeader from '../component/MyHeader';
import SecretTaskItem from '../../components/TaskBar/SecretTaskItem';
import SecretDoneTaskItem from '../../components/TaskBar/SecretDoneTaskItem';
import moment from "moment";

class SecretTask extends Component{
  constructor(props){
    super(props);
    this.state = {
      taskList: {},
      lock: false,
      password: '',
      passwordCheck: '',
      passwordSet: '',
      passwordConfirm: '',
      first: true,
      message: '',
      dateList: {},
      Date: moment(new Date()).format("YYYY-MM-DD")
    }
  }

  componentDidMount(){
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}`)
    .on("value", snap => {
      if (snap.val() !==  null){
        if (snap.val().profile){
          if (snap.val().profile.secretTaskPassword){
            let setting = {startingDay: true, color: '#5eb8d6', endingDay: true};
            let dataList = {};
            Object.keys(snap.val().task).map(item => {
              if (snap.val().task[item].secret){
                dataList[snap.val().task[item].date] = setting
              }
            })

            if (this.state.passwordCheck){
              this.setState({
                dateList: dataList,
                taskList: snap.val().task,
                lock: false,
                password: snap.val().profile.secretTaskPassword,
                first: false
              })
            } else {
              this.setState({
                dateList: dataList,
                taskList: snap.val().task,
                lock: true,
                password: snap.val().profile.secretTaskPassword,
                first: false
              })
            }
          }
        }
      }
    })
  }

  checkEnter = () => {
    if (this.state.passwordCheck === this.state.password){
      this.setState({
        lock: false,
        message: ''
      })
    } else {
      this.setState({
        message: 'Password Error'
      })
    }
  }

  setPasswordCheck = () => {
    if (this.state.passwordSet === this.state.passwordConfirm){
      this.setState({
        message: '',
        password: '',
        passwordCheck: '',
        passwordSet: '',
        passwordConfirm: '',
      })

      firebase
      .database()
      .ref(`users/${this.props.firebaseUID}/profile`)
      .set({
        "secretTaskPassword": this.state.passwordSet
      })
    } else {
      this.setState({
        message: 'Password Not Match'
      })
    }
  }

  ForgetPassword = () => {
    firebase
      .database()
      .ref(`users/${this.props.firebaseUID}/profile/secretTaskPassword`)
      .remove()
      .then(
        this.setState({
          taskList: {},
          lock: false,
          password: '',
          passwordCheck: '',
          passwordSet: '',
          passwordConfirm: '',
          first: true
        })
      )
  }

  ClickDate = (date) => {
    this.setState({
      Date: date
    })
  }

  render(){
    if (this.state.first){
      return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MyHeader menu={true} navigation={this.props.navigation} title="Secret Task" />
          <View style={styles.details}>
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <Text style={{color: 'white', fontSize: 15}}>Set Password</Text>
            </View>
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <Text style={{color: 'white', fontSize: 12}}>{this.state.message}</Text>
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder='Password' 
              secureTextEntry
              value={this.state.passwordSet}
              placeholderTextColor='rgba(225,225,225,0.7)'
              onChangeText={passwordSet => this.setState({ passwordSet })}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder='Confirm Password' 
              secureTextEntry
              placeholderTextColor='rgba(225,225,225,0.7)'
              value={this.state.passwordConfirm}
              onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
            />
            <TouchableOpacity 
              style={styles.buttonContainer} 
              onPress={this.setPasswordCheck}
            >             
              <Text style={styles.buttonText}>SET</Text>
            </TouchableOpacity>
          </View>  
        </KeyboardAvoidingView>  
      </TouchableWithoutFeedback>
      )
    } else if (this.state.lock){
      return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <MyHeader menu={true} navigation={this.props.navigation} title="Secret Task" />
          <View style={styles.details}>
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <Text style={{color: 'white', fontSize: 15}}>Enter Password</Text>
            </View>
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <Text style={{color: 'white', fontSize: 12}}>{this.state.message}</Text>
            </View>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder='Password' 
              secureTextEntry
              placeholderTextColor='rgba(225,225,225,0.7)'
              value={this.state.passwordCheck}
              onChangeText={(passwordCheck) => this.setState({ passwordCheck }) }
            />
            <TouchableOpacity 
              style={styles.buttonContainer} 
              onPress={this.checkEnter}
            >             
              <Text style={styles.buttonText}>ENTER</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={this.ForgetPassword}
            >             
              <Text style={styles.buttonText}>FORGET</Text>
            </TouchableOpacity>
          </View>          
        </KeyboardAvoidingView>  
      </TouchableWithoutFeedback>
      )
    } else {
      return (
        <View style={styles.container}>
          <MyHeader menu={true} navigation={this.props.navigation} title="Secret Task" />
          <CalendarList
            horizontal={true}
            pagingEnabled={true}
            style={styles.calendar}
            scrollEnabled={true}
            markedDates={this.state.dateList}
            markingType={'period'}
            onDayPress={day=>this.ClickDate(day.dateString)}
            theme={{
              calendarBackground: '#3A3D5E',
              todayTextColor: 'orange',
              dayTextColor: '#d9e1e8',
              textDisabledColor: 'gray',
              // arrowColor: 'orange',
              monthTextColor: 'white',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
          <View style={styles.detailsTask}>
              <ScrollView style={{flex: 1, backgroundColor: '#3A3D5E'}}>
                {
                  Object.keys(this.state.taskList).map(item => {
                    if (this.state.taskList[item].date == this.state.Date && this.state.taskList[item].secret){
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
  calendar: {
    marginTop: 10,
  },
  details:{
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  detailsTask:{
    flex: 1,
    paddingBottom: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer:{
    backgroundColor: '#6D32E2',
    paddingVertical: 15,
    marginBottom: 30,
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});