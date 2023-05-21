import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlatList } from 'react-native';

export default class ViewContacts extends Component {
    constructor(props){
        super(props);

        this.state = {
            error: "", 
            contacts: "",
            submitted: false
        }
    }

    componentDidMount() {
        this.loadContacts();
    }


    loadContacts = async () => {
        const token = await AsyncStorage.getItem('whatsthat_session_token');
        fetch('http://localhost:3333/api/1.0.0/contacts', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token,
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({ contacts: responseJson });
          })
          .catch((error) => {
          });
      };

    addContact = async () => {
        this.setState({ submitted: true });
        this.setState({ error: "" });

        if (!this.state.user_id) {
            this.setState({ error: "*Must enter user id field" });
            return;
        }

        console.log("Contact: " + this.state.user_id + " Added ");

        try{
            const token = await AsyncStorage.getItem('whatsthat_session_token');

            const headers = {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            };

        const response = await fetch('http://localhost:3333/api/1.0.0/user/'+ this.state.user_id + '/contact',{
                method: 'post',
                headers,
                body: JSON.stringify({
                   user_id: this.state.user_id,
                }),
        });

        const responseJson = await response.json();

        console.log("ContactAdded: ", responseJson.token);
        this.loadContacts();
    } catch (error) {
        this.loadContacts();
    }
}

deleteContact = async (user_id) => {
    this.setState({ submitted: true });
    this.setState({ error: "" });

    try{
        const token = await AsyncStorage.getItem('whatsthat_session_token');

        const headers = {
            'Content-Type': 'application/json',
            'X-Authorization': token,
        };

        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
            method: 'delete',
            headers,
        });

        const responseJson = await response.json();

        console.log("ContactDeleted: ", responseJson.token);
        this.loadContacts();
    } catch (error) {
        this.loadContacts();
    }
}

blockContact = async (user_id) => {
  this.setState({ submitted: true });
  this.setState({ error: "" });

  try{
      const token = await AsyncStorage.getItem('whatsthat_session_token');

      const headers = {
          'Content-Type': 'application/json',
          'X-Authorization': token,
      };

      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
          method: 'delete',
          headers,
      });

      const responseJson = await response.json();

      console.log("ContactDeleted: ", responseJson.token);
      this.loadContacts();
  } catch (error) {
      this.loadContacts();
  }
}


render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.email}>
            <Text style={styles.formLabel}>user_id:</Text>
            <TextInput
              style={{ height: 40, borderWidth: 1, paddingVertical: 10 }}
              placeholder=" Enter user_id"
              onChangeText={user_id => this.setState({ user_id })}
              defaultValue={this.state.user_id}
            />
  
            <>
              {this.state.submitted && !this.state.user_id && (
                <Text style={styles.error}>*user_id is required</Text>
              )}
            </>
          </View>
  
          <View style={styles.loginbtn}>
            <TouchableOpacity onPress={() => this.addContact()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Add Contact</Text>
              </View>
            </TouchableOpacity>
          </View>
  
          <>
            {this.state.error && (
              <Text style={styles.error}>{this.state.error}</Text>
            )}
          </>
        </View>
  
        <FlatList
          style={styles.listContainer}
          data={this.state.contacts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() =>
                this.props.navigation.navigate("Single Chat", { contact: item })
              }
            >
              <View style={styles.listContainer}>
              <Text style={styles.listItemText}>{item.first_name}, {item.last_name}, {item.user_id}</Text> 
              <View style={styles.loginbtn}>
            <TouchableOpacity onPress={() => this.deleteContact(item.user_id)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Delete Contact</Text>
              </View>
            </TouchableOpacity>
              </View>

              </View>
            </TouchableOpacity>
          )}
        />
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

  title: {
    color:'#4A641E',
    backgroundColor:'#A4B389',
    padding:10,
    fontSize:25
    },
   formLabel: {
    fontSize:15,
    color:'#4A641E'
  },
    email:{
     paddingVertical: 10
    },

    password:{
     paddingVertical: 10
    },

    loginbtn:{
  
    },
    button: {
   backgroundColor: '#A4B389',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',

    },
    buttonText: {
    fontSize:15,
    fontWeight:'bold',
    color:'#4A641E'
    },
    error: {
        color: "red",
        
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
      listContainer: {
        padding: 20,
      },
    
      title: {
        color: '#4A641E',
        backgroundColor: '#A4B389',
        padding: 10,
        fontSize: 25,
      },
    
      listItem: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 5,
      },
    
      listItemText: {
        fontSize: 16,
        color: '#4A641E',
      },
      button: {
        backgroundColor: '#A4B389',
         paddingHorizontal: 10,
         paddingVertical: 10,
         borderRadius: 5,
         alignItems: 'center',
      },
    
  });




































































// import React, { Component } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FlatList } from 'react-native';

// export default class ViewContacts extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             error: "", 
//             contacts: "",
//             submitted: false
//         }
//     }

//     componentDidMount() {
//         this.loadContacts();
//     }


//     loadContacts = async () => {
//         const token = await AsyncStorage.getItem('whatsthat_session_token');
//         fetch('http://localhost:3333/api/1.0.0/contacts', {
//           method: 'get',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Authorization': token,
//           },
//         })
//           .then((response) => response.json())
//           .then((responseJson) => {
//             console.log(responseJson);
//             this.setState({ contacts: responseJson });
//           })
//           .catch((error) => {
//           });
//       };

