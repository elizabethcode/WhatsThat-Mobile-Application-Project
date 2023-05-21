import React, { Component } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default class Single_Chat extends Component{

render(){
    return(
        <View>
        <Text>Hello World</Text>
        </View>
    );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "80%",
        alignItems: "stretch",
        justifyContent: "center"
    },
    first_name_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },
    last_name_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },

    email_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },
    password_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },
    formContainer: {

    },
    email: {
        marginBottom: 5
    },
    password: {
        marginBottom: 10
    },
    signupbtn: {

    },
    signup: {
        justifyContent: "center",
        textDecorationLine: "underline"
    },
    button: {
        marginBottom: 30,
        backgroundColor: '#2196F3'
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white'
    },
    header: {
        fontSize: 30,
        fontWeight: '900'
    }
});