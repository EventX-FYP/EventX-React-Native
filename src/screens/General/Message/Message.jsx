import React, { useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { styles } from './styles'
import { Searchbar } from "react-native-paper"
import { images } from '../../../assets'
import { AppHelper } from '../../../helper'
import { ChatCard } from '../../../components'

export const Message = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const onChangeSearch = query => setSearchQuery(query)
  const chats = [
    { id: 1, name: 'Haroon', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    { id: 2, name: 'Haroon', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    { id: 3, name: 'Haroon', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    { id: 4, name: 'Haroon', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    { id: 5, name: 'Haroon', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
    { id: 6, name: 'Haroon', image: images.Users.User1, lastMessage: 'Hello', date: '12:00' },
  ]
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar placeholder='Search a chat' onChangeText={onChangeSearch} value={searchQuery} style={styles.input} elevation='5'/>
      </View>
      <View style={styles.chatList}>
        <ScrollView>
          <FlatList
            data={chats}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: AppHelper.material.minBlack }} />}
            renderItem={({ item }) => <ChatCard navigation={navigation} />}
            />
        </ScrollView>
      </View>
    </View>
  )
}