import { View, Text, Icon, Image, Button } from 'react-native-ui-lib';
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { fontStyles, inputStyles, ScrollStyles } from '../../../styles';
import { TextField } from 'react-native-ui-lib/src/incubator';
import { PlannerCard } from '../../../components';
import { images } from '../../../assets';
import { AppHelper } from '../../../helper'
import { Searchbar } from 'react-native-paper';
import { useState } from 'react';


export const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const planners = [
    { name: 'Haroon', categories: ['Birthday', 'Party', 'Wedding', 'Birthday'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
  ]
  return (
    <ScrollView contentContainerStyle={ScrollStyles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Searchbar placeholder='Search' onChangeText={onChangeSearch} value={searchQuery} style={styles.input} elevation='2'/>
        </View>
        <View style={styles.homeContainer}>
          <View style={styles.info}>
            <View>
              <Text style={[fontStyles.bold, fontStyles.large24]}>Top Planners in Pakistan</Text>
              <Text style={[fontStyles[100], fontStyles.medium]}>Find planners working in your country</Text>
            </View>
            <Button style={styles.button}>
              <Image/>
              <Text style={[fontStyles.bold, fontStyles.large, styles.textColor]}>Show more from this area</Text>
            </Button>
            <View>
              <SafeAreaView>
                <FlatList
                  data={planners}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={planner => <PlannerCard navigation={navigation} planner={planner} /> }
                />
              </SafeAreaView>
            </View>
          </View>
          <View style={styles.info}>
            <View>
              <Text style={[fontStyles.bold, fontStyles.large24]}>Planners with high job success scores</Text>
              <Text style={[fontStyles[100], fontStyles.medium]}>Established planners with successful client relationships</Text>
            </View>
            <Button style={styles.button}>
              <Image/>
              <Text style={[fontStyles.bold, fontStyles.large, styles.textColor]}>See more profiles</Text>
            </Button>
            <View>
              <SafeAreaView>
                <FlatList
                  data={planners}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={planner => <PlannerCard navigation={navigation} planner={planner} /> }
                />
              </SafeAreaView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: AppHelper.material.lightWhite,
    padding: 10,
  },
  searchContainer: {
    // flex: 1,
    // padding: 10,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 10,
  },
  homeContainer: {
    flex: 1,
    // backgroundColor: AppHelper.material.white,
    // padding: 10,
    marginTop: 10,
    height: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '45%',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: AppHelper.material.green600,
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textColor: {
    color: AppHelper.material.darkWhite,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // borderColor: AppHelper.material.greenA400,
    // borderWidth: 1,
    height: '100%'
  },
  
});