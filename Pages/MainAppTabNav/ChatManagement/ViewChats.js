// // //ViewChats
// // import React, { Component } from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

// // export default class ViewChats extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       chats: [],
// //     };
// //   }

// //   componentDidMount(){
// //     this.unsubscribe = this.props.navigation.addListener('focus', () => {
// //       this.loadContacts(); 
// //     }); 
// //   }

// //   loadContacts = async () => {
// //     const token = await AsyncStorage.getItem('app_session_token');
// //     fetch('http://localhost:3333/api/1.0.0/chat', {
// //       method: 'GET',
// //       headers: {
// //         "Content-Type": 'application/json',
// //         "X-Authorization": token,
// //       },
// //     })
// //       .then((response) => response.json())
// //       .then((responseJson) => {
// //         console.log(responseJson);
// //         this.setState({ chats: rJson });
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //         this.props.navigation.navigate("SendMessage");
// //       });
// //   };


// //   displayList = ({ item }) => {
// //     const timestamp = new Date(item.last_message.timestamp).toLocaleString();
// //     return (

// //     <TouchableOpacity
// //       style={styles.listItem}
// //       onPress={() => this.props.navigation.navigate('SendMessage', { chat_id: item.chat_id })}> 
      
// //       <TouchableOpacity
// //             style={styles.contactStatus}>
// //             <Entypo name="message" size={100} color="black" />
// //           </TouchableOpacity>
// //       <View style={styles.contactInfoContainer}>

// //       <Text style={styles.listItemTitle}>{item.name}</Text>
// //         <Text style={styles.contactName}>Creator: {item.creator.first_name} {item.creator.last_name}</Text>
// //         <Text style={styles.contactEmail}>{item.last_message.message} : {timestamp}</Text>
// //         <TouchableOpacity
// //             style={styles.contactStatus}>
// //             <Ionicons name="ellipse" size={24} color="green" />
// //           </TouchableOpacity>
// //           <Text style={styles.contactStatus}>active</Text>
// //       </View>
// //     </TouchableOpacity>

// //   );
// // };
  

// //   render() {
// //     return (
// //       <View style={styles.container}>
// //           <View style={styles.header}>
// //           <Text style={styles.title}>Chats Page</Text>
// //           <View style={styles.buttonHeader}>

// //      <TouchableOpacity style={styles.addButton}onPress={() => this.props.navigation.navigate("NewChat")}>
// //      <MaterialIcons name="add-to-photos" size={24} color="black" />
      
// //      </TouchableOpacity> 
     
// //      <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate("ViewList")}>
// //        <Ionicons name="create" size={24} color="black" />
// //      </TouchableOpacity> 

// //      <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate("AddRemove")}>
// //        <Ionicons name="people" size={24}color="black" />
// //      </TouchableOpacity>
  
// //      </View>
// //      </View>

// //         <FlatList
// //           style={styles.listContainer}
// //           data={this.state.chats}
// //           renderItem={this.displayList}
// //         />
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F6F1F1',
// //   },
// //   avatarContainer: {
    
// //     height: 60,
// //     borderRadius: 30,
// //     overflow: 'hidden',
// //     marginRight: 10,
// //   },
// //   statusIndicator: {
// //     position: 'absolute',
// //     bottom: 0,
// //     right: 0,
// //     width: 15,
// //     height: 15,
// //     borderRadius: 7.5,
// //     backgroundColor: 'green',
// //     borderWidth: 2,
// //     borderColor: 'white',
// //   },
// //   contactInfoContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //   },
// //   contactName: {
// //     fontSize: 17,
// //     fontWeight: 'bold',
// //   },
// //   contactEmail: {
// //     fontSize: 16,
    
// //   },
// //   contactStatus: {
// //     fontSize: 15,
// //     color: '#777',
// //     marginRight: 10,
  
// //   },
// //   header: {
// //     backgroundColor: '#146C94',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //   },

// //   buttonHeader: {
// //     backgroundColor: '#146C94',
// //     flexDirection: 'row',
// //   },
// //   title: {
// //     color: '#AFD3E2',
// //     fontSize: 25,
// //     fontWeight: 'bold'
// //   },
// //   addButton: {
// //     backgroundColor: '#AFD3E2',
// //     margin:5,
// //     borderRadius: 15,
// //     paddingHorizontal: 10,
// //     paddingVertical: 5,
// //     alignItems: 'center',
// //     justifyContent: 'space-around'
// //   },
// //   listContainer: {
// //     padding: 20,
// //   },
// //   listItem: {
// //     backgroundColor: '#F0F0F0',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //     borderRadius: 5,
// //     padding: 10,
// //   },
// //   iconContainer: {
// //     marginRight: 10,
// //   },
// //   contactInfoContainer: {
// //     flex: 1,
// //   },
// //   listItemTitle: {
// //     fontSize: 20,
// //     color: '#000000',
// //     marginBottom: 5,
// //   },
// //   listItemText: {
// //     fontSize: 16,
// //     color: '#4A641E',
// //   },
// // });












// import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';

// export default class ViewChats extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       chats: [],
//     };
//   }

