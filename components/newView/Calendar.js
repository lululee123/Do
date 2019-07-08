import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { CalendarList } from 'react-native-calendars';
import MyHeader from '../component/MyHeader';
import TaskItem from '../../components/TaskBar/TaskItem';
import DoneTaskItem from '../../components/TaskBar/DoneTaskItem';
import moment from "moment";

class CalendarAnalysis extends Component{
  constructor(props){
    super(props);
    this.state = {
      Date: moment(new Date()).format("YYYY-MM-DD")
    }
  }

  ClickDate = (date) => {
    this.setState({
      Date: date
    })
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView keyboardShouldPersistTaps='always' style={{flex: 1, backgroundColor: '#3A3D5E'}}>
          <View style={styles.box}>
            <MyHeader menu={true} search={false} navigation={this.props.navigation} title="Calendar" />
            <CalendarList
              horizontal={true}
              pagingEnabled={true}
              style={styles.calendar}
              scrollEnabled={true}
              markedDates={this.props.dateList}
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
              {
                Object.keys(this.props.taskList).map(item => {
                  if ( this.props.taskList[item].date == this.state.Date && !this.props.taskList[item].secret){
                    if (!this.props.taskList[item].done){
                      return (
                        <TaskItem key={item} item={item} data={this.props.taskList[item]} /> 
                      ) 
                    } else {
                      return (
                        <DoneTaskItem key={item} item={item} data={this.props.taskList[item]} />
                      ) 
                    }
                  }
                })
              }
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
};

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.list.task){
    let setting = {startingDay: true, color: '#5eb8d6', endingDay: true};
    let dateList = {};
    let taskList = state.CheckLoginReducer.list.task;
    Object.keys(taskList).map(item => {
      if (!taskList[item].secret){
        dateList[taskList[item].date] = setting
      }
    })
    return {
      dateList: dateList,
      taskList: taskList
    }
  }
  return {
    taskList: {},
    dateList: {}
  }
}

export default connect(mapStateToProps)(CalendarAnalysis);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
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