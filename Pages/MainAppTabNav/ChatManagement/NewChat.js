// // // //NewChat
// // // import React, { Component } from 'react';
// // // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // export default class NewChat extends Component {
// // //     constructor(props){
// // //         super(props);

// // //         this.state = {
// // //             name:"",
// // //             error: "", 
// // //             submitted: false
// // //         }

// // //         this._onPressButton = this._onPressButton.bind(this)
// // //     }

// // //     _onPressButton = async() => {
// // //         this.setState({ submitted: true });
// // //         this.setState({ error: "" });

// // //         if (!this.state.name) {
// // //             this.setState({ error: "*Must enter a chat name & ID " });
// // //             return;
// // //         }

// // //         console.log("Chat Name: " + this.state.name + " . Created! ");

// // //         try {
// // //             const token = await AsyncStorage.getItem('@whatsThat_session_token');

// // //             const headers = {
// // //                 'Content-Type': 'application/json',
// // //                 'X-Authorization': token,
// // //             };

// // //             const response = await fetch('http://localhost:3333/api/1.0.0/chat', {
// // //                 method: 'POST',
// // //                 headers,
// // //                 body: JSON.stringify({
// // //                     "name": this.state.name,
// // //                 }),
// // //             });

// // //             const responseJson = await response.json();

// // //             console.log("Chat Created: ", responseJson.token);
// // //             this.props.navigation.navigate("ViewChats");
// // //         } catch (error) {
// // //             console.log(error);
        
// // //         }
// // //     }

// // //     render(){
// // //         return (
// // //             <View style={styles.container}>
// // //                <Text style={styles.title}>Create Chats</Text>
// // //                 <View style={styles.formContainer}>
                
            
// // //                     <View style={styles.email}>
// // //                        <Text style={styles.formLabel}>chat name:</Text>
// // //                         <TextInput
// // //                             style={{height: 40, borderWidth: 1, paddingVertical: 10}}
// // //                             placeholder=" Enter chat name"
// // //                             onChangeText={name => this.setState({name})}
// // //                             defaultValue={this.state.name}
// // //                         />

// // //                         <>
// // //                             {this.state.submitted && !this.state.name &&
// // //                                 <Text style={styles.error}>*Chat name is required</Text>
// // //                             }
// // //                         </>
// // //                     </View>
            
// // //                     <View style={styles.loginbtn}>
// // //                         <TouchableOpacity onPress={() => this._onPressButton()}>
// // //                             <View style={styles.button}>
// // //                                 <Text style={styles.buttonText}>Create Chat</Text>
                                
// // //                             </View>
// // //                         </TouchableOpacity>
// // //                     </View>

// // //                     <>
// // //                         {this.state.error &&
// // //                             <Text style={styles.error}>{this.state.error}</Text>
// // //                         }
// // //                     </>
            
// // //                 </View>
// // //             </View>
// // //         )
// // //     }

// // // }

// // // const styles = StyleSheet.create({
// // //     container: {
// // //       flex: 1,
// // //     backgroundColor: '#F6F1F1',
// // //     },
// // //      formContainer: {
// // //     padding: 20,
// // //     },

// // //   title: {
// // //     color:'#AFD3E2',
// // //     backgroundColor:'#146C94',
// // //     padding:10,
// // //     fontSize:25
// // //     },
// // //    formLabel: {
// // //     fontSize:15,
// // //     color:'#146C94'
// // //   },
// // //     email:{
// // //      paddingVertical: 10
// // //     },

// // //     password:{
// // //      paddingVertical: 10
// // //     },
// // //     button: {
// // //    backgroundColor: '#146C94',
// // //     paddingHorizontal: 10,
// // //     paddingVertical: 10,
// // //     borderRadius: 5,
// // //     alignItems: 'center',

// // //     },
// // //     buttonText: {
// // //     fontSize:15,
// // //     fontWeight:'bold',
// // //     color:'#000000'
// // //     },
// // //     error: {
// // //         color: "red",
// // //     }
// // //   });
















// // import React, { Component } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // export default class NewChat extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       name: "",
// //       error: "",
// //       submitted: false
// //     };
// //   }

// //   _onPressButton = async () => {
// //     this.setState({ submitted: true });
// //     this.setState({ error: "" });

// //     if (!this.state.name) {
// //       this.setState({ error: "*Must enter a chat name" });
// //       return;
// //     }

// //     try {
// //       const token = await AsyncStorage.getItem('@whatsThat_session_token');

// //       const headers = {
// //         'Content-Type': 'application/json',
// //         'X-Authorization': token,
// //       };

// //       const response = await fetch("http://localhost:3333/api/1.0.0/chat", {
// //         method: 'POST',
// //         headers,
// //         body: JSON.stringify({
// //           name: this.state.name,
// //         }),
// //       });

