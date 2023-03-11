import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, StyleSheet, useWindowDimensions, Touchable, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { fontStyles } from '../../../styles';
import { images } from '../../../assets';
import { BottomSheet, CategoryCard } from '../../../components';
import { Searchbar } from 'react-native-paper';
import { AppHelper } from "../../../helper";


export const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const searchRef = useRef();
  const { height } = useWindowDimensions();
  const categories = [
    {
      title: "Wedding Planners",
      image: images.WeddingPlanner,
    },
    {
      title: "Birthday Planners",
      image: images.BirthdayPlanner,
    },
    {
      title: "Party Planners",
      image: images.PartyPlanner,
    },
    {
      title: "Financial Planners",
      image: images.FinancialPlanner,
    },
    {
      title: "Health & Fitness Planners",
      image: images.HealthFitnessPlanner,
    },
    {
      title: "Work Planners",
      image: images.WorkPlanner,
    },
    {
      title: "Weekly Planners",
      image: images.WeeklyPlanner,
    },
    {
      title: "Personal/Life Planners",
      image: images.PersonalPlanner,
    },
    {
      title: "Digital Planners",
      image: images.DigitalPlanner,
    },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.input}
          elevation='2'
          icon={"filter"}
          onIconPress={() => searchRef.current.expand()}
          />
      </View>
      <View style={styles.searchResultContainer}>
        <Text style={[fontStyles[700], fontStyles.large28]}>Popular Categories</Text>
        <SafeAreaView style={styles.list}>
          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryCard content={item} />}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </SafeAreaView>
      </View>
      <BottomSheet ref={searchRef} activeHeight={height * 0.5} backgroundColor={AppHelper.material.green50} backDropColor={'black'}>
        <SafeAreaView style={{ flex: 1, backgroundColor: AppHelper.material.green50, padding: 10, alignItems: "center" }}>
          <Text style={{ display: "flex", textAlign: "center", color: "green", fontSize: 24, fontWeight: "bold", justifyContent: "center", alignItems: "center", width: "100%" }}>
            Filters
          </Text>
          
            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => searchRef.current.close()}>
              <Text style={[fontStyles[700], fontStyles.large18]}>Get Planners</Text>
            </TouchableOpacity>
            <View style={{ width: "80%", marginVertical: 10, borderColor: AppHelper.material.minBlack, borderBottomWidth: 1 }} />
            <TouchableOpacity onPress={() => searchRef.current.close()}>
              <Text style={[fontStyles[700], fontStyles.large18]}>Get Categories</Text>
            </TouchableOpacity>
        </SafeAreaView>
      </BottomSheet>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: AppHelper.material.white,
    padding: 10,
    height: "100%",
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
  searchInput: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppHelper.material.green300,
    height: 50,
    width: "70%",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: AppHelper.material.green500,
    borderRadius: 10,
    height: 50,
    width: "20%",
    marginBottom: 10,
  },
  searchButtonLabel: {
    color: AppHelper.material.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  searchResultContainer: {
    flex: 1,
    // backgroundColor: AppHelper.material.white,
    // paddingBottom: 22,
    // marginBottom: 10,
    height: "90%",
  },
  list: {
    paddingTop: 10,
    paddingBottom: 22,

  }
});