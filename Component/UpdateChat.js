import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UpdateChat extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:"",
            error: "", 
            submitted: false
        }

        this._onPressButton = this._onPressButton.bind(this)
    }

    async componentDidMount() {
        try {
          const token = await AsyncStorage.getItem('whatsthat_session_token');
    
          const headers = {
            'Content-Type': 'application/json',
            'X-Authorization': token,
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

        if (!this.state.name ) {
            this.setState({ error: "*Must enter a chat name " });
            return;
        }

        console.log("Chat Name: " + this.state.name + " . Changed! ");

        try {
            const token = await AsyncStorage.getItem('whatsthat_session_token');

            const headers = {
            "X-Authorization": token,
            "Content-Type": "application/json", 
            };

            const { chat_id } = this.props.route.params;
            const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    name: this.state.name,
                }),
            });

            const responseJson = await response.json();

            console.log("Chat name changed: ", responseJson.token);
            
        } catch (error) {
            console.log(error);
            this.props.navigation.navigate("ViewChats");
        }
    }

    render(){
        const { chat_id } = this.props.route.params;
        return (
            <View style={styles.container}>
               <Text style={styles.title}>Change Chat Name: {chat_id}</Text>
                <View style={styles.formContainer}>
                
            
                    <View style={styles.email}>
                       <Text style={styles.formLabel}>Chat Name:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, paddingVertical: 10}}
                            placeholder=" Enter chat name"
                            onChangeText={name => this.setState({name})}
                            defaultValue={this.state.name}
                        />

                        <>
                            {this.state.submitted && !this.state.name &&
                                <Text style={styles.error}>*Chat Name is Required</Text>
                            }
                        </>
                    </View>
            
                    <View style={styles.loginbtn}>
                        <TouchableOpacity onPress={() => this._onPressButton()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Change Chat Name</Text>
                                
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
    color:'#000000'
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