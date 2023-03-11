import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native'
import { Chip } from 'react-native-paper';
import { AppHelper, Icon, Icons } from '../../../helper';
import { RangeSlider } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';

export const JobPosting = () => {
  const events = {
    "Corporate": ["Conferences", "Trade Shows", "Product Launches", "Company Retreats"],
    "Social" : ["Weddings", "Birthdays", "Anniversaries", "Baby Showers", "Graduations", "Retirement Parties"],
    "Fundraising": ["Charity Galas", "Auctions", "Benefit Concerts", "Walkathons", "Bake Sales", "Silent Auctions"],
    "Educational": ["Seminars", "Workshops", "Training Sessions", "Conferences", "Guest Lectures"],
    "Sports": ["Marathons", "Triathlons", "Basketball Tournaments", "Soccer Matches", "Cycling Races"],
    "Entertainment": ["Concerts", "Festivals", "Comedy Shows", "Magic Shows", "Circus Performances"],
    "Cultural": ["Food Festivals", "Art Exhibitions", "Music Performances", "Film Festivals", "Carnivals"],
    "Religious": ["Weddings", "Baptisms", "Bat Mitzvahs", "Christmas Services", "Eid al-Fitr", "Hanukkah", "Ramadan"],
    "Political": ["Election Campaign Rallies", "Debates", "Political Conferences", "Fundraisers"],
    "Community": ["Neighborhood Block Parties", "Farmer's Markets", "Carnivals", "Charity Runs", "Blood Drives", "Volunteer Events"],
  };


  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [location, setLocation] = useState(user.location ?? "");

  const [selected, setSelected] = React.useState(new Map());
  
  const onSelect = (index) => {
    const newSelected = new Map(selected);
    newSelected.set(index, !selected.get(index)); // toggle
    setSelected(newSelected);
  };

  const handleChipPress = (typeIndex, index = -1) => {
    const key = index === -1 ? typeIndex : `${typeIndex}-${index}`;
    const newSelected = new Map(selected);
    newSelected.set(key, !selected.get(key));
    setSelected(newSelected);
  };

  const MIN_DEFAULT = 10;
  const MAX_DEFAULT = 500;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const onSliderRangeChange = (values) => {
    // console.log(values);
    const { min, max } = values;
    setMinValue(min);
    setMaxValue(max);
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "white" }]}>
      <ScrollView>
        <View style={styles.categoriesContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Categories</Text>
          <ScrollView>
            <View style={[styles.categories, { marginVertical: 15 }]}>
              {Object.keys(events).map((type, typeIndex) => {
                return (
                  <>
                    <Chip key={typeIndex} style={{ backgroundColor: selected.get(typeIndex) ? AppHelper.material.green900 : AppHelper.material.green600, margin: 3 }}
                      textStyle={{color: AppHelper.material.white }}
                      onPress={() => handleChipPress(typeIndex)}>
                        {type}
                    </Chip>
                    {selected.get(typeIndex) && events[type].map((item, index) => {
                      const key = `${typeIndex}-${index}`;
                      const isSelected = selected.get(key);
                      return (
                        <Chip key={key} style={isSelected ? styles.chipSelect : styles.chipUnselect}
                          textStyle={{ color: isSelected ? AppHelper.material.white : AppHelper.material.darkWhite }}
                          onPress={() => handleChipPress(typeIndex, index)}>
                            {item}
                        </Chip>
                      );
                    })}
                  </>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <View style={[styles.moneyContainer, { backgroundColor: "white", borderRadius: 20}]}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Price Range</Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{minValue} PKR - {maxValue} PKR</Text>
          </View>

          <View style={{ marginVertical: 10 }}>
            <RangeSlider sliderWidth={300} min={MIN_DEFAULT} max={MAX_DEFAULT} step={10} onValueChange={range => {
              setMinValue(range.min);
              setMaxValue(range.max);
            }}/>
          </View>
        </View>
        <View style={[styles.moneyContainer, { display: "flex", flexDirection: "column" }]}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Location:</Text>
          <TouchableOpacity onPress={() => {}} style={[styles.selectLocation,{ marginTop: 10 }]}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Icon type={Icons.Ionicons} name={"search"} size={20} color="black" />
              <Text style={{ marginLeft: 10 }}>Select location</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.moneyContainer]}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Job Description:</Text>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <TextInput placeholder="Title" style={{ marginTop: 10, fontSize: 16, padding: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, borderRadius: 10 }} />
            <TextInput placeholder='Price' style={{ marginTop: 10, fontSize: 16, padding: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, borderRadius: 10 }} />
            <TextInput multiline={true} numberOfLines={2} placeholder="Description" style={{ marginTop: 10, fontSize: 16, padding: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, borderRadius: 10 }} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green800, padding: 15, alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  categoriesContainer: {
    padding: 20,
    maxHeight: 250
  },
  categories: {
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipUnselect: {
    margin: 3,
    backgroundColor: AppHelper.material.green300
  },
  chipSelect: {
    margin: 3,
    backgroundColor: AppHelper.material.lightGreen700,
    color: AppHelper.material.white
  },
  moneyContainer: {
    padding: 20,
  },
  selectLocation: {
    // borderWidth: 0.7,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: AppHelper.material.lightBlack,
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 8,

  }
});