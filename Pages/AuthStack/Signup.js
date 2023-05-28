// //Signup
// import { StatusBar } from "expo-status-bar";
// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import * as EmailValidator from "email-validator";

// export default class Signup extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       error: "",
//       submitted: false,
//     };

//     this._onSubmitSignup = this._onSubmitSignup.bind(this);
//   }

//   _onSubmitSignup() {
//     this.setState({ submitted: true });
//     this.setState({ error: "" });

//     if (
//       !(
//         this.state.email &&
//         this.state.password &&
//         this.state.firstName &&
//         this.state.lastName &&
//         this.state.confirmPassword
//       )
//     ) {
//       this.setState({ error: "Enter the required fields" });
//       return;
//     } else if (!EmailValidator.validate(this.state.email)) {
//       this.setState({ error: "Enter a valid email" });
//       return;
//     }

//     const PASSWORD_REGEX = new RegExp(
//       "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
//     );
//     if (!PASSWORD_REGEX.test(this.state.password)) {
//       this.setState({
//         error:
//           "Password is too weak. Only use, numbers, letters(One upper and one Lower), and these special characters:?=.*?[#?!@$%^&*-",
//       });
//       return;
//     } else {
//       console.log(
//         "Button clicked: " + this.state.email + " " + this.state.password
//       );
//       console.log("Validated and ready to send to the API");

//       this.signupSubmit();
//     }
//   }

//   //Send signup request to API

//   signupSubmit = async () => {
//     const data = {
//       first_name: this.state.firstName,
//       last_name: this.state.lastName,
//       email: this.state.email,
//       password: this.state.password,
//     };

//     console.log(data);

//     fetch("http://localhost:3333/api/1.0.0/user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           return response.json();
//         } else if (response.status === 400) {
//           throw "Email already exists or Invalid email or password";
//         } else {
//           throw "Something went wrong";
//         }
//       })
//       .then((response) => {
//         console.log(response);
//         this.setState({ error: "User added successfully" });
//         this.setState({ submitted: false });
//         this.props.navigation.navigate("Login");
//       })
//       .then(async (responseJson) => {
//         console.log(responseJson);
//         await AsyncStorage.setItem(
//           "@whatsThat_session_token",
//           responseJson.token
//         );
//         this.props.navigation.navigate("Login"); //Navigate to login page after user registers their account
//       })
//       .catch((error) => {
//         console.log(error);
//         this.setState({ error: error });
//         this.setState({ submitted: false });
//       });
//   };

//   render() {
//     const navigation = this.props.navigation;

//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           {/* <Text style={styles.title}>Create an account</Text> */}
//           {/* <Text style>Email:</Text> */}
//           <StatusBar style="auto" />
//           <View style={styles.appView}>
//             <View style={styles.firstNameStyle}>
//               <TextInput
//                 style={styles.TextInput}
//                 placeholder="Enter your First Name:"
//                 placeholderTextColor="#7a7d68" //text colour
//                 onChangeText={(firstName) => this.setState({ firstName })}
//                 defaultValue={this.state.firstName}
//               />

//               <>
//                 {this.state.submitted && !this.state.firstName && (
//                   <Text style={styles.errorMsg}>*First Name is required</Text>
//                 )}
//               </>
//             </View>
//           </View>

//           <View style={styles.appView}>
//             <View style={styles.lastNameStyle}>
//               <TextInput
//                 style={styles.TextInput}
//                 placeholder="Enter your Last Name:"
//                 placeholderTextColor="#7a7d68" //text colour
//                 onChangeText={(lastName) => this.setState({ lastName })}
//                 defaultValue={this.state.lastName}
//               />

//               <>
//                 {this.state.submitted && !this.state.lastName && (
//                   <Text style={styles.errorMsg}>*Last Name is required</Text>
//                 )}
//               </>
//             </View>
//           </View>

//           <View style={styles.appView}>
//             <View style={styles.email}>
//               <TextInput
//                 style={styles.TextInput}
//                 placeholder="Enter your Email:"
//                 placeholderTextColor="#7a7d68" //text colour
//                 onChangeText={(email) => this.setState({ email })}
//                 defaultValue={this.state.email}
//               />

//               <>
//                 {this.state.submitted && !this.state.email && (
//                   <Text style={styles.errorMsg}>*Email is required</Text>
//                 )}
//               </>
//             </View>
//           </View>

//           <View style={styles.appView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Enter your Password:"
//               placeholderTextColor="#7a7d68" //text colour
//               onChangeText={(password) => this.setState({ password })}
//               defaultValue={this.state.password}
//               secureTextEntry={true}
//             />

