import React, { Component} from 'react';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, Keyboard, TextInput} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import DeleteTaskBtn from '../buttons/DeleteTaskBtn';
import DoneTaskBtn from'../buttons/DoneTaskBtn';
import SecretTaskBtn from '../buttons/SecretTaskBtn';

class TaskItem extends Component{
  constructor(props){
    super(props);
    this.state = {
      edit: false,
      editDate: false,
      msg: this.props.data.task,
      date: this.props.data.date,
      item: this.props.item,
      dateDot: { [this.props.data.date]: {startingDay: true, color: '#5eb8d6', endingDay: true} }
    }
  }

  taskEditSave = () => {
    Keyboard.dismiss();

    this.setState({
      editDate: false,
      edit: false
    })

    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}/task`)
    .child(this.state.item)
    .update({
      "task": this.state.msg,
      "date": this.state.date
    });
  }

  ClickDate = (data) => {
    let dateDot = {};
    let setting = {startingDay: true, color: '#5eb8d6', endingDay: true};
    dateDot[data] = setting;
    this.setState({
      date: data,
      dateDot: dateDot
    })
  }

  changeDate = () => {
    this.setState({
      editDate: false,
      edit: false
    })

    firebase
    .database()
    .ref(`users/${this.props.firebaseUID}/task`)
    .child(this.state.item)
    .update({
      "task": this.state.msg,
      "date": this.state.date
    });
  }

  render(){ 
    if (this.state.edit){
      return (
        <View style={styles.task} >
          <TextInput 
          style={styles.taskText}
          value={this.state.msg}
          onChangeText={(val) => this.setState({ msg: val })}
          ></TextInput>
          <Button 
          style={styles.taskBtn} 
          title="&#10003;" 
          onPress={() => this.taskEditSave()}></Button>
          <Button 
          style={styles.taskBtn} 
          title="&#128197;" 
          onPress={() => this.setState({editDate: true, edit: false})}></Button>
        </View>
      )
    } else if (this.state.editDate){
      return (
        <View>
          <View style={styles.task} >
            <TextInput 
            style={styles.taskText}
            value={this.state.msg}
            onChangeText={(val) => this.setState({ msg: val })}
            ></TextInput>
            <Button 
            style={styles.taskBtn} 
            title="&#10003;" 
            onPress={() => this.taskEditSave()}></Button>
            <Button 
            style={styles.taskBtn} 
            title="&#128197;" 
            onPress={() => this.setState({editDate: true, edit: false})}></Button>
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
              title="SAVE" 
              color='#FBB321'
              onPress={() => this.changeDate()}
            ></Button>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.task} >
          <Text style={styles.taskText}>{ this.props.data.task }</Text>
          <DeleteTaskBtn item={this.state.item} />
          <DoneTaskBtn item={this.state.item} />
          <Button 
          style={styles.taskBtn} 
          title="&#9998;" 
          onPress={() => this.setState({edit: true}) }></Button>
          <SecretTaskBtn item={this.state.item} />
        </View>   
      )
    }
  }
}

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.uid){
    return {
      firebaseUID: state.CheckLoginReducer.uid
    }
  }
}

export default connect(mapStateToProps)(TaskItem);

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  noTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3D5E'
  },
  task: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3F4674',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 10
  },
  taskDone: {
    backgroundColor: '#6b6e70',
  },
  taskText: {
    flex: 3,
    padding: 16,
    color: 'white',
    fontSize: 15,
    flexWrap: "wrap"
  },
  taskBtn: {
    flex: 1
  },
  text:{
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center'
  },
  inputBtn:{
    height: 40,
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
  }
});