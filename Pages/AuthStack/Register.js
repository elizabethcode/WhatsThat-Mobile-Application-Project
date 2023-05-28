// //Signup
import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as EmailValidator from "email-validator";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      submitted: false,
    };

    this._onSubmitSignup = this._onSubmitSignup.bind(this);
  }

  _onSubmitSignup() {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    if (
      !(
        this.state.email &&
        this.state.password &&
        this.state.firstName &&
        this.state.lastName &&
        this.state.confirmPassword
      )
    ) {
      this.setState({ error: "Enter the required fields" });
      return;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ error: "Enter a valid email" });
      return;
    }

    const PASSWORD_REGEX = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    );
    if (!PASSWORD_REGEX.test(this.state.password)) {
      this.setState({
        error:
          "Password is too weak. Only use, numbers, letters(One upper and one Lower), and these special characters:?=.*?[#?!@$%^&*-",
      });
      return;
    } else {
      console.log(
        "Button clicked: " + this.state.email + " " + this.state.password
      );
      console.log("Validated and ready to send to the API");

      this.signupSubmit();
    }
  }

  //Send signup request to API

  signupSubmit = async () => {
    const data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    console.log(data);

    fetch("http://localhost:3333/api/1.0.0/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw "Email already exists or Invalid email or password";
        } 
        
        
        
        
        else {
          throw "Something went wrong";
        }
      })
      .then((response) => {
        console.log(response);
        this.setState({ error: "User added successfully" });
        this.setState({ submitted: false });
        this.props.navigation.navigate("Login");
      })
      .then(async (rJson) => {
        console.log(rJson);
        await AsyncStorage.setItem(
          "app_session_token",
          rJson.token
        );
        this.props.navigation.navigate("Login"); //Navigate to login page after user registers their account
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error });
        this.setState({ submitted: false });
      });
  };

//   render() {
//     const navigation = this.props.navigation;

//     return (
      
//         <ScrollView>
//         <View style={styles.header}>
//             <Text style={styles.headerText}>Register</Text>
//           </View>
//           <View style={styles.container}>
//           <StatusBar style="auto" />
//           <View style={styles.appView}>
//             <View style={styles.firstNameStyle}>
//               <TextInput
//                 style={styles.TextInput}
//                 placeholder="Enter your forename"
//                 placeholderTextColor="#7a7d68"
//                 onChangeText={(firstName) => this.setState({ firstName })}
//                 defaultValue={this.state.firstName}
//               />

//               <>
//                 {this.state.submitted && !this.state.firstName && (
//                   <Text style={styles.errorMsg}>*Must enter a forename</Text>
//                 )}
//               </>
//             </View>
//           </View>

//           <View style={styles.appView}>
//             <View style={styles.lastNameStyle}>
//               <TextInput
//                 style={styles.TextInput}
//                 placeholder="Enter your Last Name"
//                 placeholderTextColor="#7a7d68"
//                 onChangeText={(lastName) => this.setState({ lastName })}
//                 defaultValue={this.state.lastName}
//               />

//               <>
//                 {this.state.submitted && !this.state.lastName && (
//                   <Text style={styles.errorMsg}>*Must enter a surname</Text>
//                 )}
//               </>
//             </View>
//           </View>

//           <View style={styles.appView}>
//             <View style={styles.email}>
//               <TextInput
//                 style={styles.TextInput}
//                 placeholder="Enter your Email"
//                 placeholderTextColor="#7a7d68"
//                 onChangeText={(email) => this.setState({ email })}
//                 defaultValue={this.state.email}
//               />

//               <>
//                 {this.state.submitted && !this.state.email && (
//                   <Text style={styles.errorMsg}>*Must enter an email</Text>
//                 )}
//               </>
//             </View>
//           </View>

//           <View style={styles.appView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Enter your Password"
//               placeholderTextColor="#7a7d68"
//               onChangeText={(password) => this.setState({ password })}
//               defaultValue={this.state.password}
//               secureTextEntry={true}
//             />

//             <>
//               {this.state.submitted && !this.state.password && (
//                 <Text style={styles.errorMsg}>*Must enter a password</Text>
//               )}
//             </>
//           </View>

//           <View style={styles.appView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Confirm Password"
//               placeholderTextColor="#7a7d68"
//               onChangeText={(confirmPassword) =>
//                 this.setState({ confirmPassword })
//               }
//               defaultValue={this.state.confirmPassword}
//               secureTextEntry={true}
//             />

//             <>
//               {this.state.submitted && !this.state.confirmPassword && (
//                 <Text style={styles.errorMsg}>*Passwords do not match</Text>
//               )}
//             </>
//           </View>

