import React, { Component } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native-web';
import { Camera, CameraType }from 'expo-camera';
import { useState, useEffect} from 'react'
import { ScrollView } from 'react-native-web';
import { color } from 'react-native-reanimated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ContactScreen from './Component/ViewContacts';
// import Profile from './Component/Profile';
// import Chats from './Component/Chats';

const Tab = createBottomTabNavigator();

export default class AccountProfile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            profileInformation: [],
            photo: null,
            isLoading: true,
        }
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('whatsthat_session_token');
        if (value==null) {
            this.props.navigation.navigate('Login');
        }
    };

    
    componentDidMount() {
        this.unsubscribe = this.props.navigation.saddListener('focus', () => {
        this.getData();
        this.getProfilePicture();
    }); 
}

   componentWillUnmount(){
        this.unsubscribe();
   }

    //getting the user information       
    getData = async () => {
        return fetch("http://localhost:3333/api/1.0.0/user/"+ await AsyncStorage.getItem("whatsthat_user_id"), {
            method: "GET",
            headers: {
                'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
           },
           //POST and PATCH use body: data
        })
        .then((response) => response.json())
        .then((responseJson) => {
        console.log(responseJson)
        this.setState({
            isLoading: false,
            profileInformation: responseJson
        })
    })
    .catch((error) => {
      console.log(error)
    })
}



logoutbutton = async () => {

    return fetch("http://localhost:3333/api/1.0.0/logout", {
        method: 'POST',
        headers: {
            "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token")
        }
    })
    .then(async(response) => {
        if(response.status === 200){
            await AsyncStorage.removeItem("whatsthat_session_token")
            await AsyncStorage.removeItem("whatsthat_user_id")
            this.props.navigation.navigate("Login")//direct backt to login screen
        } else if(response.status === 401){
            comsole.log("Unauthorized")
            await AsyncStorage.removeItem("whatsthat_session_token")
            await AsyncStorage.removeItem("whatsthat_user_id")
            this.props.navigation.navigate("Login") //direct back to login screen
        } else{
            throw "Something wrent wrong"
        }
})
     .catch((error) => {
        this.setState({"error": error})
        this.setState({"submitted": false})
    })
}

//retrieving/displaying profile picture
getProfilePicture = async() =>{
    const user_id = await AsyncStorage.getItem('whatsThat_user_id');
    return fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
        method: 'GET',
        headers: {
            // "X-Authorization": '1fb07c6220fe81dc16b49df252faa1ac'
            "X-Authorization": await
            AsyncStorage.getItem('@whatsThat_session_token'), 
             "Content-Type": "DisplayImage"


        }
    })
    .then((response) => {
        if(response.status === 200){
        return response.blob()
    }else {
         throw 'Something happened'
      }
    })
    .then((res) => {
         return res.blob();
    })
    .then((resBlob) => {
        console.log("working");
        let data = URL.createObjectURL(resBlob);

        this.setState({
            photo: data,
            isLoading: false,
        })
    })
    .catch((err) => {
        console.log(error);
    })
}


render(){
     if(this.state.isLoading){
      return (<Text>Loading...</Text>)
     } else {
    return(
        <View style={styles.container}>






            {/* <Text>Profile</Text> */}
            <Image
              source={{
                uri: this.state.photo
              }}
              style={{
                width: 100,
                height: 100
              }}
            />
            <Text style={styles.buttonText}>{this.state.profileInformation.first_name},{this.state.profileInformation.last_name}</Text>
            <View style={styles.signupbtn}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateProfile')}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>Add a user profile picture</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.logoutbutton()}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                        </View>
                </TouchableOpacity>
                <Text style={styles.error}>{this.state.error}</Text>
            </View>
        </View>
    );
   }
}
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "#193A6F",
    },

    first_name_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
        color:"white",
    },
    last_name_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
        color:"white",
    },

    email_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },
    password_input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
    },
    formContainer: {

    },
    email: {
        marginBottom: 5
    },
    password: {
        marginBottom: 10
    },
    signupbtn: {

    },
    signup: {
        justifyContent: "center",
        textDecorationLine: "underline"
    },
    button: {
        backgroundColor: '#F98125',
        borderRadius: 60,
        width: "30%",
        marginLeft: "35%",
        marginTop: 20,
        padding: 5,
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        color: 'white'
    },
    header: {
        fontSize: 30,
        fontWeight: '900'
    }
});
