// //       if (response.ok) {
// //         const responseJson = await response.json();
// //         console.log("Chat Created: ", responseJson.token);
// //         this.props.navigation.navigate("ViewChats");
// //       } else {
// //         throw new Error('Failed to create chat');
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       Alert.alert('Error', 'Failed to create chat');
// //     }
// //   }

// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         <Text style={styles.title}>Create Chats</Text>
// //         <View style={styles.formContainer}>
// //           <View style={styles.email}>
// //             <Text style={styles.formLabel}>Chat name:</Text>
// //             <TextInput
// //               style={{ height: 40, borderWidth: 1, paddingVertical: 10 }}
// //               placeholder="Enter chat name"
// //               onChangeText={name => this.setState({ name })}
// //               defaultValue={this.state.name}
// //             />
// //             {this.state.submitted && !this.state.name && (
// //               <Text style={styles.error}>*Chat name is required</Text>
// //             )}
// //           </View>

// //           <View style={styles.loginbtn}>
// //             <TouchableOpacity onPress={() => this._onPressButton()}>
// //               <View style={styles.button}>
// //                 <Text style={styles.buttonText}>Create Chat</Text>
// //               </View>
// //             </TouchableOpacity>
// //           </View>

// //           {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
// //         </View>
// //       </View>
// //     );
// //   }
// // }



// // const styles = StyleSheet.create({
// //     container: {
// //       flex: 1,
// //     backgroundColor: '#F6F1F1',
// //     },
// //      formContainer: {
// //     padding: 20,
// //     },

// //   title: {
// //     color:'#AFD3E2',
// //     backgroundColor:'#146C94',
// //     padding:10,
// //     fontSize:25
// //     },
// //    formLabel: {
// //     fontSize:15,
// //     color:'#146C94'
// //   },
// //     email:{
// //      paddingVertical: 10
// //     },

// //     password:{
// //      paddingVertical: 10
// //     },
// //     button: {
// //    backgroundColor: '#146C94',
// //     paddingHorizontal: 10,
// //     paddingVertical: 10,
// //     borderRadius: 5,
// //     alignItems: 'center',

// //     },
// //     buttonText: {
// //     fontSize:15,
// //     fontWeight:'bold',
// //     color:'#000000'
// //     },
// //     error: {
// //         color: "red",
// //     }
// //   });







// // // Import necessary modules and components
// // import React, { Component } from 'react';
// // import { View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // export default class NewChat extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       chatName: '',
// //       chatCreated: null,
// //     };
// //   }

// //   createChat = async () => {
// //     const token = await AsyncStorage.getItem('@whatsThat_session_token');
// //     fetch('http://localhost:3333/api/1.0.0/chat', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'X-Authorization': token,
// //       },
// //       body: JSON.stringify({
// //         name: this.state.chatName,
// //       }),
// //     })
// //       .then((response) => {
// //         if (response.status === 201) {
// //           return response.json();
// //         } else {
// //           throw new Error('Failed to create chat');
// //         }
// //       })
// //       .then((responseJson) => {
// //         console.log(responseJson);
// //         this.setState({ chatName: '', chatCreated: responseJson }); // Update the state with the chat information
// //         this.props.navigation.navigate('ChatApp'); // Navigate to the ChatApp screen or any other desired screen
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         Alert.alert('Error', 'Failed to create chat');
// //       });
// //   };

// //   render() {
// //     return (
// //       <KeyboardAvoidingView style={styles.container} behavior="padding">
// //         <View style={styles.header}>
// //           <Text style={styles.title}>Create New Chat</Text>
// //         </View>

// //         <TextInput
// //           style={styles.input}
// //           placeholder="Enter chat name"
// //           value={this.state.chatName}
// //           onChangeText={(text) => this.setState({ chatName: text })}
// //         />

// //         <Button title="Create Chat" onPress={this.createChat} />

// //         <Text>{`Chat Created: ${this.state.chatCreated?.name}`}</Text>
// //       </KeyboardAvoidingView>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F6F1F1',
// //   },
// //   header: {
// //     backgroundColor: '#146C94',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //   },
// //   title: {
// //     color: '#AFD3E2',
// //     fontSize: 25,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#999',
// //     borderRadius: 5,
// //     padding: 10,
// //     marginBottom: 10,
// //   },
// // });


















//  //NewChat
// import React, { Component } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default class NewChat extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             name:"",
//             error: "", 
//             submitted: false
//         }

//         this._onPressButton = this._onPressButton.bind(this)
//     }

//     _onPressButton = async() => {
//         this.setState({ submitted: true });
//         this.setState({ error: "" });

//         if (!this.state.name) {
//             this.setState({ error: "*Must enter a chat name & ID " });
//             return;
//         }

//         console.log("Chat Name: " + this.state.name + " . Created! ");

//         try {
//             const token = await AsyncStorage.getItem('app_session_token');

