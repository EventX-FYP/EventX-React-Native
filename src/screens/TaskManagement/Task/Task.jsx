import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, TextInput } from 'react-native'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { AppHelper, Icon, Icons, pickImageOrVideo, ScreenNavigator } from '../../../helper'
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated'
import { BottomSheet, Loader } from '../../../components'
import { Modal, Portal, Provider } from 'react-native-paper'

const Banner = ({ navigation }) => {
  return (
    <View style={{ height: 50, backgroundColor: AppHelper.material.green500 }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, height: "100%" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Task Management</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Icon name={"plus"} type={Icons.AntDesign} size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const TaskCard = ({ data, value, setClick }) => {
  const color = AppHelper.material.faintWhite
  return (
    <View style={{ display: "flex", flexDirection: "column", backgroundColor: color, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 10, marginHorizontal: 15, marginVertical: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{value}</Text>
      
      <ScrollView style={{ flex: 1, marginVertical: 15 }}>
        {data.map((item, index) => (
          <TouchableOpacity activeOpacity={0.8} key={index} style={[styles.shadowEffect, { display: "flex", padding: 10, margin: 5, backgroundColor: "white", borderRadius: 4 }]} onPress={() => setClick(true)}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: AppHelper.material.grey900, marginLeft: 4 }}>{item.value}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between" }}>
        <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const InformationBottomSheet = forwardRef(({ navigation, setClick, showModal }, ref) => {
  const { height } = useWindowDimensions();
  const [description, setDescription] = useState(
    "ERROR CODES TO BE FOLLOWED:\n" +
    "1 ==> Success (In Green)\n" +
    "-1 ==> Connection Issue with DAL/Online (In Red)\n" +
    "100 ==> For Warning (In Yellow)\n" +
    "0-99 ==> Error Messages (In Red)\n" +
    "Can use -ve Numbers for error it will also be shown in red\n" +
    "SYNOPSIS\n" +
    "So from now on just use Notification.ErrorMessage() give it error message and code no, it will decide wether to show notification in red yellow or green. Colors have been associated with numbers."
  );

  const [isEdit, setIsEdit] = useState(false);

  return (
    <BottomSheet ref={ref} activeHeight={height * 0.8} backgroundColor={AppHelper.material.lightGreen50} backDropColor={AppHelper.material.green500} useGestureHandler={false} setClick={setClick}>
      <SafeAreaView style={{ justifyContent: "space-between", height: height * 0.7 }}>
        <View style={{ display: "flex", flexDirection: "column", backgroundColor: AppHelper.material.lightGreen50, paddingHorizontal: 10, paddingBottom: 15, borderRadius: 10, marginHorizontal: 15, marginVertical: 20, justifyContent: "space-between" }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon name={"description"} type={Icons.MaterialIcons} size={20} color={AppHelper.material.grey900}/>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: AppHelper.material.grey900, marginLeft: 10 }}>Description</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIsEdit(true)} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
              <Icon name={"edit"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Icon name={"user"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 4 }}>Created by: <Text style={{ fontWeight: "400" }}>Admin</Text></Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                <Icon name={"calendar"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 4 }}>Created on: <Text style={{ fontWeight: "400" }}>12/12/2020</Text></Text>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Icon name={"edit"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 4 }}>Last Updated: <Text style={{ fontWeight: "400" }}>12/12/2020</Text></Text>
            </View>
          </View>
          {isEdit ? (
            <View style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <TextInput multiline={true} numberOfLines={4} style={styles.textInput} value={description} onChangeText={(text) => setDescription(text)} />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setIsEdit(false)} style={styles.cancelButton}>
                  <Icon name={"close"} type={Icons.AntDesign} size={16} color={AppHelper.material.white} />
                  <Text style={{ fontSize: 14, fontWeight: "800", color: AppHelper.material.white, marginLeft: 4 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setIsEdit(false)} style={styles.saveButton}>
                  <Icon name={"check"} type={Icons.AntDesign} size={16} color={AppHelper.material.white} />
                  <Text style={{ fontSize: 14, fontWeight: "800", color: AppHelper.material.white, marginLeft: 4 }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ height: 200, marginVertical: 10 }}>
              <ScrollView>
                <Text style={styles.textInput}>{description}</Text>
              </ScrollView>
            </View>
          )}
          <View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
              <Icon name={"attach-file"} type={Icons.MaterialIcons} size={16} color={AppHelper.material.grey900} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 4 }}>
                Attachments: 
                <Text style={{ fontWeight: "400" }}> 2</Text>
              </Text>
                    
              <TouchableOpacity activeOpacity={0.8} onPress={showModal} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
                <Icon name={"eye"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>View</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Attachments")} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
                <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Add</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setClick(false)} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: 50, backgroundColor: AppHelper.material.green500 }}>
          <Icon name={"check"} type={Icons.AntDesign} size={16} color={AppHelper.material.white} />
          <Text style={{ fontSize: 14, fontWeight: "800", color: AppHelper.material.white, marginLeft: 4 }}>Mark as Complete</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BottomSheet>
  )
})

