// //UpdateChat - edited at uni
// import React, { Component } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { globalStyles } from '../../globalStyles';

// export default class UpdateChat extends Component {
//   constructor(props) {
//     super(props);

//     // Initialize the component's state
//     this.state = {
//       name: "",
//       ErrorMessage: "",
//       submitted: false,
//     };

//     // Bind the event handler to the component instance
//     this._onPressButton = this._onPressButton.bind(this);
//   }

//   // Fetch the chat details from the server on component mount
//   async componentDidMount() {
//     try {
//       // Retrieve the user token from AsyncStorage
//       const token = await AsyncStorage.getItem("app_session_token");

//       // Set the request headers
//       const headers = {
//         "Content-Type": "application/json",
//         "X-Authorization": token,
//       };

//       // Extract the chat ID from the navigation params
//       const { chat_id } = this.props.route.params;

//       // Make a GET request to fetch the chat details
//       const response = await fetch(
//         `http://localhost:3333/api/1.0.0/chat/${chat_id}`,
//         {
//           headers,
//         }
//       );

//       // Parse the response JSON
//       const responseJson = await response.json();

//        // Reverse the order of messages and update the component state
//       this.setState({ messages: responseJson.messages.reverse() });
//     } catch (ErrorMessage) {
//       console.log(ErrorMessage);
//     }
//   }

//   // Event handler for the Button press
//   _onPressButton = async () => {
//     this.setState({ submitted: true });
//     this.setState({ ErrorMessage: "" });

//     if (!this.state.name) {
//       this.setState({ ErrorMessage: "*Must enter a chat name " });
//       return;
//     }

//     // Log the changed chat name to the console
//     console.log("Chat Name: " + this.state.name + " . Changed! ");

//     try {
//       // Retrieve the user token from AsyncStorage
//       const token = await AsyncStorage.getItem("app_session_token");

//       // Set the request headers
//       const headers = {
//         "Content-Type": "application/json",
//         "X-Authorization": token,
//       };

//       // Extract the chat ID from the navigation params
//       const { chat_id } = this.props.route.params;

//       // Make a PATCH request to update the chat name
//       const response = await fetch(
//         `http://localhost:3333/api/1.0.0/chat/${chat_id}`,
//         {
//           method: "PATCH",
//           headers,
//           body: JSON.stringify({
//             name: this.state.name,
//           }),
//         }
//       );

//       // Parse the response JSON
//       const responseJson = await response.json();

//       console.log("Chat name changed: ", responseJson.token);
//     } catch (ErrorMessage) {
//       console.log(ErrorMessage);
//       this.props.navigation.navigate("ViewChats");
//     }
//   };

//   render() {
//     const { chat_id } = this.props.route.params;
//     return (
//       <View style={styles.MainContainer}>
//         <Text style={styles.Heading}>Change Chat Name: {chat_id}</Text>
//         <View style={styles.FormContainer}>
//           <View style={styles.OuterInput}>
//             <Text style={styles.FormHeading}>Chat Name:</Text>
//             <TextInput
//               style={{ height: 40, borderWidth: 1, paddingVertical: 10 }}
//               placeholder=" Enter chat name"
//               onChangeText={(name) => this.setState({ name })}
//               defaultValue={this.state.name}
//             />

//             <>
//               {this.state.submitted && !this.state.name && (
//                 <Text style={styles.ErrorMessage}>*Chat Name is Required</Text>
//               )}
//             </>
//           </View>

//           <View style={styles.loginbtn}>
//             <TouchableOpacity onPress={() => this._onPressButton()}>
//               <View style={styles.Button}>
//                 <Text style={styles.TextButton}>Change Chat Name</Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <>
//             {this.state.ErrorMessage && (
//               <Text style={styles.ErrorMessage}>{this.state.ErrorMessage}</Text>
//             )}
//           </>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   MainContainer: {
//     flex: 1,
//     backgroundColor: "#F6F1F1",
//   },
//   FormContainer: {
//     padding: 20,
//   },

