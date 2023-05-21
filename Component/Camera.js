import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, CameraType, blob } from 'expo-camera';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen({ route, navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);

 
  useEffect(() => {
    async function permission(){
        requestPermission(await Camera.requestCameraPermissionsAsync())
    }
    permission()
}, [])


  async function takePhoto() {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        onPictureSaved: (data) => sendToServer(data),
      };
      const data = await camera.takePictureAsync(options);
    }
  }

  async function sendToServer(data) {
    const id = await AsyncStorage.getItem('whatsthat_user_id')
    const token = await AsyncStorage.getItem('whatsthat_session_token')
    let res = await fetch(data.uri)
    let blob = await res.blob()


    console.log(id);

    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
      method: 'POST',
      headers: {
        'X-Authorization': token,
        'Content-Type': 'image/jpeg',
      },
      body: blob,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Image updated');
          navigation.navigate('Profile');
        } else {
          throw 'Something happened';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if(!permission || !permission.granted){
    return (<Text>No access to camera</Text>)
  }else{
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
              <Text style={styles.text}>Take photo</Text>
            </TouchableOpacity>
          </View>
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
    marginLeft: "85%",
    marginRight: -500,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#F98125',
    borderRadius: 60,
    width: "25%",
    height:"100%",
    textAlign:'center',
    padding: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ddd',
  },
  camera: {
    flex: 1,
  },
});
