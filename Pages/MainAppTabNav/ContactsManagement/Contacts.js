//contacts.js
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      contacts: "",
      submitted: false
    }
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.loadContacts();
    });
  }

  loadContacts = async () => {
    const token = await AsyncStorage.getItem('app_session_token');
    fetch('http://localhost:3333/api/1.0.0/contacts', {
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
        console.log(error);
      });
  };

  addContact = async (userId) => {
    const url = 'http://localhost:3333/api/1.0.0/user/' + userId + '/contact';

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
        console.log('Success', 'User added as contact', [{ text: 'OK' }]);

      } else {
        console.log('Error occurred' + userId)
      }
    } catch (error) {
      console.log(error);
    }
  };

  blockContact = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/block`, {
        method: 'POST',
        headers: {
          "Content-Type": "image/png",
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
        },
        body: JSON.stringify({ user_id }),
      });

      if (response.status === 200) {
        console.log('Blocked Contact')
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
          "Content-Type": "image/png",
          "X-Authorization": await AsyncStorage.getItem("app_session_token"),
        },
      });

      if (response.status === 200) {
        console.log('Deleted contact from list')
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
                 <View style={styles.header}>
          <Text style={styles.headerText}>Contacts</Text>
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewBlockContact')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>View Blocked Contacts</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList style={styles.listContainer}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>Name: {item.first_name} {item.last_name}, ID: {item.user_id}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => this.blockContact(item.user_id)}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Block</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.deleteContact(item.user_id)}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Delete</Text>
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
  formContainer: {
    padding: 20,
    backgroundColor: "#0d416f",
  },
  button: {
    backgroundColor: '#F98125',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    width:"100%",
    paddingLeft:40,
    paddingRight:40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listItemText: {
    fontSize: 16,
    color: '#4A641E',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },

});