//           <View>
//             <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//               <Text style={styles.createAccountButton}>
//                 Already have an account? Sign In
//               </Text>
//             </TouchableOpacity>
//           </View>



//           <View>
//           {this.state.error && (
//               <Text style={styles.errorMsg}>{this.state.error}</Text>
//             )}
//           </View>  

//           <View style={styles.button}>
//             <TouchableOpacity onPress={this.signupSubmit.bind(this)}>
//               <View>
//                 <Text style={styles.buttonText}>Register</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//           </View>
//         </ScrollView>
      
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0d416f",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   header: {
//     backgroundColor: "#F98125",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   headerText: {
//     fontSize: 25,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//     textAlign: "center",
//     marginBottom:10,
//     marginTop: 10,
    
//   },
//   appView: {
//     backgroundColor: "#f4f4f4",
//     borderRadius: 50,
//     width: "30%",
//     height: 45,
//     marginTop: 20,
//     marginBottom: 10,
//     flexDirection: "row",
//     // alignItems: "center",
//   },
//   TextInput: {
//     flex: 1,
//     paddingLeft: 10,
//     color: "black",
//     width: 600,
//     borderRadius:50,


//   },
//   createAccountButton: {
//     height: 30,
//     marginBottom: 30,
//     textDecorationLine: "underline",
//     color: "#FFFFFF",
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#FF6F00",
//     borderRadius: 25,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 30,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 20,
//   },
//   errorMsg: {
//     color: "red",
//     fontWeight: "650",
//     marginBottom: 10,
//     textAlign: "center",
//   },
// });



render() {
  const navigation = this.props.navigation;

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register</Text>
      </View>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.appView}>
          <Text style={styles.inputTitle}>Forename</Text>
          <View style={styles.firstNameStyle}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(firstName) => this.setState({ firstName })}
              defaultValue={this.state.firstName}
            />

            <>
              {this.state.submitted && !this.state.firstName && (
                <Text style={styles.errorMsg}>*Must enter a forename</Text>
              )}
            </>
          </View>
        </View>

        <View style={styles.appView}>
          <Text style={styles.inputTitle}>Surname</Text>
          <View style={styles.lastNameStyle}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(lastName) => this.setState({ lastName })}
              defaultValue={this.state.lastName}
            />

            <>
              {this.state.submitted && !this.state.lastName && (
                <Text style={styles.errorMsg}>*Must enter a surname</Text>
              )}
            </>
          </View>
        </View>

        <View style={styles.appView}>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={styles.email}>
            <TextInput
              style={styles.TextInput}

              onChangeText={(email) => this.setState({ email })}
              defaultValue={this.state.email}
            />

            <>
              {this.state.submitted && !this.state.email && (
                <Text style={styles.errorMsg}>*Must enter an email</Text>
              )}
            </>
          </View>
        </View>

        <View style={styles.appView}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.TextInput}
            onChangeText={(password) => this.setState({ password })}
            defaultValue={this.state.password}
            secureTextEntry={true}
          />

          <>
            {this.state.submitted && !this.state.password && (
              <Text style={styles.errorMsg}>*Must enter a password</Text>
            )}
          </>
        </View>

        <View style={styles.appView}>
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <TextInput
            style={styles.TextInput}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            defaultValue={this.state.confirmPassword}
            secureTextEntry={true}
          />

          <>
            {this.state.submitted && !this.state.confirmPassword && (
              <Text style={styles.errorMsg}>*Passwords do not match</Text>
            )}
          </>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.createAccountButton}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {this.state.error && (
            <Text style={styles.errorMsg}>{this.state.error}</Text>
          )}
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={this.signupSubmit.bind(this)}>
            <View>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#0d416f",
  alignItems: "center",
  justifyContent: "center",
  height:"100%",
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
  marginBottom: 10,
  marginTop: 10,
},
appView: {
  backgroundColor: "#f4f4f4",
  borderRadius: 50,
  width: "70%",
  height: 45,
  marginTop: 20,
  marginBottom: 20,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
},
TextInput: {
  flex: 1,
  paddingLeft: 10,
  color: "black",
  borderRadius: 50,
},
inputTitle: {
  fontWeight: "bold",
  marginRight: 10,
  color: "#333333",
},
createAccountButton: {
  // height: 30,
  // marginBottom: 10,
  textDecorationLine: "underline",
  color: "#FFFFFF",
},
button: {
  width: "70%",
  backgroundColor: "#FF6F00",
  borderRadius: 25,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 30,
},
buttonText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  padding: 20,
},
errorMsg: {
  color: "red",
  fontWeight: "650",
  marginBottom: 10,
  textAlign: "center",
},
});