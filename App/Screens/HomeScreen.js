import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Button, Text, Img } from "react-native";
// import Logo from './assets/MessengerLogo.png';

// import { Image } from 'react-native';

const NavigateToLogin = props => {
  props.navigation.navigate('Login')
}

const NavigateToRegister = props => {
  props.navigation.navigate('Register')
}

const Home = props => {
  return (
    <View style={styles.container}>

      <View style={styles.TopView}>
        <Text style={styles.Title}>Welcome to WhatsThat</Text>
      </View>

      <View style={styles.BottomView}>

        <View style={styles.LoginButton}>
          <Button style={styles.Buttons}
            title="Login"
            onPress={() => NavigateToLogin(props)}
          />
        </View>

        <View style={styles.RegisterButton}>
          <Button
            title="Register"
            onPress={() => NavigateToRegister(props)}
          />
        </View>

      </View>






    </View>


  );
}

export default Home;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  TopView: {
    flex: 1,
    backgroundColor: '#093F6E',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  BottomView: {
    flex: 1,
    backgroundColor: '#093F6E',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

  LoginButton: {
    width: "100%",
    paddingTop: 10,
    paddingLeft: "40%",
    paddingRight: "40%",
  },

  RegisterButton: {
    paddingTop: 60,
    width: "100%",
    paddingLeft: "40%",
    paddingRight: "40%",

  },

  Title: {
    color: 'orange',
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },

});