//   Heading: {
//     color: "#AFD3E2",
//     backgroundColor: "#146C94",
//     padding: 10,
//     fontSize: 25,
//   },
//   FormHeading: {
//     fontSize: 15,
//     color: "#000000",
//   },
//   OuterInput: {
//     paddingVertical: 10,
//   },
//   Button: {
//     backgroundColor: "#146C94",
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   TextButton: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: "#000000",
//   },
//   ErrorMessage: {
//     color: "red",
//   },
// });






//UpdateChat - edited at uni
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { globalStyles } from '../../globalStyles';

export default class UpdateChat extends Component {
  constructor(props) {
    super(props);

    // Initialize the component's state
    this.state = {
      name: "",
      error: "",
      submitted: false,
    };

    // Bind the event handler to the component instance
    this.OnPressButton = this.OnPressButton.bind(this);
  }

  // Fetch the chat details from the server on component mount
  async componentDidMount() {
    try {
      // Retrieve the user token from AsyncStorage
      const token = await AsyncStorage.getItem("app_session_token");

      // Set the request headers
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      // Extract the chat ID from the navigation params
      const { chat_id } = this.props.route.params;

      // Make a GET request to fetch the chat details
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}`,
        {
          headers,
        }
      );

      // Parse the response JSON
      const responseJson = await response.json();

      // Reverse the order of messages and update the component state
      this.setState({ messages: responseJson.messages.reverse() });
    } catch (error) {
      console.log(error);
    }
  }

  // Event handler for the Button press
  OnPressButton = async () => {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    if (!this.state.name) {
      this.setState({ error: "*Must enter a chat name " });
      return;
    }

    // Log the changed chat name to the console
    console.log("Chat Name: " + this.state.name + " . Changed! ");

    try {
      // Retrieve the user token from AsyncStorage
      const token = await AsyncStorage.getItem("app_session_token");

      // Set the request headers
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      // Extract the chat ID from the navigation params
      const { chat_id } = this.props.route.params;

      // Make a PATCH request to update the chat name
      const response = await fetch(
        `http://localhost:3333/api/1.0.0/chat/${chat_id}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            name: this.state.name,
          }),
        }
      );

      // Parse the response JSON
      const responseJson = await response.json();

      console.log("Chat name changed: ", responseJson.token);
    } catch (error) {
      console.log(error);
      this.props.navigation.navigate("ViewChats");
    }
  };

  render() {
    const { chat_id } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>

        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Change Chat Name: {chat_id}</Text>
        </View>
        <View style={styles.FormContainer}>
          <View style={styles.OuterInput}>
            <Text style={styles.FormHeading}>Chat Name:</Text>
            <TextInput style={styles.Input}
              placeholder=" Enter chat name"
              onChangeText={(name) => this.setState({ name })}
              defaultValue={this.state.name}
            />

            <>
              {this.state.submitted && !this.state.name && (
                <Text style={styles.error}>*Chat Name is Required</Text>
              )}
            </>
          </View>

          <TouchableOpacity onPress={() => this.OnPressButton()}>
            <View style={styles.Button}>
              <Text style={styles.TextButton}>Update Chat Name</Text>
            </View>
          </TouchableOpacity>
          <>
            {this.state.error && (
              <Text style={styles.error}>{this.state.error}</Text>
            )}
          </>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#193A6F",
  },
  FormContainer: {
    padding: 20,
  },
  Header: {
    backgroundColor: "#F98125",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  HeaderText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    padding: 10,
  },
  FormHeading: {
    fontSize: 16,
    color: "#FFF",
    paddingBottom: 20,
    fontWeight: "bold",
  },
  OuterInput: {
    paddingVertical: 20,
    paddingBottom: 20,
  },
  Input: {
    height: 40,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 50,
    fontSize: 18,
    backgroundColor: "white",
    padding:20,

  },
  Button: {
    backgroundColor: "#F98125",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    borderRadius: 50,
  },
  TextButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  error: {
    color: "red",
  },
});