//             <>
//               {this.state.submitted && !this.state.password && (
//                 <Text style={styles.errorMsg}>*Password is required</Text>
//               )}
//             </>
//           </View>

//           <View style={styles.appView}>
//             <TextInput
//               style={styles.TextInput}
//               placeholder="Confirm Password:"
//               placeholderTextColor="#7a7d68" //text colour
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
//                 Already have an account?
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.button}>
//             <TouchableOpacity onPress={this.signupSubmit.bind(this)}>
//               <View>
//                 <Text style={styles.buttonText}>Sign up</Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <>
//             {this.state.error && (
//               <Text style={styles.errorMsg}>{this.state.error}</Text>
//             )}
//           </>
//           {/* </View> */}
//         </ScrollView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     paddingVertical: 50,
//   },
//   imageLogo: {
//     width: 200,
//     height: 200,
//     marginBottom: 70,
//   },
//   appView: {
//     backgroundColor: "#f4f4f4", //slight white //Text Input colour #d6d9d0
//     borderRadius: 10, //change to 30 for more round edges
//     width: "70%",
//     height: 45,
//     marginBottom: 20,
//     flexDirection: "row", // added this to align the icon and input field horizontally
//     alignItems: "center",
//     paddingHorizontal: 10, // added padding to the input field to align text properly
//   },
//   buttonText: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//     paddingLeft: 10, // added padding to the input field to align text properly
//   },
//   createAccountButton: {
//     height: 30,
//     marginBottom: 30,
//     textDecorationLine: "underline",
//   },
//   button: {
//     width: "80%",
//     backgroundColor: "#7a7d68",
//     borderRadius: 25,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   }, //login button colour #7a7d68 #b8beb2
//   buttonText: {
//     color: "#ffff",
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

export default class Signup extends Component {
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
        } else {
          throw "Something went wrong";
        }
      })
      .then((response) => {
        console.log(response);
        this.setState({ error: "User added successfully" });
        this.setState({ submitted: false });
        this.props.navigation.navigate("Login");
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        await AsyncStorage.setItem(
          "@whatsThat_session_token",
          responseJson.token
        );
        this.props.navigation.navigate("Login"); //Navigate to login page after user registers their account
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error });
        this.setState({ submitted: false });
      });
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Signup</Text>
          {/* <Text style>Email:</Text> */}
          <StatusBar style="auto" />
          <View style={styles.appView}>
            <View style={styles.firstNameStyle}>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter your First Name"
                placeholderTextColor="#7a7d68"
                onChangeText={(firstName) => this.setState({ firstName })}
                defaultValue={this.state.firstName}
              />

              <>
                {this.state.submitted && !this.state.firstName && (
                  <Text style={styles.errorMsg}>*First Name is required</Text>
                )}
              </>
            </View>
          </View>

          <View style={styles.appView}>
            <View style={styles.lastNameStyle}>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter your Last Name"
                placeholderTextColor="#7a7d68"
                onChangeText={(lastName) => this.setState({ lastName })}
                defaultValue={this.state.lastName}
              />

              <>
                {this.state.submitted && !this.state.lastName && (
                  <Text style={styles.errorMsg}>*Last Name is required</Text>
                )}
              </>
            </View>
          </View>

          <View style={styles.appView}>
            <View style={styles.email}>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter your Email"
                placeholderTextColor="#7a7d68"
                onChangeText={(email) => this.setState({ email })}
                defaultValue={this.state.email}
              />

              <>
                {this.state.submitted && !this.state.email && (
                  <Text style={styles.errorMsg}>*Email is required</Text>
                )}
              </>
            </View>
          </View>

          <View style={styles.appView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter your Password"
              placeholderTextColor="#7a7d68"
              onChangeText={(password) => this.setState({ password })}
              defaultValue={this.state.password}
              secureTextEntry={true}
            />

            <>
              {this.state.submitted && !this.state.password && (
                <Text style={styles.errorMsg}>*Password is required</Text>
              )}
            </>
          </View>

          <View style={styles.appView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#7a7d68"
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
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={this.signupSubmit.bind(this)}>
              <View>
                <Text style={styles.buttonText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>

          <>
            {this.state.error && (
              <Text style={styles.errorMsg}>{this.state.error}</Text>
            )}
          </>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d416f",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 30,
    // paddingVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  appView: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    width: "100%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10,
  },
  TextInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#FFFFFF",
    width: "100%",
  },
  createAccountButton: {
    height: 30,
    marginBottom: 30,
    textDecorationLine: "underline",
    color: "#FFFFFF",
  },
  button: {
    width: "100%",
    backgroundColor: "#FF6F00",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
