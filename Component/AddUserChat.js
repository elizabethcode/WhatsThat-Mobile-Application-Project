import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
export default class AddUserChat extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_id: "",
            error: "", 
            submitted: false,
        }

        this._onPressButton = this._onPressButton.bind(this)
    }

    async componentDidMount() {
        try {
          const token = await AsyncStorage.getItem('whatsthat_session_token');
    
          const headers = {
            "X-Authorization": token,
            "Content-Type": "application/json", 
          };
    
          const { chat_id } = this.props.route.params;
          const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
            headers,
          });
    
          const responseJson = await response.json();
    
          this.setState({ messages: responseJson.messages.reverse() });
        } catch (error) {
          console.log(error);
        }
      }
      
    _onPressButton = async() => {
        this.setState({ submitted: true });
        this.setState({ error: "" });

        if (!this.state.user_id) {
            this.setState({ error: "*Must enter user id field" });
            return;
        }

        try {
         
            const token = await AsyncStorage.getItem('whatsthat_session_token');
    
            const headers = {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            };

            const { chat_id } = this.props.route.params;
            const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`+'/user/'+ this.state.user_id , {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    user_id: this.state.user_id,
                }),
            });

            const responseJson = await response.json();

            console.log("User Added: ", responseJson.token);

        } catch (error) {
            console.log(error);
            this.props.navigation.navigate("ViewChats");
        }
        
    }

    render(){  
   const { chat_id } = this.props.route.params;
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Add User To The Chat: {chat_id}</Text>
                <View style={styles.formContainer}>
                
                    <View style={styles.email}>
                       <Text style={styles.formLabel}>user ID:</Text>
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
                                <Text style={styles.buttonText}>Add Contact</Text>
                                
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
    backgroundColor: '#FFFFFF',
    },
     formContainer: {
    padding: 20,
    },

  title: {
    color:'#000000',
    backgroundColor:'#146C94',
    padding:10,
    fontSize:25
    },
   formLabel: {
    fontSize:15,
    color:'#146C94'
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
   backgroundColor: '#146C94',
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