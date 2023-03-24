import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { fontStyles } from '../../../styles';
import { images } from '../../../assets';
import { BottomSheet, CategoryCard } from '../../../components';
import { Searchbar } from 'react-native-paper';
import { AppHelper, ScreenNavigator } from "../../../helper";
import { imageStyles } from '../../../styles';
import { Image } from 'react-native-ui-lib';
import { Icon, Icons } from '../../../helper';
import { planners, anotherPlanners } from '../../../constants/planners';
import { categories } from '../../../constants/categories';

const PlannerView = ({ planner, navigation }) => {
  const { name, categories, image, earned, reviews, rating, location, status, statusColor } = planner.item ? planner.item : planner;
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.8} style={plannerViewStyles.container} onPress={() => navigation.navigate(ScreenNavigator.PlannerProfileForClient, { name: name, categories: categories, image: image })}>
      <View style={plannerViewStyles.topRow}>
        <View style={plannerViewStyles.info}>
          <Image source={image} style={[imageStyles.circularIcon]} />
          <View style={plannerViewStyles.infoText}>
            <View style={plannerViewStyles.infoName}>
              <Text style={[fontStyles[700], fontStyles.large20]}>{name}</Text>
              <Text style={[plannerViewStyles.status, fontStyles.medium, { color: statusColor }]}>{status}</Text>
            </View>
            <Text style={[fontStyles[100], fontStyles.small, plannerViewStyles.maxLimit]} numberOfLines={1}>
              {
                categories.map((category, index) => {
                  if (index === categories.length - 1) {
                    return category;
                  } else {
                    return category + ' | ';
                  }
                })
              }
            </Text>
            <Text style={[fontStyles[100], fontStyles.small]}>{location}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setIsHeartPressed(!isHeartPressed)}>
          <Icon name={isHeartPressed ? "heart" : "hearto" } type={Icons.AntDesign} size={24} color={AppHelper.material.red400}/>
        </TouchableOpacity>
      </View>
      <View style={plannerViewStyles.bottomRow}>
        <View style={plannerViewStyles.bottomRowItem}>
          <Text style={[fontStyles[700], fontStyles.large20]}>{earned}</Text>
          <Text style={[fontStyles[100], fontStyles.small]}>Earned</Text>
        </View>
        <View style={plannerViewStyles.bottomRowItem}>
          <Text style={[fontStyles[700], fontStyles.large20]}>{reviews}</Text>
          <Text style={[fontStyles[100], fontStyles.small]}>Reviews</Text>
        </View>
        <View style={plannerViewStyles.bottomRowItem}>
          <Text style={[fontStyles[700], fontStyles.large20]}>{rating}</Text>
          <Text style={[fontStyles[100], fontStyles.small]}>Rating</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState("Search Categories");
  const searchRef = useRef();
  const { height } = useWindowDimensions();
  
  const [plannersList, setPlannersList] = useState(planners);
  const [categoriesList, setCategoriesList] = useState(categories);

  const [getPlanners] = useState(anotherPlanners.map((_, index) => {
    if (Math.floor(Math.random() * anotherPlanners.length) % 2 === 0) {
      return anotherPlanners[index];
    } else {
      return planners[index];
    }
  }))
  
  const onChangeSearch = query =>  {
    setSearchQuery(query);
    setCategoriesList(categories.filter(category => category.title.toLowerCase().includes(query.toLowerCase())));
    setPlannersList(planners.filter(planner => planner.name.toLowerCase().includes(query.toLowerCase())));
  }
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
        <Text style={[fontStyles[700], fontStyles.large28]}>Popular {filter === "Search Categories" ? "Categories" : "Planners"}</Text>
        <SafeAreaView style={styles.list}>
          <FlatList
            data={filter === "Search Categories" ? categoriesList : getPlanners}
            renderItem={({ item }) => filter === "Search Categories" ? <CategoryCard content={item} /> : <PlannerView navigation={navigation} planner={item} />}
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
          
          <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
            searchRef.current.close();
            setFilter("Search Planners");
          }}>
            <Text style={[fontStyles[700], fontStyles.large18]}>Search Planners</Text>
          </TouchableOpacity>

          <View style={{ width: "80%", marginVertical: 10, borderColor: AppHelper.material.minBlack, borderBottomWidth: 1 }} />
          
          <TouchableOpacity onPress={() => {
            searchRef.current.close();
            setFilter("Search Categories");
          }}>
            <Text style={[fontStyles[700], fontStyles.large18]}>Search Categories</Text>
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

const plannerViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.lightGreen50,
    borderRadius: 10,
    padding: 10,
    height: 150,
    justifyContent: "space-between",
    shadowColor: AppHelper.material.greenA400,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    // height: "30%",
  },
  infoText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
    height: "55%",
  },
  infoName: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  status: {
    color: AppHelper.material.green500,
    fontWeight: "bold",
    marginLeft: 5,
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  maxLimit: {
    // maxWidth: 120,
  },

});