// import React, { Component } from 'react';
// import {StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Pressable, FlatList} from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { ScrollView } from 'react-native-web';

//  export default class Profile extends Components {

//     constructor(props){
//         super(props);

//         this.state = {
//             photo: null, 
//             profile: {},
//             loading: true
//         }
//     }

//     //Check 
//     componentDidMount(){
//         this.unsubscribe = this.props.navigation.addListener('focus', () => {
//           this.getProfilePic();
//           this.getData(); 
//         }); 
//       }
    
//       componentWillUnmount(){
//         this.unsubscribe();
//       }


//       //Get / Display Profile Picture 
//       getProfilePic = async () =>{
//       // const auth = await AsyncStorage.getItem('@whatsThat_session_token');
//          const user_id = await AsyncStorage.getItem('whatsThat_user_id');
//          // return fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/photo`, {
//          return fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/photo", {
//            method: 'GET',
//            headers: {
//              "X-Authorization":  await AsyncStorage.getItem('@whatsThat_session_token'), 
//              "Content-Type": "DisplayImage"
//            }
//          })
//          .then((res) => {
//            return res.blob()
//          })
//          .then((responseBlob) => {
//            console.log("working");
//            let data = URL.createObjectURL(responseBlob);
//            this.setState({
//            photo: data,
//              isLoading: false
//            });
//          })
//          .catch( (error) => {
//            console.log(error);
//          })
  
//        }
      


//       //Get User Information
//     async getData(){
//         return fetch("http://localhost:3333/api/1.0.0/user/" + await AsyncStorage.getItem("whatsThat_user_id") , { 
//             headers: {
//                 "X-Authorization": await AsyncStorage.getItem("@whatsThat_session_token") //
//             }
//         })
//         .then((response) => {
//            // console.log(response); //logging response testing server
//             if(response.status === 200){
//                 return response.json()
//             }else{
//                 throw "Something happened"
//             }
//         })
//         .then((rJson) => {
//             this.setState({
//                 profile: rJson, 
//                 loading: false
//             })
//         })
//         .catch((err) => {
//             console.log(err)
//            // console.log(response.headers.get('content-type')); //
//         })
//     }


//     //Logout 
//     async logoutSubmit (){

//       console.log("Logout")
  
//       return fetch("http://localhost:3333/api/1.0.0/logout", {
//           method: 'POST',
//           headers: {
//               "X-Authorization": await AsyncStorage.getItem("@whatsThat_session_token") 
  
//           }
//       })
//       .then(async (response) => {
//           console.log(response.status);
//           if(response.status === 200){
//               await AsyncStorage.removeItem("@whatsThat_session_token")
//               await AsyncStorage.removeItem("whatsThat_user_id")
//              // this.props.navigation.navigate("Login") //send back to login screen 
//           }else if(response.status === 401){
//               console.log("Unauthorised")
//               await AsyncStorage.removeItem("@whatsThat_session_token")
//               await AsyncStorage.removeItem("whatsThat_user_id")
//               this.props.navigation.navigate("Login") //send back to login screen 
//           } else if(response.status === 500){
//               console.log("Server Code")
//               await AsyncStorage.removeItem("@whatsThat_session_token")
//               await AsyncStorage.removeItem("whatsThat_user_id")
//               this.props.navigation.navigate("Login") //send back to login screen 
//           }else{ 
//               throw "Server Error"
//           }
//       })
//       .catch((error) => {
//            //this.setState({"error": error})
//            //this.setState({"submitted": false});
//            console.log(error);
//       })

//   }

   
//      render(){

//          const navigation = this.props.navigation; 

//          if(this.state.loading){
//             return (<Text>Loading...</Text>)
//           }else{
          
//         return(
//           <ScrollView>
//             <View style={styles.container}>
//             <Image
//                 source={{
//                   uri: this.state.photo,
//                 }}
//                 style={{
//                   width: 200,
//                   height: 200,
//                   borderWidth: 2,
//                 }}
//               />

//                 <View style={styles.button}>
//                         <TouchableOpacity onPress={() => this.props.navigation.navigate("EditProfilePic", {data: this.state.profile})}>
//                             <View>
//                             <Text style={styles.buttonText}>Edit Profile Photo</Text> 
//                             </View>
//                         </TouchableOpacity> 
//                  </View>


