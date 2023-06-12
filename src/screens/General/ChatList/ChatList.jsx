import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { Searchbar } from "react-native-paper"
import { images } from '../../../assets'
import { AppHelper } from '../../../helper'
import { ChatCard, Loader } from '../../../components'
import { fontStyles } from '../../../styles'
import { useApollo } from '../../../graphql/apollo'
import { useProgress } from '../../../store/hooks/progress.hook'
import { GET_USERS_BY_LOGIN_ID } from '../../../graphql/queries'
import { useSelector } from 'react-redux'

export const ChatList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const onChangeSearch = query => setSearchQuery(query)
  const [chats, setChats] = useState([
    // { id: 1, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 2, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 3, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 4, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 5, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 6, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 7, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 8, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 9, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 10, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 11, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    // { id: 12, name: 'Haroon Tahir', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
  ])

  const apolloClient = useApollo();
  const { startProgress, stopProgress } = useProgress();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const getUsers = async () => {
      try {
        startProgress();

        const { data } = await apolloClient.query({
          query: GET_USERS_BY_LOGIN_ID,
          variables: {
            id: user.id
          }
        });

        if (data.getUsersByLoginId) {
          console.log(data.getUsersByLoginId);
          setChats(data.getUsersByLoginId);
        }

      } catch (error) {
        alert(error.message);
      } finally {
        stopProgress();
      }
    }

    getUsers();
  }, [])

  return (
    <View style={styles.container}>
      <Loader />
      <View style={styles.searchContainer}>
        <Searchbar placeholder='Search a chat' onChangeText={onChangeSearch} value={searchQuery} style={styles.input} elevation='2' />
      </View>
      <View style={styles.chatList}>
        {
          chats.length > 0 ?
            <FlatList
              data={chats}
              ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
              renderItem={({ item }) => <ChatCard navigation={navigation} data={item} />}
              keyExtractor={item => item.id}
            />
            :
            <View style={styles.noChatContainer}>
              <images.SVG.MessageIcon width={200} height={200} />
              <Text style={[fontStyles[800], fontStyles.large22, { paddingVertical: 10 }]}>No chat messages</Text>
              <Text>No chats in the list yet</Text>
            </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 10,
  },
  chatList: {
    height: '87%',
    padding: 20,
    margin: 10,
    marginTop: 0,
    backgroundColor: AppHelper.material.white,
    elevation: 2,
    borderRadius: 20,
  },
  noChatContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});