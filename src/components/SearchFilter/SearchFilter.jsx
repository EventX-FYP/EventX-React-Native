import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const SearchFilter = ({ data, input, setInput }) => {
  return (
    <View style={styles.Container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (input === '') {
            return (
              <View>
                <Text style={styles.Text} >{item.title}</Text>
              </View>
            )
          }

          if(item.title.toLowerCase().includes(input.toLowerCase()))
          {
            return(
                <View>
                <Text style={styles.Text} >{item.title}</Text>
              </View>
            )
          }
        }}
      />
    </View>
  )
}

export default SearchFilter

const styles = StyleSheet.create({
    Container:{
       
    },
    Text:{
        fontWeight:"bold",
        fontSize:18,
        paddingVertical:15,
        borderBottomWidth:1
    }
})
