import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { forwardRef, useEffect, useRef } from 'react'
import { AppHelper, Icon, Icons, ScreenNavigator } from '../../../helper'
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated'
import { BottomSheet } from '../../../components'

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

const InformationBottomSheet = forwardRef(({ navigation, setClick }, ref) => {
  const { height } = useWindowDimensions();
  return (
    <BottomSheet ref={ref} activeHeight={height * 0.5} backgroundColor={AppHelper.material.lightGreen50} backDropColor={AppHelper.material.green500} useGestureHandler={false} setClick={setClick}>
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: AppHelper.material.green50, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 10, marginHorizontal: 15, marginVertical: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Protocols & Information</Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 15 }}>
          <Text style={{ fontSize: 14, fontWeight: "400", color: AppHelper.material.grey900, marginLeft: 4 }}>Error Arguments</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
            <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Add Card</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 15 }}>
          <Text style={{ fontSize: 14, fontWeight: "400", color: AppHelper.material.grey900, marginLeft: 4 }}>Implement Fast Searching on Every Page</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
            <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Add Card</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setClick(false)} activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
          <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Add List</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  )
})

export const Task = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const offset = useSharedValue(1);
  const taskRef = useRef();
  const [click, setClick] = React.useState(false);

  const taskOpen = () => {
    taskRef.current.expand();
  }

  const taskClose = () => {
    taskRef.current.close();
  }

  useEffect(() => {
    if (click) {
      taskOpen();
    } else {
      taskClose();
    }
  }, [click])

  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ 
        scale: withSpring(offset.value)
      }]
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
  return (
    <SafeAreaView style={styles.container}>
      <Banner navigation={navigation}/>
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
      <InformationBottomSheet ref={taskRef} navigation={navigation} setClick={setClick} />
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
  }
})