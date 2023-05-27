// //SearchUsers
// import React, {Component, Fragment} from 'react';
// import {Text, View, Button, FlatList} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Picker} from '@react-native-picker/picker';

// import {ScrollView} from 'react-native-gesture-handler';

// const searchInDrop = ['contacts', 'all'];

// export default class SearchUsers extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       user_id: "",
//       searchData: [],
//       q: '',
//       search_in: 'all',
//       limit: 20,
//       offset: 0,
//     };
//   }

//   addContact = async (user_id) => {

//     const userData = JSON.parse(jsonValue);

//     return fetch("http://localhost:3333/api/1.0.0/user/" + user_id + "/contact", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Authorization': await AsyncStorage.getItem('@whatsThat_session_token'),
//       },
//     })
//         .then((response) => {
//           let text;
//           switch (response.status) {
//             case 200:
//               text = 'Friend Request Sent';
//               break;
//             case 401:
//               text = 'You are not logged in';
//               break;
//             case 403:
//               text = 'User already added as a contact';
//               break;
//             case 403:
//               text = 'Contact not found';
//               break;
//             case 500:
//               text = 'A Server Error has occurred';
//               break;
//           }
//         })
//         .catch((err) => {
//           if (err.status == 403) {
//             alert('User already added as a Contact');
//           } else {
//             console.log(err);
//           }
//         });
//   };

//   getSearchData = async () => {

//     const userData = JSON.parse(jsonValue);
//     return fetch("http://localhost:3333/api/1.0.0/" + '/search?q=' + this.state.q +'&search_in=' + this.state.search_in +'&limit=' + this.state.limit +'&offset=' + this.state.offset, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Authorization': await AsyncStorage.getItem('@whatsThat_session_token'),
//       },
//     })
//         .then((response) => {
//           let text;
//           if (response.status == 200) {
//             response.json().then((json) =>{
//               this.setState({
//                 isLoading: false,
//                 searchData: json,
//               });
//             });
//           } else {
//             switch (response.status) {
//               case 400:
//                 text = 'The text you entered was invalid - Bad request';
//                 break;
//               case 401:
//                 text = 'You are not logged in';
//                 break;
//               case 500:
//                 text = 'A Server Error has occurred';
//                 break;
//             }
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//   };

//   render() {
//     console.log('Search');
//     return (
//       <ScrollView>
//           <SpacebookInput
//             autoCorrect={false}
//             label="Search for User"
//             changeText={(q) => this.setState({'q': q})}
//             inputvalue={this.state.q}
//           />
//             <Text>Press to choose</Text>

//             <Picker
//               selectedValue={this.state.search_in}
//               onValueChange={(itemValue, itemIndex) =>
//                 this.setState({'search_in': itemValue.toLowerCase()})
//               }>
//               {selectOptions}
//             </Picker>
//           <Button
//             title="Search"
//             onPress={() => this.getSearchData()}
//           />
//           {/* <FlatList
//             data={this.state.searchData}
//             extraData={this.state}
//             await renderItem={({item}) =>
//                 <View>
//                   <Text>{item.user_givenname} {item.user_familyname}</Text>
//                 </View>
//                 <Button
//                   title="Add Contact"
//                   onPress={() => this.addContact(item.user_id)}
//                 />
//             }
//             keyExtractor={(item) => item.user_id}
//           /> */}
//       </ScrollView>

//     );
//   }
// }
