import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native'
import { PlannerPackageCard } from '../../../components'
import {images} from '../../../assets'

const categoryName = ['Birthday Package', 'Wedding Package', 'Bridal Showers']
const packageList = [
  {
    id: 1,
    title: 'Package title',
    packagePrice: 'Package Price',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 2,
    title: 'Package title',
    packagePrice: 'Package Price',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
  {
    id: 3,
    title: 'Package title',
    packagePrice: 'Package Price',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
  },
]

export const Packages = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.Component}>
          <Text style={styles.heading}>{categoryName[0]}</Text>
          <View style={styles.cardHolder}>
            <FlatList
              ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
              data={packageList}
              renderItem={({ item }) => (
                <PlannerPackageCard packageContent={item} cardimage={images.DigitalPlanner} />
              )}
              horizontal={true}
            />
          </View>
        </View>

        <View style={styles.Component}>
          <Text style={styles.heading}>{categoryName[1]}</Text>
          <View style={styles.cardHolder}>
            <FlatList
              ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
              data={packageList}
              renderItem={({ item }) => (
                <PlannerPackageCard packageContent={item} cardimage={images.DigitalPlanner} />
              )}
              horizontal={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: 25,
    marginVertical: 15,
  },
  cardHolder: {
    paddingEnd: 25,
    paddingVertical:15
  },
  Component: {
    paddingStart: 10,
  },
})