//   componentDidMount() {
//     this.unsubscribe = this.props.navigation.addListener('focus', () => {
//       this.loadContacts();
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   loadContacts = async () => {
//     try {
//       const token = await AsyncStorage.getItem('app_session_token');
//       const response = await fetch("http://localhost:3333/api/1.0.0/Chat", {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Authorization': token,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         this.setState({ chats: data });
//       } else {
//         throw new Error('Failed to fetch chats');
//       }
//     } catch (error) {
//       console.log(error);
//       this.props.navigation.navigate('SendMessage');
//     }
//   };

//   displayList = ({ item }) => {
//     const timestamp = new Date(item.last_message.timestamp).toLocaleString();

//     return (
//       <TouchableOpacity
//         style={styles.listItem}
//         onPress={() => this.props.navigation.navigate('SendMessage', { chat_id: item.chat_id })}
//       >
//         <TouchableOpacity style={styles.contactStatus}>
//           <Entypo name="message" size={100} color="black" />
//         </TouchableOpacity>
//         <View style={styles.contactInfoContainer}>
//           <Text style={styles.listItemTitle}>{item.name}</Text>
//           <Text style={styles.contactName}>
//             Creator: {item.creator.first_name} {item.creator.last_name}
//           </Text>
//           <Text style={styles.contactEmail}>
//             {item.last_message.message} : {timestamp}
//           </Text>
//           <TouchableOpacity style={styles.contactStatus}>
//             <Ionicons name="ellipse" size={24} color="green" />
//           </TouchableOpacity>
//           <Text style={styles.contactStatus}>active</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Chats Page</Text>
//           <View style={styles.buttonHeader}>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => this.props.navigation.navigate('NewChat')}
//             >
//               <MaterialIcons name="add-to-photos" size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => this.props.navigation.navigate('ViewList')}
//             >
//               <Ionicons name="create" size={24} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => this.props.navigation.navigate('AddRemove')}
//             >
//               <Ionicons name="people" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <FlatList
//           style={styles.listContainer}
//           data={this.state.chats}
//           renderItem={this.displayList}
//           keyExtractor={(item) => item.chat_id.toString()}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F1F1',
//   },
//   contactInfoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   contactName: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   contactEmail: {
//     fontSize: 16,
//   },
//   contactStatus: {
//     fontSize: 15,
//     color: '#777',
//     marginRight: 10,
//   },
//   header: {
//     backgroundColor: '#146C94',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   buttonHeader: {
//     backgroundColor: '#146C94',
//     flexDirection: 'row',
//   },
//   title: {
//     color: '#AFD3E2',
//     fontSize: 25,
//     fontWeight: 'bold',
//   },
//   addButton: {
//     backgroundColor: '#AFD3E2',
//     margin: 5,
//     borderRadius: 15,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   listContainer: {
//     padding: 20,
//   },
//   listItem: {
//     backgroundColor: '#F0F0F0',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderRadius: 5,
//     padding: 10,
//   },
//   listItemTitle: {
//     fontSize: 20,
//     color: '#000000',
//     marginBottom: 5,
//   },
// });





//ViewChats
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
// import { globalStyles } from '../../globalStyles';

export default class ViewChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
    };
  }

  componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.loadContacts(); 
    }); 
  }

  loadContacts = async () => {
    const token = await AsyncStorage.getItem('app_session_token');
    fetch('http://localhost:3333/api/1.0.0/chat', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ chats: responseJson });
      })
      .catch((error) => {
        console.log(error);
        this.props.navigation.navigate("SendMessage");
      });
  };


  displayList = ({ item }) => {
    const timestamp = new Date(item.last_message.timestamp).toLocaleString();
    return (

    <TouchableOpacity
      style={styles.listItem}
      onPress={() => this.props.navigation.navigate('SendMessage', { chat_id: item.chat_id })}> 
      
      <TouchableOpacity
            style={styles.contactStatus}>
            <Entypo name="message" size={100} color="black" />
          </TouchableOpacity>
      <View style={styles.contactInfoContainer}>

      <Text style={styles.listItemTitle}>{item.name}</Text>
        <Text style={styles.contactName}>Creator: {item.creator.first_name} {item.creator.last_name}</Text>
        <Text style={styles.contactEmail}>{item.last_message.message} : {timestamp}</Text>
        <TouchableOpacity
            style={styles.contactStatus}>
            <Ionicons name="ellipse" size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.contactStatus}>active</Text>
      </View>
    </TouchableOpacity>

  );
};
  

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.title}>Chats Page</Text>
          <View style={styles.buttonHeader}>

     <TouchableOpacity style={styles.addButton}onPress={() => this.props.navigation.navigate("NewChat")}>
     <MaterialIcons name="add-to-photos" size={24} color="black" />
      
     </TouchableOpacity> 
     
     <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate("ViewList")}>
       <Ionicons name="create" size={24} color="black" />
     </TouchableOpacity> 

     <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate("AddRemove")}>
       <Ionicons name="people" size={24}color="black" />
     </TouchableOpacity>
  
     </View>
     </View>

        <FlatList
          style={styles.listContainer}
          data={this.state.chats}
          renderItem={this.displayList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1F1',
  },
  avatarContainer: {
    
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 10,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white',
  },
  contactInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  contactEmail: {
    fontSize: 16,
    
  },
  contactStatus: {
    fontSize: 15,
    color: '#777',
    marginRight: 10,
  
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
    color: '#AFD3E2',
    fontSize: 25,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#AFD3E2',
    margin:5,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  listContainer: {
    padding: 20,
  },
  listItem: {
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  contactInfoContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 5,
  },
  listItemText: {
    fontSize: 16,
    color: '#4A641E',
  },
});

