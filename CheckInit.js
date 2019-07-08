import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { LoginCheck, TaskList } from './actions/index';  //action
import Auth from './Auth';
import Home from './Home';

class CheckInit extends Component {
  constructor(props) {
    super(props);    
    this.props.LoginCheck();
  }

  render(){
    if (this.props.CheckLogin === 'Login and Fetch'){
      this.props.TaskList(this.props.firebaseUID);
      return (
        <Home />
      )
    } else if (this.props.CheckLogin === 'Login'){
      return (
        <Home />
      )
    } else if (this.props.CheckLogin === 'Unlogin') {
      return (
        <Auth />
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={{color: 'white', fontSize: 15}}>Loading</Text>
        </View>     
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    firebaseUID: state.CheckLoginReducer.uid,
    CheckLogin: state.CheckLoginReducer.status
  }
}

export default connect(mapStateToProps, {LoginCheck: LoginCheck, TaskList: TaskList})(CheckInit);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3A3D5E'
  },
});