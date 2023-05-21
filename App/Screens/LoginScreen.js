import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from "react-native";


import { NavigationContainer } from "@react-navigation/native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
//import CustomInput from "../App/CustomInput/CustomInput";

impoe

import * as EmailValidator from 'email-validator';
import AsyncStorage from '@react-native-async-storage/async-storage'


const NavigateToHome = props => {
  props.navigation.navigate('Home')
}



const LoginScreen = props => {
  
  return (

    <View style={styles.container}>

      <View style={styles.logTopView}>

        <View style={styles.inputContainer}>

          <View style={styles.EmailBox}>

            <Text style={styles.Titles}>Email</Text>

            <View style={styles.inputs}>
              <TextInput
                placeholder=""
                // value={ }
                // onChangeText={text => }
                style={styles.input}
              />
            </View>
          </View>


          <View style={styles.passwordBox}>

            <Text style={styles.Titles}>Password</Text>

            <View style={styles.inputs}>
              <TextInput
                placeholder=""
                // value={ }
                // onChangeText={text => }
                style={styles.input}
                secureTextEntry
              />
            </View>
          </View>








        </View>

      </View>

      <View style={styles.logBottomView}>

        <View style={styles.LoginButton}>
          <Button style={styles.Buttons}
            title="Login"
            onPress={() => NavigateToLogin(props)}
          />
        </View>

        <View style={styles.HomeButton}>
          <Button style={styles.Buttons}
            title="Back to Home"
            onPress={() => NavigateToHome(props)}
          />
        </View>







        {/* <CustomInput/> */}




      </View>





    </View>
  );
}

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logTopView: {
    flex: 1,
    backgroundColor: '#093F6E',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '70%',
  },

  logBottomView: {
    flex: 1,
    backgroundColor: '#093F6E',
    // backgroundColor: 'pink',
    flexDirection: 'column',
    paddingLeft: "40%",
    paddingRight: "40%",
    width: '100%',
    height: '30%',
  },

  inputContainer: {
    backgroundColor: "#093F6E",
    // backgroundColor: "red",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "40%",
    marginTop: 100,

  },

  inputs: {
    backgroundColor: 'orange',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 4,
    borderColor: "black",
    width: "130%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    padding: 2,
    width: "100%"
  },

 passwordBox: {
    marginRight: "10%",
  },

 Titles: {
      paddingTop: 20,
      paddingBottom: 10,
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
  },

  EmailBox: {
    marginRight: "10%",
  },

  LoginButton: {
    width: "100%",
    paddingTop: 70,
  },

  HomeButton: {
    paddingTop: 60,
    width: "100%",
  },






});