// //ViewList 
// import React, { Component } from 'react';
// import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons} from '@expo/vector-icons';

// export default class ViewList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       chats: [],
//     };
//   }

//   componentDidMount(){
//     this.unsubscribe = this.props.navigation.addListener('focus', () => {
//       this.loadContacts();  
//     }); 
//   }

//   loadContacts = async () => {
//     const token = await AsyncStorage.getItem('app_session_token');
//     fetch('http://localhost:3333/api/1.0.0/chat', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Authorization': token,
//       },
//     })
//       .then((response) => response.json())
//       .then((rJson) => {
//         console.log(rJson);
//         this.setState({ chats: rJson });
//       })
//       .catch((error) => {
//         console.log(error);
       
//       });
//   };
  
//   displayList = ({ item }) => {
//     const timestamp = new Date(item.last_message.timestamp).toLocaleString();
//     return (
//     <TouchableOpacity
//       style={styles.listItem}
//       onPress={() => this.props.navigation.navigate('UpdateChat', { chat_id: item.chat_id })}> 
      
//       <TouchableOpacity
//             style={styles.contactStatus}>
//             <Ionicons name="mail-open" size={60} color="black" />
//           </TouchableOpacity>
//       <View style={styles.contactInfoContainer}>

//       <Text style={styles.listItemTitle}>{item.name}</Text>
//         <Text style={styles.contactName}>Creator: {item.creator.first_name} {item.creator.last_name}</Text>
//         <Text style={styles.contactEmail}>{item.last_message.message} : {timestamp}</Text>
//         <TouchableOpacity
//             style={styles.contactStatus}>
//             <Ionicons name="ellipse" size={24} color="green" />
//           </TouchableOpacity>
//           <Text style={styles.contactStatus}>active</Text>
    
//           <TouchableOpacity onPress={() => this.props.navigation.navigate('AddUserChat', { chat_id: item.chat_id })}
//             style={styles.contactStatus}>
//             <Ionicons name="person-add" size={24} color="green" />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.contactStatus}>
//             <Ionicons name="person-remove" size={24} color="red" />
//           </TouchableOpacity>
   
//       </View>
//     </TouchableOpacity>
// );
// };
  
//   render() {

//     return (
//       <View style={styles.container}>
//          <View style={styles.header}>
//         <Text style={styles.title}>Click Chat To Change</Text>
//         </View>

//         <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.goBack()}>
//                 <Ionicons name="chevron-back" size={24} color="white"/>
//                 </TouchableOpacity>

//         <FlatList
//           style={styles.listContainer}
//           data={this.state.chats}
//           renderItem={this.displayList}
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
//   listContainer: {
//     padding: 20,
//   },
//  container: {
//     flex: 1,
//     backgroundColor: '#F6F1F1',
//   },
//   avatarContainer: {
    
//     height: 60,
//     borderRadius: 30,
//     overflow: 'hidden',
//     marginRight: 10,
//   },
//   statusIndicator: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 15,
//     height: 15,
//     borderRadius: 7.5,
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderColor: 'white',
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
//     fontStyle:'italic'
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
//   },
//   addButton: {
//     backgroundColor: '#AFD3E2',
//     margin:5,
//     borderRadius: 15,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     alignItems: 'center',
//     justifyContent: 'space-around'
//   },
//   listContainer: {
//     padding: 20,
//   },
//   listItem: {
//     backgroundColor: '#19A7CE',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderRadius: 5,
//     padding: 10,
//   },
//   iconContainer: {
//     marginRight: 10,
//   },
//   contactInfoContainer: {
//     flex: 1,
//   },
//   listItemTitle: {
//     fontSize: 20,
//     color: '#000000',
//     marginBottom: 5,
//   },
//   listItemText: {
//     fontSize: 16,
//     color: '#4A641E',
//   },
  
// });

//ViewList 
import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons} from '@expo/vector-icons';

export default class ViewList extends Component {
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
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ chats: responseJson });
      })
      .catch((error) => {
        console.log(error);
       
      });
  };
  
  displayList = ({ item }) => {
    const timestamp = new Date(item.last_message.timestamp).toLocaleString();
    return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => this.props.navigation.navigate('UpdateChat', { chat_id: item.chat_id })}> 
      
      <TouchableOpacity
            style={styles.contactStatus}>
            <Ionicons name="mail-open" size={60} color="black" />
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
    
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddUserChat', { chat_id: item.chat_id })}
            style={styles.contactStatus}>
            <Ionicons name="person-add" size={24} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactStatus}>
            <Ionicons name="person-remove" size={24} color="red" />
          </TouchableOpacity>
   
      </View>
    </TouchableOpacity>
);
};
  
  render() {

    return (
      <View style={styles.container}>
         <View style={styles.header}>
        <Text style={styles.title}>Click Chat To Change</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="white"/>
                </TouchableOpacity>

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
  listContainer: {
    padding: 20,
  },
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
    fontStyle:'italic'
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
    backgroundColor: '#19A7CE',
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
