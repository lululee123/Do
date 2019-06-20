import React, { Component } from "react";
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from "react-native";
import { CalendarList } from 'react-native-calendars';
import MyHeader from "./MyHeader";
import TaskItem from './TaskItem';
import moment from "moment";
import DoneTaskItem from './DoneTaskItem';

class CalendarAnalysis extends Component{
  constructor(props){
    super(props);
    this.state = {
      dateList: {},
      taskList: {},
      Date: moment(new Date()).format("YYYY-MM-DD")
    }
  }

  componentDidMount(){
    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}`)
    .on("value", snap => {
      if (snap.val() !==  null){
        let setting = {startingDay: true, color: '#5eb8d6', endingDay: true};
        let dataList = {};
        Object.keys(snap.val()).map(item => {
          if (!snap.val()[item].delete){
            dataList[snap.val()[item].date] = setting
          }
        })
        this.setState({
          dateList: dataList,
          taskList: snap.val()
        })
      }
    })
  }

  ClickDate = (date) => {
    this.setState({
      Date: date
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <MyHeader menu={true} navigation={this.props.navigation} title="Calendar" />
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
          <View style={styles.details}>
            <ScrollView style={{flex: 1, backgroundColor: '#3A3D5E'}}>
              {
                Object.keys(this.state.taskList).map(item => {
                  if ( this.state.taskList[item].date == this.state.Date && !this.state.taskList[item].secret){
                    if (!this.state.taskList[item].done){
                      return (
                        <TaskItem key={item} item={item} data={this.state.taskList[item]} /> 
                      ) 
                    } else {
                      return (
                        <DoneTaskItem key={item} item={item} data={this.state.taskList[item]} />
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

export default connect(mapStateToProps)(CalendarAnalysis);

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
    marginTop: 10,
    paddingBottom: 20
  }
});