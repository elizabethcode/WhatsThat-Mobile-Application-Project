import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Block extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_id: "",
            error: "", 
            submitted: false
        }

        this._onPressButton = this._onPressButton.bind(this)
    }

    _onPressButton = async() => {
        this.setState({ submitted: true });
        this.setState({ error: "" });

        if (!this.state.user_id) {
            this.setState({ error: "*Must enter user id field" });
            return;
        }

        console.log("Contact: " + this.state.user_id + " Blocked ");

        try {
            const token = await AsyncStorage.getItem('@session_token');

            const headers = {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            };

            const response = await fetch('http://localhost:3333/api/1.0.0/user/'+ this.state.user_id +'/block', {
                method: 'post',
                headers,
                body: JSON.stringify({
                    user_id: this.state.user_id,
                }),
            });

            const responseJson = await response.json();

            console.log("User Blocked: ", responseJson.token);
        } catch (error) {
            console.log(error);
            this.props.navigation.navigate("Blocked");
        }
    }

    render(){
        return (
            <View style={styles.container}>
               <Text style={styles.title}>Block Contact</Text>
                <View style={styles.formContainer}>
                
                    <View style={styles.email}>
                       <Text style={styles.formLabel}>user_id:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, paddingVertical: 10}}
                            placeholder=" Enter user_id"
                            onChangeText={user_id => this.setState({user_id})}
                            defaultValue={this.state.user_id}
                        />

                        <>
                            {this.state.submitted && !this.state.user_id &&
                                <Text style={styles.error}>*user_id is required</Text>
                            }
                        </>
                    </View>
            
                    <View style={styles.loginbtn}>
                        <TouchableOpacity onPress={() => this._onPressButton()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Block Contact</Text>
                                
                            </View>
                        </TouchableOpacity>
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>
            
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: '#F6F1F1',
    },
     formContainer: {
    padding: 20,
    },

  title: {
    color:'#AFD3E2',
    backgroundColor:'#146C94',
    padding:10,
    fontSize:25
    },
   formLabel: {
    fontSize:15,
    color:'#4A641E'
  },
    email:{
     paddingVertical: 10
    },

    password:{
     paddingVertical: 10
    },

    loginbtn:{
  
    },
    button: {
   backgroundColor: '#19A7CE',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',

    },
    buttonText: {
    fontSize:15,
    fontWeight:'bold',
    color:'#000000'
    },
    error: {
        color: "red",
        
    }
  });