//     addContact = async () => {
//         this.setState({ submitted: true });
//         this.setState({ error: "" });

//         if (!this.state.user_id) {
//             this.setState({ error: "*Must enter user id field" });
//             return;
//         }

//         console.log("Contact: " + this.state.user_id + " Added ");

//         try{
//             const token = await AsyncStorage.getItem('whatsthat_session_token');

//             const headers = {
//                 'Content-Type': 'application/json',
//                 'X-Authorization': token,
//             };

//         const response = await fetch('http://localhost:3333/api/1.0.0/user/'+ this.state.user_id + '/contact',{
//                 method: 'post',
//                 headers,
//                 body: JSON.stringify({
//                    user_id: this.state.user_id,
//                 }),
//         });

//         const responseJson = await response.json();

//         console.log("ContactAdded: ", responseJson.token);
//         this.loadContacts();
//     } catch (error) {
//         this.loadContacts();
//     }
// }

// deleteContact = async (user_id) => {
//     this.setState({ submitted: true });
//     this.setState({ error: "" });

//     try{
//         const token = await AsyncStorage.getItem('whatsthat_session_token');

//         const headers = {
//             'Content-Type': 'application/json',
//             'X-Authorization': token,
//         };

//         const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
//             method: 'delete',
//             headers,
//         });

//         const responseJson = await response.json();

//         console.log("ContactDeleted: ", responseJson.token);
//         this.loadContacts();
//     } catch (error) {
//         this.loadContacts();
//     }
// }

// blockContact = async (user_id) => {
//   this.setState({ submitted: true });
//   this.setState({ error: "" });

//   try{
//       const token = await AsyncStorage.getItem('whatsthat_session_token');

//       const headers = {
//           'Content-Type': 'application/json',
//           'X-Authorization': token,
//       };

//       const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/contact`, {
//           method: 'delete',
//           headers,
//       });

//       const responseJson = await response.json();

//       console.log("ContactDeleted: ", responseJson.token);
//       this.loadContacts();
//   } catch (error) {
//       this.loadContacts();
//   }
// }


// render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.formContainer}>
//           <View style={styles.email}>
//             <Text style={styles.formLabel}>user_id:</Text>
//             <TextInput
//               style={{ height: 40, borderWidth: 1, paddingVertical: 10 }}
//               placeholder=" Enter user_id"
//               onChangeText={user_id => this.setState({ user_id })}
//               defaultValue={this.state.user_id}
//             />
  
//             <>
//               {this.state.submitted && !this.state.user_id && (
//                 <Text style={styles.error}>*user_id is required</Text>
//               )}
//             </>
//           </View>
  
//           <View style={styles.loginbtn}>
//             <TouchableOpacity onPress={() => this.addContact()}>
//               <View style={styles.button}>
//                 <Text style={styles.buttonText}>Add Contact</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
  
//           <>
//             {this.state.error && (
//               <Text style={styles.error}>{this.state.error}</Text>
//             )}
//           </>
//         </View>
  
//         <FlatList
//           style={styles.listContainer}
//           data={this.state.contacts}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.listItem}
//               onPress={() =>
//                 this.props.navigation.navigate("Single Chat", { contact: item })
//               }
//             >
//               <View style={styles.listContainer}>
//               <Text style={styles.listItemText}>{item.first_name}, {item.last_name}, {item.user_id}</Text> 
//               <View style={styles.loginbtn}>
//             <TouchableOpacity onPress={() => this.deleteContact(item.user_id)}>
//               <View style={styles.button}>
//                 <Text style={styles.buttonText}>Delete Contact</Text>
//               </View>
//             </TouchableOpacity>
//               </View>

//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // backgroundColor: '#FFFFFF',
//       backgroundColor: "#193A6F",

//     },
//      formContainer: {
//     padding: 20,
//     },

//   title: {
//     color:'#4A641E',
//     backgroundColor:'#A4B389',
//     padding:10,
//     fontSize:25
//     },
//    formLabel: {
//     fontSize:15,
//     color:'#4A641E'
//   },
//     email:{
//      paddingVertical: 10
//     },

//     password:{
//      paddingVertical: 10
//     },

//     loginbtn:{
  
//     },
//     button: {
//     backgroundColor: '#A4B389',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',

//     },
//     buttonText: {
//     fontSize:15,
//     fontWeight:'bold',
//     color:'#4A641E'
//     },
//     error: {
//         color: "red",
        
//     },
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//       },
//       listContainer: {
//         padding: 20,
//       },
    
//       title: {
//         color: '#4A641E',
//         backgroundColor: '#A4B389',
//         padding: 10,
//         fontSize: 25,
//       },
    
//       listItem: {
//         backgroundColor: '#F0F0F0',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         marginBottom: 10,
//         borderRadius: 5,
//       },
    
//       listItemText: {
//         fontSize: 16,
//         color: '#4A641E',
//       },
//       button: {
//         backgroundColor: '#A4B389',
//          paddingHorizontal: 10,
//          paddingVertical: 10,
//          borderRadius: 5,
//          alignItems: 'center',
//       },
    
//   });

