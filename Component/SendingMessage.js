//SendingMessage
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../globalStyles';

export default class SendingMessage extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      message: '',
      error: '',
      submitted: false,
      messages: [],

    };

    // Bind the event handlers to the component instance
    this.MessageChangeHandler = this.MessageChangeHandler.bind(this);
    this.SendingMessage = this.SendingMessage.bind(this);
  }

  // Listen for the component to focus and call the message handling functions
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.MessageChangeHandler();
      this.SendingMessage();
    });
  }

  async componentDidMount() {
    try {
      // Retrieve the user token from AsyncStorage
      const token = await AsyncStorage.getItem('app_session_token');

      // Set the request headers
      const headers = {
        "X-Authorization": token,
        "Content-Type": "application/json"
      };

      // Extract the chat ID from the navigation params
      const { chat_id } = this.props.route.params;

      // Make a GET request to fetch the chat messages
      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
        headers,
      });

      // Parse the response JSON
      const responseJson = await response.json();

      // Reverse the order of messages and update the component state
      this.setState({ messages: responseJson.messages.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  // Event handler for message input change
  MessageChangeHandler = (message) => {
    this.setState({ message });
  };

  // Event handler for sending a message
  SendingMessage = async () => {
    this.setState({ submitted: true });
    this.setState({ error: '' });

    if (!this.state.message) {
      this.setState({ error: '*Must enter a message' });
      return;
    }

    try {
      // Retrieve the user token and ID from AsyncStorage
      const token = await AsyncStorage.getItem('app_session_token');
      const Id = await AsyncStorage.getItem('user_id');

      // Set the request headers
      const headers = {
        "X-Authorization": token,
        "Content-Type": "application/json"
      };

      // Extract the chat ID from the navigation params
      const { chat_id } = this.props.route.params;

      // Make a POST request to send the message
      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/message`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: this.state.message,
        }),
      });

      // Parse the response JSON
      const responseJson = await response.json();

      console.log('Message has been Sent: ', responseJson.token);

      // Update the component state to include the new message
      this.setState({
        messages: [{ message: this.state.message }, ...this.state.messages],
        message: '',
      });
    } catch (error) {
      // console.log(error);
    }
  };

  // Render each message in the FlatList
  DisplayAddedUserList = ({ item }) => {
    const { chat_id } = this.props.route.params;
    const timestamp = new Date(item.timestamp).toLocaleString();
    const first = item.author.first_name;
    const last = item.author.last_name;
    const { Id } = this.state
    const isCurrentUser = Id === item.author.user_id;
    return (
      <View style={styles.messageContainer}>

        <View style={styles.messageTextContainer}>
          <Text style={[styles.MessageText]}>
            {item.message}
            <br></br>
          </Text>
          <Text style={[styles.SentMessage]}>
            Sent from {first} {last} at: {timestamp}
          </Text>

        </View>
      </View>
    );
  };

  render() {
    const { chat_id } = this.props.route.params;
    const { name } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>
        
        <View style={styles.Header}>
          <Text style={globalStyles.HeaderText}> Chat: {chat_id}</Text>
          <View style={styles.HeaderButton}>

            <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate('UpdatingMessage', { chat_id: chat_id })}>
              <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>

          </View>
        </View>
        <br></br>
        <View style={styles.chatContainer}>
          <FlatList
            style={styles.listContainer}
            data={this.state.messages}
            renderItem={this.DisplayAddedUserList}
            ListEmptyComponent={() => <Text style={styles.NoMessagesText}>No messages found</Text>}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>

        <View style={styles.FormContainer}>
          <View style={styles.OuterInput}>
            <TextInput
              style={styles.Input}
              placeholder="Enter your message here"
              value={this.state.message}
              onChangeText={this.MessageChangeHandler}
            />
            {this.state.submitted && !this.state.message && (
              <Text style={styles.ErrorMessage}>*Message is required</Text>
            )}
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={this.SendingMessage}>
              <View style={globalStyles.Button}>
                <Text style={styles.ButtonText}>Send Message </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.error && <Text style={styles.ErrorMessage}>{this.state.error}</Text>}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#193A6F',
  },
  FormContainer: {
    padding: 20,
  },
  Input: {
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    margin: 5,
    color: '#000000',
    marginBottom: 5,
    padding: 10,
    width: '100%',
    fontSize: 18,
  },
  Header: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#F98125',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  HeaderButton: {
    flexDirection: 'row',
    backgroundColor: '#F98125',
  },
  Heading: {
    fontSize: 25,
    backgroundColor: '#146C94',
    color: '#FFFFFF'
  },

  HeaderNavigateButton: {
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    borderRadius: 15,
    backgroundColor: '#193A6F',
    paddingVertical: 5,
    alignItems: 'center',
    margin: 5,
  },

  MessageText: {
    flex: 19,
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 50,
    width: '40%',
    fontStyle: 'italic',
    margin: 10,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    fontSize:18,
  },
  ItemMenuText: {
    fontSize: 12,
    color: '#4A641E',
    marginLeft: 10,
  },
  ItemMenuText2: {
    fontSize: 12,
    color: 'red',
    marginLeft: 10,
  },

  GreyTextMessage: {
    flex: 19,
    borderRadius: 15,
    width: '40%',
    color: '#ffffff',
    padding: 5,
    margin: 5,
    backgroundColor: '#C0C0C0',
    alignSelf: 'flex-end',

  },
  SentMessage: {
    fontStyle: "italic",
    margin: 5,
    fontWeight: "bold",
    borderRadius: 15,
    color: "#F5BE1D",
    alignSelf: 'flex-end',
    flex: 19,
    width: "40%",
  },
  FormHeading: {
    flex: 19,
    fontSize: 15,
    padding: 5,
    color: '#4A641E',
    margin: 5,
  },
  OuterInput: {
    paddingVertical: 10,
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  NoMessagesText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF',
  },
  ErrorMessage:{
    color:"red",
  }

});