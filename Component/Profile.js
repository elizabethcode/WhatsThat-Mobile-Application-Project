
// import React, { Component } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, Text, ScrollView } from "react-native-web";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AccountProfile from './AccountProfile';
// import UpdateProfile from './UpdateProfile';
// import CameraSendServer from './CameraSendServer';

// const ProfileStack = createNativeStackNavigator();

// export default function Profile() {

//     return (
//         // <Text>Hello</Text>
//         <ProfileStack.Navigator>
//           <ProfileStack.Screen name="AccountProfile" component={AccountProfile} options={{ headerShown: false }} />    
//           <ProfileStack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerLeft: false }} />
//           <ProfileStack.Screen name="Camera" component={CameraSendServer} />
//         </ProfileStack.Navigator> 
    


//     );
//   }





import React, { Component } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Profile extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            profileInformation: [],
            photo: "",
        }
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value==null) {
            this.props.navigation.navigate('Login');
        }
    };

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.getData();
        this.getProfilephoto()
    }); 
}

   componentWillUnmount(){
        this.unsubscribe();
   }

   async getProfilephoto() {
    const id = await AsyncStorage.getItem('whatsthat_user_id')
    const token = await AsyncStorage.getItem("whatsthat_session_token")
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
        headers: {
            "X-Authorization": token
        }
    })
    .then((response)=> {
        if(response.status === 200){
            return response.blob()
        } else {
           throw "Something happened"
        }
    })
    .then((resBlob) => {
        let data = URL.createObjectURL(resBlob);

        this.setState({
            photo: data,
            isLoading: false,
        })
    })
    .catch((error) => {
         console.log(error)
    })
}


  getData = async () => {
    return fetch("http://localhost:3333/api/1.0.0/user/"+ await AsyncStorage.getItem("whatsthat_user_id"), {
        method: "GET",
        headers: {
            'X-Authorization': await AsyncStorage.getItem("whatsthat_session_token")
       },
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
        method: "POST",
        headers: {
            "X-Authorization": await AsyncStorage.getItem("whatsthat_session_token")
        }
    })
    .then(async(response) => {
        if(response.status === 200){
            await AsyncStorage.removeItem("whatsthat_session_token")
            await AsyncStorage.removeItem("whatsthat_user_id")
            this.props.navigation.navigate("Login")
        } else if(response.status === 401){
            console.log("Unauthorized")
            await AsyncStorage.removeItem("whatsthat_session_token")
            await AsyncStorage.removeItem("whatsthat_user_id")
            this.props.navigation.navigate("Login")
        } else{
            throw "Something went wrong"
        }
})
     .catch((error) => {
        this.setState({"error": error})
        this.setState({"submitted": false})
    })
}

render(){
     if(this.state.isLoading){
      return (<Text>Loading...</Text>)
     } else {
    return(
        <View style={styles.formContainer}>
            {/* <Text>Profile</Text> */}

            <Image 
                source={{
                   uri: this.state.photo
                }}
                style={{
                    width: 150,
                    height: 150,
                    marginLeft:"44%",
                    marginTop: 40,
                    marginBottom:40,
                    justifyContent: 'center', 
                    alignItems: 'center',
                    borderRadius:6,
                }}
                />
            <Text style={styles.UpdatedName}>{this.state.profileInformation.first_name} {this.state.profileInformation.last_name}</Text>
            <View style={styles.signupbtn}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateProfile')}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.logoutbutton()}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>Logout</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Camera")}>
                        <View style={styles.button}>
                        <Text style={styles.buttonText}>Upload Photo</Text>
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
      width: "80%",
      alignItems: "stretch",
      justifyContent: "center",
      height:"100%",
    },
    first_name_input: {
      height: 35,
      borderWidth: 1,
      width: "60%",
      color: "white",
      marginLeft:200,
      padding:10,
      borderRadius:50,
      borderColor: "Black",
    },
    last_name_input: {
      height: 35,
      borderWidth: 1,
      width: "60%",
      color: "white",
      marginLeft:130,
      padding:10,
      borderRadius:50,
      borderColor: "Black",
    },

    email_input: {
      height: 35,
      borderWidth: 1,
      width: "60%",
      color: "white",
      marginLeft:130,
      padding:10,
      borderRadius:50,
      borderColor: "Black",
    },
    password_input: {
      height: 35,
      borderWidth: 1,
      width: "60%",
      color: "white",
      marginLeft:130,
      padding:10,
      borderRadius:50,
      borderColor: "Black",
    },

    UpdatedName:{
      color: "white",
      textAlign: 'center',
      fontSize:20,
      marginBottom:10,

    },


    formContainer: {
      backgroundColor: "#193A6F",
      width:"100%",
      height:"100%",
    },
    email: {
        marginBottom: 5
    },
    password: {
        marginBottom: 10
    },
    signupbtn: {
      justifyContent: "center",
      textDecorationLine: "underline"

    },
    signup: {
      justifyContent: "center",
      textDecorationLine: "underline"
    },
    button: {
      backgroundColor: '#F98125',
      borderRadius: 60,
      width: "25%",
      marginLeft: "38%",
      marginTop: 13,
      padding: 5,  
    },
    buttonText: {
      textAlign: 'center',
      padding: 8,
      color: 'white',
      fontWeight: "bold",
      fontSize: 14,
    },
    header: {
        fontSize: 30,
        fontWeight: '900'
    }
});
