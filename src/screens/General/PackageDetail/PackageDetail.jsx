import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native'
import { images } from '../../../assets'
import React from 'react'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const PackageDetail = () => {
  const title = 'Package title'
  const packagePrice = 'Package Price'
  const description =
    "typesetting in Lorem Ipsum is simply dummy text of the printing and typesetting in Lorem Ipsum is simply dummy text of the printing and typesetting in Lorem Ipsum is simply dummy text of the printing and typesetting inLorem Ipsum is simply dummy text of the printing and typesetting inLorem Ipsum is simply dummy text of the printing and typesetting in Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"

  return (
    <SafeAreaView>
        <ScrollView>
            <Image style={styles.img} source={images.DigitalPlanner}></Image>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>{packagePrice}</Text>
                <Text style={styles.details}>Details:</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </ScrollView>
      
    </SafeAreaView>
  )
}

export default PackageDetail

const styles = StyleSheet.create({
  img: {
    width: windowWidth,
    height: windowHeight / 3,
    resizeMode: 'cover',
  },
  title: {
    marginVertical: 10,
    fontSize: 33,
  },
  price: {
    marginVertical: 10,
    fontSize: 25,
    color:"gray"
  },
  details:{
    marginVertical: 10,
    fontSize: 28,
  },
  description: {
    fontSize: 20,
    marginBottom:30
  },
  contentContainer:{
    paddingHorizontal:15
  }
})
