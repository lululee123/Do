import React, { Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import DoneTaskItem from '../../components/TaskBar/DoneTaskItem';
import MyHeader from '../component/MyHeader';
import AddTask from '../component/AddTask';

class Done extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <MyHeader menu={true} search={false} navigation={this.props.navigation} title="Task" />
        <AddTask />
        <View style={styles.inputBtnAdvance}>
          <Button
            color='#FBB321'
            title="Advance Setting"
            onPress={() => this.props.navigation.navigate('TaskAdvance')}
          />
        </View>
        {
          Object.keys(this.props.taskList).length === 0 ?
            <View style={styles.noTask}>
              <Text style={{color: 'white'}}>No Task!</Text>
            </View>
          :
            <View style={{flex: 1, paddingBottom: 10, backgroundColor: '#3A3D5E'}}>
              <ScrollView keyboardShouldPersistTaps='always' style={{flex: 1, backgroundColor: '#3A3D5E'}}>
                {
                  Object.keys(this.props.taskList).map(item => {
                    if (!this.props.taskList[item].secret){
                      if (this.props.taskList[item].done){
                        return (
                          <DoneTaskItem key={item} item={item} data={this.props.taskList[item]} />
                        ) 
                      }
                    }
                  })
                }
              </ScrollView>
            </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.list.task){
    return {
      taskList: state.CheckLoginReducer.list.task
    }
  }
  return {
    taskList: {}
  }
}

export default connect(mapStateToProps)(Done);

const styles = StyleSheet.create({
  noTask: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3D5E'
  },
  inputBtnAdvance:{
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#3A3D5E',
  }
});