import React, { createRef, useRef } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, PanResponder } from 'react-native'
import { View, Text } from 'react-native-ui-lib';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { Slider } from 'react-native-ui-lib';
import { AppHelper } from '../../../helper';
import { RangeSlider } from '../../../components';

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
  const [minValue, setMinValue] = React.useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = React.useState(MAX_DEFAULT);

  const onSliderRangeChange = (values) => {
    // console.log(values);
    const { min, max } = values;
    setMinValue(min);
    setMaxValue(max);
  }

  return (
    <SafeAreaView style={styles.container}>
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
                        textStyle={{ color: isSelected ? AppHelper.material.white : AppHelper.material.lightBlack }}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
})

const rangeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBECF2',
  },
  contentContainer: {
    width: '90%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 20,
  },
  tableContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  table: {
    borderColor: '#EBECF2',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  colorBlack: {
    color: 'black'
  },
});