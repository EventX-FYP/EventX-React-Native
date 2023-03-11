import { SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { AutoFocus, Camera, CameraType, FlashMode } from 'expo-camera';
import { AppHelper, Icon, Icons } from '../../helper';

const Ratios = {
  "4:3": "4:3",
  "16:9": "16:9",
  "1:1": "1:1",
  "3:4": "3:4",
  "9:16": "9:16",
  "2.39:1": "2.39:1",
}

export const CameraComponent = () => {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    console.log("Permission to access camera is required");
    requestPermission();
    return null;
  }

  if (!permission.granted) {
    console.log("Permission to access camera is required");
    ToastAndroid.show("Permission to access camera is required", ToastAndroid.SHORT);
    return null;
  }

  const toggleCameraType = () => {
    setType(current => current === CameraType.back ? CameraType.front : CameraType.back);
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={FlashMode.auto} ratio={Ratios['16:9']} autoFocus={AutoFocus.on} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleCameraType}>
          <Icon type={Icons.Ionicons} name={"md-camera-reverse-sharp"} size={25} color={"#FFFFFF"}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon type={Icons.Ionicons} name={"md-camera-sharp"} size={50} color={"#FFFFFF"}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon type={Icons.Ionicons} name={"md-flash-off-sharp"} size={25} color={"#FFFFFF"}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: AppHelper.material.green500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
})