//             const headers = {
//                 'Content-Type': 'application/json',
//                 'X-Authorization': token,
//             };

//             const response = await fetch('http://localhost:3333/api/1.0.0/chat', {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     "name": this.state.name,
//                 }),
//             });

//             const rJson = await response.json();

//             console.log("Chat Created: ", rJson.token);
//             this.props.navigation.navigate("ViewChats");
//         } catch (error) {
//             console.log(error);
        
//         }
//     }

//     render(){
//         return (
//             <View style={styles.container}>
//                <Text style={styles.title}>Create Chats</Text>
//                 <View style={styles.formContainer}>
                
            
//                     <View style={styles.email}>
//                        <Text style={styles.formLabel}>chat name:</Text>
//                         <TextInput
//                             style={{height: 40, borderWidth: 1, paddingVertical: 10}}
//                             placeholder=" Enter chat name"
//                             onChangeText={name => this.setState({name})}
//                             defaultValue={this.state.name}
//                         />

//                         <>
//                             {this.state.submitted && !this.state.name &&
//                                 <Text style={styles.error}>*Chat name is required</Text>
//                             }
//                         </>
//                     </View>
            
//                     <View style={styles.loginbtn}>
//                         <TouchableOpacity onPress={() => this._onPressButton()}>
//                             <View style={styles.button}>
//                                 <Text style={styles.buttonText}>Create Chat</Text>
                                
//                             </View>
//                         </TouchableOpacity>
//                     </View>

//                     <>
//                         {this.state.error &&
//                             <Text style={styles.error}>{this.state.error}</Text>
//                         }
//                     </>
            
//                 </View>
//             </View>
//         )
//     }

// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//     backgroundColor: '#F6F1F1',
//     },
//      formContainer: {
//     padding: 20,
//     },

//   title: {
//     color:'#AFD3E2',
//     backgroundColor:'#146C94',
//     padding:10,
//     fontSize:25
//     },
//    formLabel: {
//     fontSize:15,
//     color:'#146C94'
//   },
//     email:{
//      paddingVertical: 10
//     },

//     password:{
//      paddingVertical: 10
//     },
//     button: {
//    backgroundColor: '#146C94',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',

//     },
//     buttonText: {
//     fontSize:15,
//     fontWeight:'bold',
//     color:'#000000'
//     },
//     error: {
//         color: "red",
//     }
//   });





//NewChat
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class NewChat extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:"",
            error: "", 
            submitted: false
        }

        this._onPressButton = this._onPressButton.bind(this)
    }

    _onPressButton = async() => {
        this.setState({ submitted: true });
        this.setState({ error: "" });

        if (!this.state.name) {
            this.setState({ error: "*Must enter a chat name & ID " });
            return;
        }

        console.log("Chat Name: " + this.state.name + " . Created! ");

        try {
            const token = await AsyncStorage.getItem('app_session_token');

            const headers = {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            };

            const response = await fetch('http://localhost:3333/api/1.0.0/chat', {
                method: 'post',
                headers,
                body: JSON.stringify({
                    "name": this.state.name,
                }),
            });

            const responseJson = await response.json();

            console.log("Chat Created: ", responseJson.token);
            this.props.navigation.navigate("ViewChats");
        } catch (error) {
            console.log(error);
        
        }
    }

    render(){
        return (
            <View style={styles.container}>
               <Text style={styles.title}>Create Chats</Text>
                <View style={styles.formContainer}>
                
            
                    <View style={styles.email}>
                       <Text style={styles.formLabel}>chat name:</Text>
                        <TextInput
                            style={{height: 40, borderWidth: 1, paddingVertical: 10}}
                            placeholder=" Enter chat name"
                            onChangeText={name => this.setState({name})}
                            defaultValue={this.state.name}
                        />

                        <>
                            {this.state.submitted && !this.state.name &&
                                <Text style={styles.error}>*Chat name is required</Text>
                            }
                        </>
                    </View>
            
                    <View style={styles.loginbtn}>
                        <TouchableOpacity onPress={() => this._onPressButton()}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Create Chat</Text>
                                
                            </View>
                        </TouchableOpacity>
                    </View>

                    <>
                        {this.state.error &&
                            <Text style={styles.error}>{this.state.error}</Text>
                        }
                    </>
            
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: '#F6F1F1',
    },
     formContainer: {
    padding: 20,
    },

  title: {
    color:'#AFD3E2',
    backgroundColor:'#146C94',
    padding:10,
    fontSize:25
    },
   formLabel: {
    fontSize:15,
    color:'#146C94'
  },
    email:{
     paddingVertical: 10
    },

    password:{
     paddingVertical: 10
    },
    button: {
   backgroundColor: '#146C94',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',

    },
    buttonText: {
    fontSize:15,
    fontWeight:'bold',
    color:'#000000'
    },
    error: {
        color: "red",
    }
  });
