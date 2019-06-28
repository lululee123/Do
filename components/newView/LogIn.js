import React, { Component } from 'react';
import * as firebase from "firebase";
import { StyleSheet, Text, View, Image, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      forgetPasswordEmail: "",
      forget: false
    };
  }

  LogIn = (email, password) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      this.setState({
        msg: "Success"
      })
    )
    .catch( error => {
      this.setState({
        msg: error.toString(error)
      })
    });
  };

  ForgetPasswordTrigger =() => {
    this.setState({
      forget: !this.state.forget
    })
  }

  SendEmail = (yourEmail) => {
    if (yourEmail.trim() !== ''){
      firebase
      .auth()
      .fetchSignInMethodsForEmail(yourEmail)
      .then( result => {
          if (result.length > 0) {
            firebase
            .auth()
            .sendPasswordResetEmail(yourEmail)
            .then(
              this.setState({
                msg: "Please Check Your Mail Box"
              })
            )
          }
        }
      )
      .catch(
        this.setState({
          msg: "Email is not exist!"
        })
      );
    }
  }

  render(){
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.loginContainer}>
            <Image style={styles.logo} source={require('../../image/task.png')} />
          </View>
          <View style={{alignItems: 'center',justifyContent: 'center', marginBottom: 20}}>
            <Text style={{color: 'white', fontSize: 15}}>{ this.state.msg }</Text>
          </View>
          {
            this.state.forget ?

              <View>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder='Email' 
                  placeholderTextColor='rgba(225,225,225,0.7)'
                  onChangeText={forgetPasswordEmail => this.setState({ forgetPasswordEmail })}
                />
                <TouchableOpacity 
                  style={styles.buttonContainer} 
                  onPress={() => this.SendEmail(this.state.forgetPasswordEmail)}
                >             
                  <Text style={styles.buttonText}>SEND</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={this.ForgetPasswordTrigger}
                  style={{marginBottom: 30}}
                >             
                  <Text style={styles.buttonText}>BACK</Text>
                </TouchableOpacity>
              </View>
            : 
            <View>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                placeholder='Email' 
                placeholderTextColor='rgba(225,225,225,0.7)'
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder='Password' 
                placeholderTextColor='rgba(225,225,225,0.7)'
                onChangeText={password => this.setState({ password })}
              />
              <TouchableOpacity 
                style={styles.buttonContainer} 
                onPress={() => this.LogIn(this.state.email, this.state.password)}
              >             
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={this.ForgetPasswordTrigger}
                style={{marginBottom: 30}}
              >             
                <Text style={styles.buttonText}>FORGET</Text>
              </TouchableOpacity>
            </View>
          }
        </KeyboardAvoidingView>  
      </TouchableWithoutFeedback>
    );
  }
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3D5E',
    justifyContent: 'flex-end',
    padding: 20
  },
  loginContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
      position: 'absolute',
      width: 100,
      height: 100
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