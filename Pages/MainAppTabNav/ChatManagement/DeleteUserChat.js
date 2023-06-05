// //DeleteUserChat - edited at uni
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

// export default class DeleteUserChat extends Component {
//   constructor(props) {
//     super(props);

//     // Initialize state variables
//     this.state = {
//       user_id: "",
//       ErrorMessage: "",
//       submitted: false,
//     };

//     this._onPressButton = this._onPressButton.bind(this);
//   }

//   _onPressButton = async () => {
//     // Set submitted flag to true and clear ErrorMessage message
//     this.setState({ submitted: true });
//     this.setState({ ErrorMessage: "" });

//     // Check if user_id is empty
//     if (!this.state.user_id) {
//       this.setState({ ErrorMessage: "*Must enter user id field" });
//       return;
//     }

//     console.log("Contact: " + this.state.user_id + " deleted ");

//     try {
//       // Get token from AsyncStorage
//       const token = await AsyncStorage.getItem("app_session_token");

//       // Set request headers
//       const headers = {
//         "Content-Type": "application/json",
//         "X-Authorization": token,
//       };

//       // Make a DELETE request to delete a contact
//       const response = await fetch(
//         "http://localhost:3333/api/1.0.0/user/" +
//           this.state.user_id +
//           "/contact",
//         {
//           method: "DELETE",
//           headers,
//           body: JSON.stringify({
//             user_id: this.state.user_id,
//           }),
//         }
//       );

//       // Parse the response as JSON
//       const responseJson = await response.json();

//       console.log("User deleted: ", responseJson.token);
//     } catch (ErrorMessage) {
//       console.log(ErrorMessage);
//       // Navigate to the Chats screen if an ErrorMessage occurs
//       this.props.navigation.navigate("Chats");
//     }
//   };

//   render() {
//     return (
//       <View style={styles.MainContainer}>
//         <View style={styles.Header}>
//           <Text style={styles.HeaderText}>Delete Contact</Text>
//         </View>
//         <View style={styles.FormContainer}>
//           <View style={styles.UserInputContainer}>
//             <Text style={styles.FormHeading}>User ID:</Text>
//             <TextInput
//               style={{ backgroundColor: "white", height: 40, borderWidth: 1, paddingVertical: 10, borderRadius:50, padding:10 }}
//               placeholder="Enter user_id"
//               onChangeText={(user_id) => this.setState({ user_id })}
//               defaultValue={this.state.user_id}
//             />

//             <>
//               {this.state.submitted && !this.state.user_id && (
//                 <Text style={styles.ErrorMessage}>*user_id is required</Text>
//               )}
//             </>
//           </View>

//           <View style={styles.loginbtn}>
//             <TouchableOpacity onPress={() => this._onPressButton()}>
//               <View style={styles.Button}>
//                 <Text style={styles.TextButton}>Delete Contact</Text>
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
//     backgroundColor: "#0d416f",
//   },
//   Header: {
//     backgroundColor: "#F98125",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   HeaderText: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     textAlign: "center",
//     marginBottom:10,
//     marginTop: 10,
   
//   },
//   FormContainer: {
//     padding: 20,
//   },
//   Heading: {
//     color: "#F57C00",
//     backgroundColor: "#FF9800",
//     padding: 10,
//     fontSize: 25,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   FormHeading: {
//     fontSize: 15,
//     color: "#FFFFFF",
//     paddingBottom:20,
//     fontWeight:"bold",
//   },
//   UserInputContainer: {
//     paddingVertical: 10,
//   },
//   loginbtn: {
   
//   },
//   Button: {
//     backgroundColor: "#F98125",
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 50,
//     alignItems: "center",
//   },
//   TextButton: {
//     fontSize: 15,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//   },
//   ErrorMessage: {
//     color: "#000000",
//   },
// });









//DeleteUserChat - edited at uni (css done)
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

export default class DeleteUserChat extends Component {
  constructor(props) {
    super(props);

    // Initialize state variables
    this.state = {
      user_id: "",
      error: "",
      submitted: false,
    };

    this.OnPressButton = this.OnPressButton.bind(this);
  }

  OnPressButton = async () => {
    // Set submitted flag to true and clear error message
    this.setState({ submitted: true });
    this.setState({ error: "" });

    // Check if user_id is empty
    if (!this.state.user_id) {
      this.setState({ error: "* Must Enter User ID Field" });
      return;
    }

    console.log("Contact: " + this.state.user_id + " deleted ");

    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("app_session_token");

      // Set request headers
      const headers = {
        "Content-Type": "application/json",
        "X-Authorization": token,
      };

      // Make a DELETE request to delete a contact
      const response = await fetch(
        "http://localhost:3333/api/1.0.0/user/" + this.state.user_id + "/contact",
        {
          method: "DELETE",
          headers,
          body: JSON.stringify({
            user_id: this.state.user_id,
          }),
        }
      );

      // Parse the response as JSON
      const responseJson = await response.json();

      console.log("User deleted: ", responseJson.token);
    } catch (error) {
      console.log(error);
      // Navigate to the Chats screen if an error occurs
      this.props.navigation.navigate("Chats");
    }
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>Delete Contact</Text>
        </View>
        <View style={styles.FormContainer}>
          <View style={styles.UserInputContainer}>
            <Text style={styles.FormHeading}>User ID:</Text>
            <TextInput style={{ Input }}
              // style={{ backgroundColor: "white", height: 40, borderWidth: 1, paddingVertical: 10, borderRadius:50, padding:10 }}
              placeholder="Enter user_id"
              onChangeText={(user_id) => this.setState({ user_id })}
              defaultValue={this.state.user_id}
            />

            <>
              {this.state.submitted && !this.state.user_id && (
                <Text style={styles.error}>*user_id is required</Text>
              )}
            </>
          </View>

          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={() => this.OnPressButton()}>
              <View style={styles.Button}>
                <Text style={styles.TextButton}>Delete Contact</Text>
              </View>
            </TouchableOpacity>
          </View>

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
    backgroundColor: "#0d416f",
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
  FormContainer: {
    padding: 20,
  },
  Heading: {
    color: "#F57C00",
    backgroundColor: "#FF9800",
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  FormHeading: {
    fontSize: 15,
    color: "#FFFFFF",
    paddingBottom: 20,
    fontWeight: "bold",
  },
  UserInputContainer: {
    paddingVertical: 10,
  },
  Input: {
    backgroundColor: "white",
    height: 40,
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 50,
    padding: 10
  },
  loginbtn: {

  },
  Button: {
    backgroundColor: "#F98125",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  TextButton: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  error: {
    color: "#000000",
  },
});
