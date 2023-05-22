import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlatList } from 'react-native';

export default class ViewContacts extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: "", 
            contacts: "",
            submitted: false
        }
    }
    componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this. loadContacts();

  }); 
}
    componentWillUnmount() {
      this.unsubscribe();
  }

    loadContacts = async () => {
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        fetch('http://localhost:3333/api/1.0.0/contacts', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({ contacts: responseJson });
          })
          .catch((error) => {
            //console.log(error);
          });
      };



  blockContact = async (user_id) => {
    
    try {
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
            },
            body: JSON.stringify({ user_id }),
        });

        if (response.status === 200) {
          window.alert('contact blocked')
          this.loadContacts();
            return true;
        } else {
            const errorData = await response.text();
            console.error(`Error (${response.status}):`, errorData.message);
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error('Error blocking contact:', error);
        throw new Error('An error occurred while blocking the contact. Please try again.');
    }
};


    deleteContact = async (user_id) => {
    
    try {
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
            },
        });

        if (response.status === 200) {
          window.alert('this works')
          this.loadContacts()
            return true;

        } else if (response.status === 400) {
            const errorData = await response.text();
            console.error('Bad request', errorData);
            throw new Error('Bad request. You cannot remove yourself as a contact.');
        } else if (response.status === 401) {
            const errorData = await response.text();
            console.error('Unauthorised', errorData);
            throw new Error('Unauthorised. Please log in and try again.');
        } else if (response.status === 404) {
            const errorData = await response.text();
            console.error('User not found', errorData);
            throw new Error('User not found. Please try again with a valid user ID.');
        } else {
            const errorData = await response.text();
            console.error('Server error', errorData);
            throw new Error('Server error. Please try again later.');
        }
    } catch (error) {
        console.error('Error removing contact', error);
        throw new Error('An error occurred while removing the contact. Please try again.');
    }
};


render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
<TouchableOpacity onPress={() => this.props.navigation.navigate('BlockedContacts')}><Text>Open blocked contacts page</Text></TouchableOpacity>
 
        </View>
  
        <FlatList
          style={styles.listContainer}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                this.props.navigation.navigate("Single Chat", { contact: item })
              }
            >
              <View style={styles.listContainer}>
              <Text style={styles.listItemText}>{item.first_name}, {item.last_name}, {item.user_id}</Text> 
              <View style={styles.loginbtn}>
              <TouchableOpacity onPress={() => this.blockContact(item.user_id)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>block Contact</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteContact(item.user_id)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Delete Contact</Text>
              </View>
            </TouchableOpacity>
              </View>

              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
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
    color:'#4A641E',
    backgroundColor:'#A4B389',
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
   backgroundColor: '#A4B389',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',

    },
    buttonText: {
    fontSize:15,
    fontWeight:'bold',
    color:'#4A641E'
    },
    error: {
        color: "red",
        
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
      listContainer: {
        padding: 20,
      },
    
      title: {
        color: '#4A641E',
        backgroundColor: '#A4B389',
        padding: 10,
        fontSize: 25,
      },
    
      listItem: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
      },
    
      listItemText: {
        fontSize: 16,
        color: '#4A641E',
      },
      button: {
        backgroundColor: '#A4B389',
         paddingHorizontal: 10,
         paddingVertical: 10,
         borderRadius: 5,
         alignItems: 'center',
      },
    
  });