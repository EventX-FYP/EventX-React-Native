import React, { useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { Loader, PlannerPackageCard } from '../../../components'
import { images } from '../../../assets'
import { AppHelper, Icon, Icons, ScreenNavigator } from '../../../helper'
import { useSelector } from 'react-redux'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useApollo } from '../../../graphql/apollo'
import { GET_ALL_PACKAGES } from '../../../graphql/queries'
import { useIsFocused } from '@react-navigation/native'

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

export const Packages = ({ navigation }) => {

  const user = useSelector(state => state.user)
  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();

  const [packages, setPackages] = React.useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    const getPackages = async () => {
      try {
        startProgress()
        const { data } = await apolloClient.query({
          query: GET_ALL_PACKAGES,
          variables: {
            userId: user.id
          }
        })

        if (data.getAllPackages) {
          console.log(data.getAllPackages)
          setPackages(data.getAllPackages)

        }
      } catch (error) {
        alert(error.message)
      } finally {
        stopProgress()
      }
    }
    isFocused && getPackages()
  }, [isFocused])


  return (
    <SafeAreaView>
      <ScrollView>
        <Loader />
        <View style={styles.Component}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 10 }}>
            <Text style={styles.heading}>All Packages</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNavigator.PlannerAddPackages, {})}>
              <Icon type={Icons.AntDesign} name="pluscircle" color={AppHelper.material.green500} size={25} />
            </TouchableOpacity>
          </View>
          <View style={styles.cardHolder}>
            <FlatList
              ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
              data={packages}
              renderItem={({ item }) => (
                <PlannerPackageCard
                  packageContent={item}
                  cardimage={item.picture}
                  navigation={navigation}
                />
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
    paddingVertical: 15
  },
  Component: {
    paddingStart: 10,
  },
})
