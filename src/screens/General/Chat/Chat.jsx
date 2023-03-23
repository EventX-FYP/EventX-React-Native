import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../../assets'
import { AppHelper } from '../../../helper'
import { fontStyles } from '../../../styles'
import { messages } from '../../../constants/messages'

export const Chat = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const { name } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chat}>
        <View style={styles.chatHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <images.SVG.ArrowLeft width={20} height={25} />
          </Pressable>
          <Text style={[fontStyles[700], fontStyles.large18]}>{name}</Text>
          <View />
        </View>

        <View style={styles.chatBody}>
          <ScrollView>
            {
              messages.map((item, index) => (
                <View key={index} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: item.isMe ? "flex-end" : "flex-start", padding: 10 }}>
                  <View style={{ width: "auto", maxWidth: "80%", backgroundColor: item.isMe ? AppHelper.material.green600 : "#fefefe", borderRadius: 10, padding: 10 }}>
                    <Text style={{ color: item.isMe ? "#fff" : "#000" }}>{item.message}</Text>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>

      </View>
      <View style={styles.sendMessageContainer}>
        <Pressable style={styles.iconOutline}>
          <images.SVG.EmojiIcon width={25} height={25}/>
        </Pressable>
        <Pressable style={styles.iconOutline}>
          <images.SVG.AttachmentIcon width={25} height={25}/>
        </Pressable>
        <View style={styles.inputContainer}>
          <TextInput style={{ flex: 1, fontSize: 18, padding: 5 }} placeholder="Type a message" value={message} onChangeText={setMessage} multiline/>
        </View>
        <Pressable style={styles.iconOutlineGreen}>
          {
            message.length === 0 ?
              <images.SVG.MicrophoneIcon width={20} height={20} />
              :
              <images.SVG.PaperPlaneHorizontalIcon width={20} height={20}/>
          }
        </Pressable>
      </View>
    </SafeAreaView>
  )
}















const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // paddingBottom: 20,
  },
  sendMessageContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 10,
  },
  iconOutline: {
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconOutlineGreen: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: AppHelper.material.green600,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
  },
  chat: {
    width: "100%",
    flex: 1,
  },
  chatHeader: {
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: AppHelper.white,
    justifyContent: "space-between",
  },
  chatBody: {
    // width: "100%",
    flex: 1,
    // backgroundColor: AppHelper.white,
    padding: 10,
  },
  isMe: {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: 10,
    justifyContent: "flex-end",
  },
  isNotMe: {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: 10,
    justifyContent: "flex-start",
  },
  isMeColor: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: AppHelper.material.green600,
    borderRadius: 10,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "auto"
  },
  isNotMeColor: {
    backgroundColor: AppHelper.material.grey300,
    borderRadius: 10, 
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "auto"
  },
})