export const Task = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const offset = useSharedValue(1);
  const taskRef = useRef();
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const taskOpen = () => taskRef.current.expand();
  const taskClose = () => taskRef.current.close();

  useEffect(() => {
    if (click) taskOpen();
    else taskClose();
  }, [click]);

  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(offset.value) }]
    }
  });

  const data = [
    {id: 1, value: "Error Arguments"},
    {id: 2, value: "Implement Fast Searching on Every Page"},
    {id: 3, value: "Make UI Transitions Smoother"},
    {id: 4, value: "Save Application Settings"},
    {id: 5, value: "Eliminate All Modified Models"},
    {id: 6, value: "Project Portability"},
  ]

  const pickImage = async () => {
    try {
      setIsLoaded(true);
      const uri = await pickImageOrVideo();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Banner navigation={navigation}/>
      <Loader visible={isLoaded} />

      <Provider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: "white", margin: 40, borderRadius: 20, padding: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: AppHelper.material.grey900 }}>Attachments</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={hideModal} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Icon name={"close"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", marginVertical: 10, marginTop: 30 }}>
              <Icon name={"file-picture-o"} type={Icons.FontAwesome} size={16} color={AppHelper.material.grey900} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10 }}>
                Sample
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", marginVertical: 10 }}>
              <Icon name={"video-camera"} type={Icons.FontAwesome} size={16} color={AppHelper.material.grey900} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10 }}>
                Sample
              </Text>
            </TouchableOpacity>
            {/* Create TouchableOpacity to add */}
            <TouchableOpacity activeOpacity={0.9} onPress={pickImage} style={{ display: "flex", flexDirection: "row", marginVertical: 10, alignItems: "flex-end", width: "100%" }}>
              <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 10 }}>
                Add
              </Text>
            </TouchableOpacity>

          </Modal>
        </Portal>
        <Animated.View style={[animatedStyle, { flex: 1 }]}>
          <ScrollView horizontal>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TaskCard value={"Protocols & Information"} data={data} setClick={setClick} />
              <TaskCard value={"Protocols & Information"} data={data} setClick={setClick} />
              <TaskCard value={"Protocols & Information"} data={data} setClick={setClick} />
              <TaskCard value={"Protocols & Information"} data={data} setClick={setClick} />
            </View>
          </ScrollView>
        </Animated.View>
        <InformationBottomSheet ref={taskRef} navigation={navigation} setClick={setClick} showModal={showModal} />
      </Provider>
      {/* <CameraComponent /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: { 
    fontSize: 14,
    fontWeight: "400",
    maxHeight: 200, 
    color: AppHelper.material.grey900,
    marginTop: 10,
    padding: 10,
    backgroundColor: AppHelper.material.green50,
    borderRadius: 10,
    borderColor: AppHelper.material.grey300,
    borderWidth: 1,
  },
  cancelButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: AppHelper.material.red400,
    borderRadius: 10,
    marginRight: 10,
    width: "50%",
    justifyContent: "center",
  },
  saveButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: AppHelper.material.green700,
    borderRadius: 10,
    width: "50%",
    justifyContent: "center",
  }
})