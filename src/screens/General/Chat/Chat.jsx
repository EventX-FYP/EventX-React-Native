import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../../assets'
import { AppHelper } from '../../../helper'
import { fontStyles } from '../../../styles'
import { messages } from '../../../constants/messages'
import { Loader } from '../../../components'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useApollo } from '../../../graphql/apollo'
import { GET_CHATS } from '../../../graphql/queries'
import { useSelector } from 'react-redux'
import { CREATE_MESSAGE } from '../../../graphql/mutations'

export const Chat = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const { data } = route.params;
  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();

  const [_messages, setMessages] = useState();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const getMessages = async () => {
      try {
        startProgress();

        console.log(data.id, user.id);
        const res = await apolloClient.query({
          query: GET_CHATS,
          variables: {
            senderId: data.id,
            receiverId: user.id,
          }
        });

        if (res.data.getChats) {
          console.log(res.data.getChats);
          setMessages(res.data.getChats);
        }

      } catch (error) {
        alert(error.message);
      } finally {
        stopProgress();
      }
    }

    getMessages();
  }, [])

  const handleSendMessage = async () => {
    try {
      startProgress();

      const res = await apolloClient.mutate({
        mutation: CREATE_MESSAGE,
        variables: {
          data: JSON.stringify({
            contractId: _messages[0].contractId,
            senderId: data.id,
            receiverId: user.id,
            text: message,
          })
        }
      });

      if (res.data.createMessage) {
        setMessage("");
        setMessages([..._messages, res.data.createMessage]);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      stopProgress();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader />
      <View style={styles.chat}>
        <View style={styles.chatHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <images.SVG.ArrowLeft width={20} height={25} />
          </Pressable>
          <Text style={[fontStyles[700], fontStyles.large18]}>{data.name}</Text>
          <View />
        </View>

        <View style={styles.chatBody}>
          <ScrollView>
            {
              _messages && _messages?.map((item, index) => (
                <View key={index} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: item.receiverId === user.id ? "flex-end" : "flex-start", padding: 10 }}>
                  <View style={{ width: "auto", maxWidth: "80%", backgroundColor: item.receiverId === user.id ? AppHelper.material.green600 : "#fefefe", borderRadius: 10, padding: 10 }}>
                    <Text style={{ color: item.receiverId === user.id ? "#fff" : "#000" }}>{item.text}</Text>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>

      </View>
      <View style={styles.sendMessageContainer}>
        {/* <Pressable style={styles.iconOutline}>
          <images.SVG.EmojiIcon width={25} height={25}/>
        </Pressable>
        <Pressable style={styles.iconOutline}>
          <images.SVG.AttachmentIcon width={25} height={25}/>
        </Pressable> */}
        <View style={styles.inputContainer}>
          <TextInput style={{ flex: 1, fontSize: 18, padding: 5 }} placeholder="Type a message" value={message} onChangeText={setMessage} multiline />
        </View>
        <Pressable style={styles.iconOutlineGreen} onPress={handleSendMessage}>
          <images.SVG.PaperPlaneHorizontalIcon width={20} height={20} />
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