import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View} from 'react-native';
import DeleteTaskBtn from './DeleteTaskBtn';
import UnDoneTaskBtn from './UnDoneTaskBtn';
import SecretTaskBtn from './SecretTaskBtn';

const DoneTaskItem = props => {
  return (
    <View style={[styles.task, styles.taskDone]} >
      <Text style={styles.taskText}>{ props.data.task }</Text>
      <DeleteTaskBtn item={props.item} />
      <UnDoneTaskBtn item={props.item} />
      <SecretTaskBtn item={props.item} />
    </View>   
  )
}

const mapStateToProps = (state) => {
  if (state.CheckLoginReducer.uid){
    return {
      firebaseUID: state.CheckLoginReducer.uid
    }
  }
}

export default connect(mapStateToProps)(DoneTaskItem);

const styles = StyleSheet.create({
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
    height: 50,
    color: 'white',
    fontSize: 15,
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  }
});