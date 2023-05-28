//SendMessage
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default class SendMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: '',
      submitted: false,
      messages: [],
      
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.handleMessageChange();
      this.sendMessage();
    });
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('app_session_token');

      const headers = {
        "X-Authorization": token,
        "Content-Type": "application/json"
      };

      const { chat_id } = this.props.route.params;
      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}`, {
        headers,
      });

      const rJson = await response.json();

      this.setState({ messages: rJson.messages.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  handleMessageChange = (message) => {
    this.setState({ message });
  };

  sendMessage = async () => {
    this.setState({ submitted: true });
    this.setState({ error: '' });

    if (!this.state.message) {
      this.setState({ error: '*Must enter a message' });
      return;
    }

    try {
      const token = await AsyncStorage.getItem('app_session_token');
      const Id = await AsyncStorage.getItem('user_id');
      const headers = {
        "X-Authorization": token,
        "Content-Type": "application/json"
      };

      const { chat_id } = this.props.route.params;
      const response = await fetch(`http://localhost:3333/api/1.0.0/chat/${chat_id}/message`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
        message: this.state.message,
        }),
      });

      const rJson = await response.json();

      console.log('Message has been Sent: ', rJson.token);

      this.setState({
        messages: [{ message: this.state.message }, ...this.state.messages],
        message: '',
      });
    } catch (error) {
      // console.log(error);
    }
  };

 

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
          <Text style={[styles.messageText]}>
          {item.message}
          <br></br>
          </Text> 
          <Text style={[styles.messageSent]}>
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
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.title}> Chat: {chat_id}</Text>
      <View style={styles.buttonHeader}>

      <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="white"/>
                </TouchableOpacity>
 
 <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('ManageMessage', { chat_id: chat_id })}>
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
          contentContainerStyle={{flexGrow: 1 }}
        />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.email}>
            <TextInput
              style={styles.input}
              placeholder="Enter your message here"
              value={this.state.message}
              onChangeText={this.handleMessageChange}
            />
            {this.state.submitted && !this.state.message && (
              <Text style={styles.error}>*Message is required</Text>
            )}
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={this.sendMessage}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Send Message </Text>
              </View>
            </TouchableOpacity>
          </View>

          {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        </View>
        
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
  input: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '100%',
    fontSize: 18,
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#146C94',
    color: '#AFD3E2'
  },
  header: {
    backgroundColor: '#146C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  buttonHeader: {
    backgroundColor: '#146C94',
    flexDirection: 'row',
  },
  title: {
    backgroundColor: '#146C94',
    fontSize: 25,
  },
  addButton: {
    backgroundColor: '#146C94',
    margin:5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    color: '#AFD3E2',
    backgroundColor: '#146C94',
    padding: 10,
    fontSize: 25,
  },

  messageText: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '40%' ,
    fontStyle: 'italic',
    backgroundColor: '#146C94',
    color: 'black',
    alignSelf: 'flex-end',
    flex: 19,
  },
  menuItemText: {
    fontSize: 12,
    marginLeft: 10,
    color: '#4A641E',
  },
  menuItemTextt: {
    fontSize: 12,
    marginLeft: 10,
    color:'red',
  },

  messageTextGrey: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '40%' ,
    fontStyle: 'italic',
    backgroundColor: '#C0C0C0',
    color: '#ffffff',
    alignSelf: 'flex-end',
    flex: 19,
  },
  messageSent: {
    borderRadius: 15,
    padding: 5,
    margin: 5,
    width: '40%' ,
    fontStyle: 'italic',
    color: '#808080',
    alignSelf: 'flex-end',
    flex: 19,
    fontWeight: 'bold',
  },
  formLabel: {
    fontSize: 15,
    color: '#4A641E',
    flex: 19,
    padding: 5,
    margin: 5,
  },
  email: {
    paddingVertical: 10,
  },
  password: {
    paddingVertical: 10,
  },
  loginbtn: {},
  button: {
    backgroundColor: '#AFD3E2',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },

});
