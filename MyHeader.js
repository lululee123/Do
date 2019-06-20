import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

const MyHeader = props => {
  return (
    <View style={styles.titleBar}>
      {
        props.menu ? 
        <TouchableWithoutFeedback  onPress={() => props.navigation.toggleDrawer()} >
          <Image style={styles.imageStyle} source={require('./image/menu.png')} />
        </TouchableWithoutFeedback> :
        <View></View>
      }
      <Text style={styles.titleBarText}>{props.title}</Text>
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  titleBar: {
    height: 80,
    backgroundColor: '#3A3D5E',
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  titleBarText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: "bold",
    flex: 1
  },
  imageStyle: {
    width: 30, 
    height: 22, 
    position: 'absolute',
    top: 45,
    left: 20, 
    zIndex: 1
  }
});