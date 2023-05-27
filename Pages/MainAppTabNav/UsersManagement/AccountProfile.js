// //AccountProfile
// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { ScrollView } from "react-native-web";

// export default class AccountProfile extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       photo: null,
//       profile: {},
//       loading: true,
//     };
//   }

//   //Check Login Successful
//   componentDidMount() {
//     this.unsubscribe = this.props.navigation.addListener("focus", () => {
//       this.checkLoggedIn();
//       this.getProfilePic();
//       this.getData();
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   checkLoggedIn = async () => {
//     const value = await AsyncStorage.getItem("@whatsThat_session_token");
//     if (value == null) {
//       // if (value != null) {
//       this.props.navigation.navigate("Login");
//     }
//   };

//   // Get / Display Profile Picture
//   getProfilePic = async () => {
//     const user_id = await AsyncStorage.getItem("whatsThat_user_id");
//     const token = await AsyncStorage.getItem("@whatsThat_session_token");

//     if (user_id && token) {
//       return fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/photo`,
//         {
//           method: "GET",
//           headers: {
//             "X-Authorization": token,
//             "Content-Type": "DisplayImage",
//           },
//         }
//       )
//         .then((res) => {
//           return res.blob();
//         })
//         .then((responseBlob) => {
//           console.log("working");
//           let data = URL.createObjectURL(responseBlob);
//           this.setState({
//             photo: data,
//             loading: false,
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       console.log("User ID or session token is missing");
//     }
//   };

//   // Get User Information
//   async getData() {
//     const user_id = await AsyncStorage.getItem("whatsThat_user_id");
//     const token = await AsyncStorage.getItem("@whatsThat_session_token");

//     if (user_id && token) {
//       return fetch("http://localhost:3333/api/1.0.0/user/" + user_id, {
//         headers: {
//           "X-Authorization": token,
//         },
//       })
//         .then((response) => {
//           if (response.status === 200) {
//             return response.json();
//           } else {
//             throw "Something happened";
//           }
//         })
//         .then((rJson) => {
//           this.setState({
//             profile: rJson,
//             loading: false,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       console.log("User ID or session token is missing");
//     }
//   }

//   //Logout
//   async logoutSubmit() {
//     console.log("Logout");

//     return fetch("http://localhost:3333/api/1.0.0/logout", {
//       method: "POST",
//       headers: {
//         "X-Authorization": await AsyncStorage.getItem(
//           "@whatsThat_session_token"
//         ),
//       },
//     })
//       .then(async (response) => {
//         console.log(response.status);
//         if (response.status === 200) {
//           await AsyncStorage.removeItem("@whatsThat_session_token");
//           await AsyncStorage.removeItem("whatsThat_user_id");
//           this.props.navigation.navigate("Login"); //send back to login screen
//         } else if (response.status === 401) {
//           console.log("Unauthorised");
//           await AsyncStorage.removeItem("@whatsThat_session_token");
//           await AsyncStorage.removeItem("whatsThat_user_id");
//           this.props.navigation.navigate("Login"); //send back to login screen
//         } else if (response.status === 500) {
//           console.log("Server Code");
//           await AsyncStorage.removeItem("@whatsThat_session_token");
//           await AsyncStorage.removeItem("whatsThat_user_id");
//           this.props.navigation.navigate("Login"); //send back to login screen
//         } else {
//           throw "Server Error";
//         }
//       })
//       .catch((error) => {
//         //  this.setState({"error": error})
//         //  this.setState({"submitted": false});
//         console.log(error);
//       });
//   }

//   render() {
//     const navigation = this.props.navigation;

//     if (this.state.loading) {
//       return <Text>Loading...</Text>;
//     } else {
//       return (
//         <ScrollView>
//           <View style={styles.container}>
//             <Image
//               source={{
//                 uri: this.state.photo,
//               }}
//               style={{
//                 width: 200,
//                 height: 200,
//                 borderWidth: 2,
//               }}
//             />

//             <View style={styles.button}>
//               <TouchableOpacity
//                 onPress={() =>
//                   this.props.navigation.navigate("EditProfilePic", {
//                     data: this.state.profile,
//                   })
//                 }
//               >
//                 <View>
//                   <Text style={styles.buttonText}>Edit Profile Photo</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>
//                 Name: {this.state.profile.first_name}{" "}
//                 {this.state.profile.last_name}
//               </Text>
//               <Text style={styles.label}>
//                 Email: {this.state.profile.email}{" "}
//               </Text>

//               <View style={styles.button}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     this.props.navigation.navigate("EditUserProfile", {
//                       data: this.state.profile,
//                     })
//                   }
//                 >
//                   <View>
//                     <Text style={styles.buttonText}>Edit Profile</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.button}>
//                 <TouchableOpacity onPress={this.logoutSubmit.bind(this)}>
//                   <View>
//                     <Text style={styles.buttonText}>LOGOUT</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       );
//     }
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#ffff",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     paddingVertical: 50,
//   },
//   profileImage: {
//     width: 200,
//     height: 200,
//     borderWidth: 2,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 10,
//     color: "#212121",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   button: {
//     width: "80%",
//     backgroundColor: "#7a7d68",
//     borderRadius: 25,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 40,
//   },
//   buttonText: {
//     color: "#ffff",
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 20,
//   },
//   formContainer: {
//     padding: 20,
//     backgroundColor: "#ffff"
//     },
// });




















//my edit of sr 
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AccountProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      profile: {},
      loading: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.checkLoggedIn();
      this.getProfilePic();
      this.getData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem("@whatsThat_session_token");
    if (value === null) {
      this.props.navigation.navigate("Login");
    }
  };

  getProfilePic = async () => {
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");
    const token = await AsyncStorage.getItem("@whatsThat_session_token");

    if (user_id && token) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/user/${user_id}/photo`,
          {
            method: "GET",
            headers: {
              "X-Authorization": token,
              "Content-Type": "DisplayImage",
            },
          }
        );

        if (response.ok) {
          const responseBlob = await response.blob();
          const data = URL.createObjectURL(responseBlob);
          this.setState({
            photo: data,
            loading: false,
          });
        } else {
          throw new Error("Failed to fetch profile picture");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User ID or session token is missing");
    }
  };

  getData = async () => {
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");
    const token = await AsyncStorage.getItem("@whatsThat_session_token");

    if (user_id && token) {
      try {
        const response = await fetch(
          `http://localhost:3333/api/1.0.0/user/${user_id}`,
          {
            headers: {
              "X-Authorization": token,
            },
          }
        );

        if (response.status === 200) {
          const profileData = await response.json();
          this.setState({
            profile: profileData,
            loading: false,
          });
        } else {
          throw new Error("Failed to fetch user information");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User ID or session token is missing");
    }
  };

  logoutSubmit = async () => {
    console.log("Logout");

    try {
      const response = await fetch("http://localhost:3333/api/1.0.0/logout", {
        method: "POST",
        headers: {
          "X-Authorization": await AsyncStorage.getItem(
            "@whatsThat_session_token"
          ),
        },
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem("@whatsThat_session_token");
        await AsyncStorage.removeItem("whatsThat_user_id");
        this.props.navigation.navigate("Login");
      } else if (response.status === 401) {
        console.log("Unauthorised");
        await AsyncStorage.removeItem("@whatsThat_session_token");
        await AsyncStorage.removeItem("whatsThat_user_id");
        this.props.navigation.navigate("Login");
      } else if (response.status === 500) {
        console.log("Server Error");
        await AsyncStorage.removeItem("@whatsThat_session_token");
        await AsyncStorage.removeItem("whatsThat_user_id");
        this.props.navigation.navigate("Login");
      } else {
        throw new Error("Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const navigation = this.props.navigation;

    if (this.state.loading) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={{
                uri: this.state.photo,
              }}
              style={styles.profileImage}
            />

            <View style={styles.button}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditProfilePic", {
                    data: this.state.profile,
                  })
                }
              >
                <Text style={styles.buttonText}>Edit Profile Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Name: {this.state.profile.first_name}{" "}
                {this.state.profile.last_name}
              </Text>
              <Text style={styles.label}>
                Email: {this.state.profile.email}{" "}
              </Text>

              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditUserProfile", {
                      data: this.state.profile,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.button}>
                <TouchableOpacity onPress={this.logoutSubmit}>
                  <Text style={styles.buttonText}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderStyle: "solid"
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    color: "#212121",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    width: "80%",
    backgroundColor: "#7a7d68",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});
