import React from 'react'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { Text, View, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Size } from 'react-native-ui-lib/src/components/skeletonView'
import { images } from '../../../assets'

export const UserType = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.usertype}>User Type</Text>
      </View>

      <View style={styles.cardholder}>
        <View style={styles.card}>
          <Image style={styles.cardimg} source={images.seller} />
          <Text style={styles.cardtextfont}>Seller</Text>
        </View>

        <View style={styles.card}>
          <Image style={styles.cardimg} source={images.seller} />
          <Text style={styles.cardtextfont}>Seller</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
    alignItems: 'center',
  },
  usertype: {
    color: AppHelper.material.clouds,
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  info: {
    backgroundColor: AppHelper.material.green600,
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 100,
  },
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  cardholder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  cardimg: {
    width: 100,
    height: 100,
  },
  cardtextfont: {
    fontSize: 25,
  },
})
