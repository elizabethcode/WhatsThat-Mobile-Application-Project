//EditProfilePic
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfilePic({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
    console.log("Camera: ", type);
  };

  const sendToServer = async (data) => {
    const user_id = await AsyncStorage.getItem("whatsThat_user_id");

    let res = await fetch(data.uri);
    let blob = await res.blob();

    return fetch(
      `http:localhost:3333/api/1.0.0/user/${user_id}/photo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
          "X-Authorization": await AsyncStorage.getItem(
            "app_session_token"
          ),
        },
        body: blob,
      }
    )
      .then((response) => {
        console.log("Picture added successfully", response);
        navigation.navigate("AccountProfile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Long URI
  //  const takePhoto = async () => {
  //   if (camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await camera.takePictureAsync(options);

  //     console.log(data.uri);

  //     sendToServer(data);
  //   }
  // };

  //Short URI  - Ashes way
  async function takePhoto() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);

      console.log(data.uri);

      sendToServer(data);
    }
  }

  const backToMyProfile = () => {
    navigation.navigate("AccountProfile");
  };

  if (!permission || !permission.granted) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={backToMyProfile}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View> */}
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    padding: 20,
    margin: 10,
    backgroundColor: "#F98125",
    borderRadius: 50,
  },
  button: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});



// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Camera, CameraType, onCameraReady, CameraPictureOptions } from "expo-camera";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function EditProfilePic({ navigation }) {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const [camera, setCamera] = useState(null);

//   useEffect(() => {
//     requestPermission();
//   }, []);

//   const toggleCameraType = () => {
//     setType((current) =>
//       current === CameraType.back ? CameraType.front : CameraType.back
//     );
//     console.log("Camera: ", type);
//   };

//   const sendToServer = async (data) => {
//     const user_id = await AsyncStorage.getItem("whatsThat_user_id");

//     let res = await fetch(data.uri);
//     let blob = await res.blob();

//     return fetch(
//       `http:localhost:3333/api/1.0.0/user/${user_id}/photo`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "image/png",
//           "X-Authorization": await AsyncStorage.getItem(
//             "app_session_token"
//           ),
//         },
//         body: blob,
//       }
//     )
//       .then((response) => {
//         console.log("Picture added successfully", response);
//         navigation.navigate("AccountProfile");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const takePhoto = async () => {
//     if (camera) {
//       const options = {
//         quality: 0.5,
//         base64: true,
//         onPictureSaved: (data) => sendToServer(data),
//       };
//       const data = await camera.takePictureAsync(options);
//     }
//   };

//   const backToMyProfile = () => {
//     navigation.navigate("AccountProfile");
//   };

//   if (!permission || !permission.granted) {
//     return <Text>No access to camera</Text>;
//   } else {
//     return (
//       <View style={styles.container}>
//         <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//               <Text style={styles.text}>Flip Camera</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={takePhoto}>
//               <Text style={styles.text}>Take Photo</Text>
//             </TouchableOpacity>
//           </View>

//           {/* <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={backToMyProfile}>
//               <Text style={styles.buttonText}>Back</Text>
//             </TouchableOpacity>
//           </View> */}
//         </Camera>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   buttonContainer: {
//     alignSelf: "flex-end",
//     padding: 20,
//     margin: 10,
//     backgroundColor: "#F98125",
//     borderRadius: 50,
//   },
//   button: {
//     width: "100%",
//     height: "100%",
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "white",
//   },
// });