//                 <View style={styles.inputContainer}> 
//                  {/* <Text style={styles.label}>Profile</Text> */}
//                  <Text style={styles.label}>Name: {this.state.profile.first_name} {this.state.profile.last_name}</Text>
//                  <Text style={styles.label}>Email: {this.state.profile.email} </Text>
                

//                  {/* <Button
//                      title="Update"
//                      onPress={() => this.props.navigation.navigate("UpdateUser", {data: this.state.profile})}
//                      /> */}
//                      {/* <Button
//                      title="Update"
//                      onPress={() => this.props.navigation.navigate("update", {data: this.state.profile})}
//                      /> */}
                

//                       <View style={styles.button}>
//                         {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("UpdateUser", {data: this.state.profile})}> */}
//                         <TouchableOpacity onPress={() => this.props.navigation.navigate("EditUserProfile", {data: this.state.profile})}>
//                             <View>
//                             <Text style={styles.buttonText}>Edit Profile</Text> 
//                             </View>
//                         </TouchableOpacity> 
//                  </View>

//                  <View style={styles.button}>
//             <TouchableOpacity onPress={this.logoutSubmit}>
//                 <View>
//                 <Text style={styles.buttonText}>LOGOUT</Text> 
//                 </View>
//             </TouchableOpacity>
//         </View>
//                     </View>
//                  </View>
// </ScrollView> 
                 
//         )
//     }
//   }
// }

//   const style = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#ffff",
//       alignItems: "center",
//       justifyContent: "center",
//       paddingHorizontal: 30,
//       paddingVertical: 50,
//     },
//     inputContainer: {
//       marginBottom: 20,
//     },
//     label: {
//       marginBottom: 10,
//       color: "#212121",
//       fontSize: 16,
//       fontWeight: "bold",
//     },
//     errorText: {
//       color: "red",
//       marginBottom: 10,
//     },
//     button: {
//       width: "80%",
//       backgroundColor: "#7a7d68",
//       borderRadius: 25,
//       height: 50,
//       justifyContent: "center",
//       alignItems: "center",
//       marginTop: 40,
//     },
//     buttonText: {
//       color: "#ffff",
//       fontSize: 18,
//       fontWeight: "bold",
//       textAlign: 'center',
//       padding: 20,
//     },
//     imageInfo: {
//       width: 200, 
//       height: 200, 
//       marginBottom: 20, 
//       //marginTop: -50, 
//     },
//     appView: {
//       backgroundColor: "#f4f4f4", //slight white //Text Input colour #d6d9d0
//       borderRadius: 30,
//       width: "70%",
//       height: 45,
//       marginBottom: 20,
//       alignItems: "center",
//     },
//     TextInput: {
//       height: 50,
//       flex: 1,
//       padding: 10,
//       marginLeft: 20,
//     },
//     logoutButton: {
//         width: "80%",
//         borderRadius: 25,
//         height: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: 40,
//         backgroundColor: "#7a7d68",
//       }, //login button colour #7a7d68 #b8beb2
//     touchButton: {
//       width: "80%",
//       borderRadius: 25,
//       height: 50,
//       alignItems: "center",
//       justifyContent: "center",
//       marginTop: 40,
//       backgroundColor: "#7a7d68",}, //login button colour #7a7d68 #b8beb2

//       btnPostTxt:
//     {
//       color: 'white',
//       fontWeight:'bold'
//     },

//     likebtn:
//     {
//       borderRadius: 30,
//       height: 30,
//       marginTop: 10,
//       width: 100,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#87ceeb',
//     },
    

//     Posttxt:
//     {
//       fontSize: 15,
//       fontWeight: "bold",
//     },

//     postname:
//     {
//       marginLeft: 10,
//       marginTop:10,
//       fontSize: 15,
//     },

//     time:
//     {
//       marginBottom: 10,
//       marginLeft: 10,
//     },

//     Divider:
//     {
//       marginTop:10,
//     },

//     Button:
//     {
//       flex: 1,
//       borderRadius: 4,
//       marginLeft: 10,

//     },

//     btnTxt:
//     {
//       color: 'black',
//       fontWeight:'bold'
//     },

//     ProfileBtns:
//     {
//       flexDirection: 'row', 
//       marginTop: 15,
//     },

//     ProfileInfo: 
//     {
//       paddingHorizontal: 30,
//       marginBottom:25,
//     },
//   });










