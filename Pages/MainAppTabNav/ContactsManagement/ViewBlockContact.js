//ViewBlockedContacts - completed
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
// import { globalStyles } from '../../globalStyles';

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
    this.LoadingUnblockedContacts();
  }

  // // Fetches the list of unblocked contacts from the server
  LoadingUnblockedContacts = async () => {
    try {
      const token = await AsyncStorage.getItem('app_session_token');
      const response = await fetch('http://localhost:3333/api/1.0.0/blocked', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        this.setState({ contacts: data });
      } else {
        throw new Error('Failed to load unblocked contacts.');
      }
    } catch (error) {
      console.error('Error loading unblocked contacts:', error);
      throw new Error('An error occurred while loading unblocked contacts. Please try again.');
    }
  };

  // // Unblocks a contact by sending a DELETE request to the server
  UnblockingContact = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${userId}/block`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
        },
      });

      if (response.ok) {
        console.log('Successfully unblocked contact');
        this.LoadingUnblockedContacts();
        return true;
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Bad request', errorData);
        throw new Error(errorData.message);
      } else if (response.status === 401) {
        const errorData = await response.json();
        console.error('Unauthorized', errorData);
        throw new Error(errorData.message);
      } else if (response.status === 404) {
        const errorData = await response.json();
        console.error('User not found', errorData);
        throw new Error(errorData.message);
      } else {
        const errorData = await response.json();
        console.error('Server error', errorData);
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Error removing contact', error);
      throw new Error('An error occurred while removing the contact. Please try again.');
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Blocked Contacts</Text>
        </View>

        <FlatList
          style={styles.ContactListContainer}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View style={styles.ContactItemListContainer}>
              <Text style={styles.ItemListText}> Name: {item.first_name} {item.last_name}, ID: {item.user_id}</Text>

              <TouchableOpacity onPress={() => this.UnblockingContact(item.user_id)}>
                <View style={styles.Button}>
                  <Text style={styles.ButtonText}>Unblock</Text>
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
  MainContainer: {
    flex: 1,
    backgroundColor: '#0d416f',
  },
  Header: {
    backgroundColor: "#F98125",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  HeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  ContactListContainer: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,

  },
  ContactItemListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  ItemListText: {
    fontSize: 16,
    color: '#4A641E',
  },
  Button: {
    backgroundColor: '#F98125',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    width: 140,
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
