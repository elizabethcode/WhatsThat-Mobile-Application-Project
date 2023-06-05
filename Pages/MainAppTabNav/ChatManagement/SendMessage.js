//SendMessage - edited at uni
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
// import { globalStyles } from '../../globalStyles';

export default class SendMessage extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      message: '',
      ErrorMessage: '',
      submitted: false,
      messages: [],

    };

    // Bind the event handlers to the component instance
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  // Listen for the component to focus and call the message handling functions
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.handleMessageChange();
      this.sendMessage();
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
    } catch (ErrorMessage) {
      console.log(ErrorMessage);
    }
  }

  // Event handler for message input change
  handleMessageChange = (message) => {
    this.setState({ message });
  };

  // Event handler for sending a message
  sendMessage = async () => {
    this.setState({ submitted: true });
    this.setState({ ErrorMessage: '' });

    if (!this.state.message) {
      this.setState({ ErrorMessage: '*Must enter a message' });
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
    } catch (ErrorMessage) {
      // console.log(ErrorMessage);
    }
  };

  // Render each message in the FlatList
  displayList = ({ item }) => {
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
          <Text style={styles.Heading}> Chat: {chat_id}</Text>
          <View style={styles.HeaderButton}>

            <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.HeaderNavigateButton} onPress={() => this.props.navigation.navigate('ManageMessage', { chat_id: chat_id })}>
              <Ionicons name="create" size={24} color="white" />
            </TouchableOpacity>

          </View>
        </View>
        <br></br>
        <View style={styles.chatContainer}>
          <FlatList
            style={styles.listContainer}
            data={this.state.messages}
            renderItem={this.displayList}
            ListEmptyComponent={() => <Text style={styles.noMessagesText}>No messages yet.</Text>}
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
              onChangeText={this.handleMessageChange}
            />
            {this.state.submitted && !this.state.message && (
              <Text style={styles.ErrorMessage}>*Message is required</Text>
            )}
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={this.sendMessage}>
              <View style={styles.Button}>
                <Text style={styles.TextButton}>Send Message </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.ErrorMessage && <Text style={styles.ErrorMessage}>{this.state.ErrorMessage}</Text>}
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
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '100%',
    fontSize: 18,
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    color: '#000000'
  },
  Header: {
    backgroundColor: '#146C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  HeaderButton: {
    backgroundColor: '#146C94',
    flexDirection: 'row',
  },
  Heading: {
    backgroundColor: '#146C94',
    fontSize: 25,
    color: '#FFFFFF'
  },

  HeaderNavigateButton: {
    backgroundColor: '#FFA500',
    margin: 5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  MessageText: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '40%',
    fontStyle: 'italic',
    backgroundColor: '#FFFFFF',
    color: '#000000',
    alignSelf: 'flex-end',
    flex: 19,
  },
  ItemMenuText: {
    fontSize: 12,
    marginLeft: 10,
    color: '#4A641E',
  },
  ItemMenuText2: {
    fontSize: 12,
    marginLeft: 10,
    color: 'red',
  },

  GreyTextMessage: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '40%',
    fontStyle: 'italic',
    backgroundColor: '#C0C0C0',
    color: '#ffffff',
    alignSelf: 'flex-end',
    flex: 19,
  },
  SentMessage: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '40%',
    fontStyle: 'italic',
    color: '#808080',
    alignSelf: 'flex-end',
    flex: 19,
    fontWeight: 'bold',
  },
  FormHeading: {
    fontSize: 15,
    color: '#4A641E',
    flex: 19,
    padding: 5,
    margin: 5,
  },
  OuterInput: {
    paddingVertical: 10,
  },
  Button: {
    width: "100%",
    backgroundColor: "#F98125",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  TextButton: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

});