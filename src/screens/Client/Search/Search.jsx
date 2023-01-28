import React from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList } from 'react-native';
import { styles } from './styles';
import { Button } from 'react-native-ui-lib';
import { fontStyles } from '../../../styles';
import { images } from '../../../assets';
import { CategoryCard } from '../../../components';

export const Search = ({ navigation }) => {
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
        <TextInput style={styles.searchInput} placeholder="Search"/>
        <Button style={styles.searchButton} label="Search"/>
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
    </SafeAreaView>
  )
};