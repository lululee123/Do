import React, { Component } from "react";
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { View, Button, StyleSheet, TextInput, Keyboard, Text } from "react-native";
import { CalendarList } from 'react-native-calendars';
import MyHeader from '../component/MyHeader';
import moment from "moment";

class TaskAdvance extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: moment(new Date()).format("YYYY-MM-DD"),
      task: "",
      send: false,
      dateDot: {[moment(new Date()).format("YYYY-MM-DD")]: {startingDay: true, color: "#5eb8d6", endingDay: true}}
    }
  }

  addTaskClick = () => {
    if (this.state.task.trim() !== ''){
      firebase
      .database()
      .ref(`users/${this.props.firebaseUID}/task`)
      .push({
        "task": this.state.task.trim(),
        "done": false,
        "secret": false,
        "date": this.state.date
      })
      .then(
        this.setState({ 
          task: '',
          send: true
        })
      );
    }
  }

  ClickDate = (data) => {
    let dateDot = {};
    let setting = {startingDay: true, color: '#5eb8d6', endingDay: true};
    dateDot[data] = setting;
    this.setState({
      date: data,
      send: false,
      dateDot: dateDot
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <MyHeader menu={false} search={false} navigation={this.props.navigation} title="Advance Setting" />
        <View >
          <View style={styles.addTask}>
            <View style={styles.inputBox}>
              <TextInput 
                style={{color: '#fff'}}
                placeholder="ADD TASK"
                placeholderTextColor='rgba(225,225,225,0.7)'
                value={this.state.task} 
                onChangeText={task => this.setState({ task: task, send: false })}
              ></TextInput>
            </View>
          </View>
        </View>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          style={styles.calendar}
          scrollEnabled={true}
          markedDates={this.state.dateDot}
          markingType={'period'}
          onDayPress={day=>this.ClickDate(day.dateString)}
          theme={{
            calendarBackground: '#3A3D5E',
            todayTextColor: 'orange',
            dayTextColor: '#d9e1e8',
            textDisabledColor: 'gray',
            monthTextColor: 'white',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
        <View>
          <Button 
            style={styles.inputBtn} 
            title="ADD TASK" 
            color='#FBB321'
            onPress={() => {this.addTaskClick(); Keyboard.dismiss();}}
          ></Button>
        </View>
        {
          this.state.send ? 
          <View style={{paddingBottom: 10, paddingTop: 10}}>
            <Text style={styles.text}>Send</Text>
          </View>
          : <View></View>
        }
      </View>
    )
  }
};

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.uid){
    return {
      firebaseUID: state.CheckLoginReducer.uid
    }
  } else {
    return {}
  }
}

export default connect(mapStateToProps)(TaskAdvance);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3D5E',
  },
  calendar: {
    marginTop: 10,
  },
  addTask: {
    flexDirection: 'row',
    backgroundColor: '#3A3D5E',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  inputBox: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    padding: 12,
    color: '#fff',
    flex: 4,
    borderRadius: 30,
  },
  inputBtn:{
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputBtnAdvance:{
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#3A3D5E',
  },
  text:{
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center'
  }
});