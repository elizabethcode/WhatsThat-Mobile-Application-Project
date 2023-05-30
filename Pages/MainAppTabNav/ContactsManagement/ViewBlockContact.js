// //blockedContacts
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';

export default class ViewBlockContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      contacts: "",
      submitted: false
    }
  }

  componentDidMount() {
    this.loadBlockedContacts();
  }

  loadBlockedContacts = async () => {
    const token = await AsyncStorage.getItem('app_session_token');
    fetch('http://localhost:3333/api/1.0.0/blocked', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((rJson) => {
        console.log(rJson);
        this.setState({ contacts: rJson });
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  Unblock = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
        },
      });

      if (response.status === 200) {
        console.log('Successfully unblocked contact');
        this.loadBlockedContacts();
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
        <View style={styles.header}>
          <Text style={styles.headerText}>Blocked Contacts</Text>
        </View>

        <FlatList
          style={styles.listContainer}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}> Name: {item.first_name} {item.last_name}, ID: {item.user_id}</Text>

              <TouchableOpacity onPress={() => this.Unblock(item.user_id)}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Unblock</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d416f',
  },
  header: {
    backgroundColor: "#F98125",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom:10,
    marginTop: 10,
  },
  listContainer: { 
    paddingTop:50,  
    paddingLeft:10,
    paddingRight: 10,

  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listItemText: {
    fontSize: 16,
    color: '#4A641E',
  },
  button: {
    backgroundColor: '#F98125',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    width:140,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
