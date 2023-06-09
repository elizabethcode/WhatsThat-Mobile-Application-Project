// Contact
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { globalStyles } from '../globalStyles';

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      contacts: [],
      error: '',
      submitted: false
    };
  }

  componentDidMount() {
    // Add a listener to be triggered when the screen is focused
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      // Load contacts when the screen is focused
      this.LoadingAllContacts();
    });
  }

  // Load all contacts from the server
  LoadingAllContacts = async () => {
    try {
      const token = await AsyncStorage.getItem('app_session_token');
      const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      });

      if (response.status === 200) {
        const contacts = await response.json();
        this.setState({ contacts });
      } else {
        console.error('An error occurred while loading contacts');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Add a contact
  AddingContacts = async (userId) => {
    const url = `http://localhost:3333/api/1.0.0/user/${userId}/contact`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId
        })
      });

      if (response.status === 200) {
        console.log('User added as a contact successfully');
      } else {
        console.log('An error occurred while adding the contact');
      }
    } catch (error) {
      console.log('Error occurred while adding the contact:', error);
    }
  };

  // Block a contact
  BlockingContacts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${userId}/block`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.status === 200) {
        console.log('Contact successfully blocked');
        this.LoadingAllContacts();
        return true;
      } else {
        const errorData = await response.text();
        console.error(`An error occurred (${response.status}): ${errorData.message}`);
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Error blocking contact:', error);
      throw new Error('An error occurred while blocking the contact. Please try again.');
    }
  };

  //Deleting Contacts
  DeletingContact = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${userId}/contact`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
        },
      });

      if (response.status === 200) {
        console.log('Contact successfully deleted from the list');
        this.LoadingAllContacts();
        return true;
      } else if (response.status === 400) {
        const errorData = await response.text();
        console.error('Invalid request', errorData);
        throw new Error('Invalid request. You cannot delete yourself from the contacts list.');
      } else if (response.status === 401) {
        const errorData = await response.text();
        console.error('Unauthorized access', errorData);
        throw new Error('Access denied. Please log in and attempt again.');
      } else if (response.status === 404) {
        const errorData = await response.text();
        console.error('User not found', errorData);
        throw new Error('User not found. Please verify the user ID and try again with a valid one.');
      } else {
        const errorData = await response.text();
        console.error('Server error occurred', errorData);
        throw new Error('An unexpected server error occurred. Please attempt again later.');
      }
    } catch (error) {
      console.error('Error removing contact', error);
      throw new Error('Whilst removing a contact an error has occured. Please try again.');
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={globalStyles.Header}>
          <Text style={globalStyles.HeaderText}>Contacts</Text>
        </View>
        <View style={styles.AppFormContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DisplayBlockedContact')}>
            <View style={styles.Button}>
              <Text style={globalStyles.ButtonText}> View Blocked Contacts List</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.AppListContainer}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View style={styles.AppItemListContainer}>
              <Text style={styles.ItemListText}>Name: {item.first_name} {item.last_name}, ID: {item.user_id}</Text>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => this.BlockingContacts(item.user_id)}>
                  <View style={styles.Button}>
                    <Text style={globalStyles.ButtonText}>Block</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.DeletingContact(item.user_id)}>
                  <View style={styles.Button}>
                    <Text style={globalStyles.ButtonText}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  AppFormContainer: {
    backgroundColor: "#0d416f",
    padding: 20,
  },
  Button: {
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 50,
    backgroundColor: '#F98125',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  AppListContainer: {
    padding: 20,
  },
  AppItemListContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    paddingVertical: 10,

  },
  ItemListText: {
    color: '#4A641E',
    fontSize: 16,
  },
  ButtonContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
  },
});
