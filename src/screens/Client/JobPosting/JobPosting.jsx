import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native'
import { Chip } from 'react-native-paper';
import { AppHelper, Icon, Icons } from '../../../helper';
import { Loader, RangeSlider } from '../../../components';
import { allCategories } from '../../../constants/categories';
import { useApollo } from '../../../graphql/apollo';
import { useProgress } from '../../../store/hooks/progress.hook';
import { CREATE_CONTRACT } from '../../../graphql/mutations';
import { useSelector } from 'react-redux';

export const JobPosting = ({ navigation }) => {
  const events = allCategories;
  const [selected, setSelected] = React.useState(new Map());
  const user = useSelector(state => state.user);
  const apolloClient = useApollo();
  const { startProgress, stopProgress } = useProgress();
  const [info, setInfo] = useState({
    title: "",
    description: "",
    budget: "",
    categories: [],
    location: "",
  })

  const handleChipPress = (index) => {
    const newSelected = new Map(selected);
    newSelected.set(index, !selected.get(index));
    setSelected(newSelected);
    setInfo({
      ...info,
      categories: [...newSelected.keys()].filter(key => newSelected.get(key)).map(key => events[key])
    })
  };

  const MIN_DEFAULT = 1000;
  const MAX_DEFAULT = 1000000;
  const [minValue, setMinValue] = useState(MIN_DEFAULT);
  const [maxValue, setMaxValue] = useState(MAX_DEFAULT);

  const onSliderRangeChange = (values) => {
    // console.log(values);
    const { min, max } = values;
    setMinValue(min);
    setMaxValue(max);

    setInfo({
      ...info,
      budget: ((min + max) / 2)
    })
  }

  const handleSubmit = async () => {
    if (info.title === "" || info.description === "" || info.budget === "" || info.categories.length === 0 || info.location === "") {
      alert("Please fill all the fields");
      return;
    }
    console.log({ ...info, customerId: user.id });
    // return;
    try {
      startProgress();
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CONTRACT,
        variables: {
          data: JSON.stringify({
            ...info,
            customerId: user.id,
            status: "OPEN"
          })
        }
      });

      if (data.createContract) {
        alert("Job posted successfully");
        navigation.goBack();
      }
    } catch (error) {
      if (error.message === "null is not an object (evaluating 'data.createContract')") {
        alert("Job posted successfully");
        navigation.goBack();
      }
    } finally {
      stopProgress();
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "white" }]}>
      <Loader />
      <ScrollView>
        <View style={styles.categoriesContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Categories</Text>
          <ScrollView>
            <View style={[styles.categories, { marginVertical: 15 }]}>
              {events.map((item, index) => (
                <Chip key={index} style={{ backgroundColor: selected.get(index) ? AppHelper.material.green800 : AppHelper.material.green500, margin: 3 }}
                  textStyle={{ color: AppHelper.material.white }}
                  onPress={() => handleChipPress(index)}>
                  {item}
                </Chip>

              ))}
            </View>
          </ScrollView>
        </View>
        <View style={[styles.moneyContainer, { backgroundColor: "white", borderRadius: 20 }]}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Price Range</Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{minValue} PKR - {maxValue} PKR</Text>
          </View>

          <View style={{ marginVertical: 10 }}>
            <RangeSlider sliderWidth={300} min={MIN_DEFAULT} max={MAX_DEFAULT} step={10} onValueChange={onSliderRangeChange} />
          </View>
        </View>
        <View style={[styles.moneyContainer]}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Job Description:</Text>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <TextInput placeholder="Title" value={info.title} onChangeText={(e) => setInfo({ ...info, title: e })} style={{ marginTop: 10, fontSize: 16, padding: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, borderRadius: 10 }} />
            <TextInput placeholder="Location" value={info.location} onChangeText={(e) => setInfo({ ...info, location: e })} style={{ marginTop: 10, fontSize: 16, padding: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, borderRadius: 10 }} />
            <TextInput multiline={true} numberOfLines={2} value={info.description} onChangeText={(e) => setInfo({ ...info, description: e })} placeholder="Description" style={{ marginTop: 10, fontSize: 16, padding: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, borderRadius: 10 }} />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green800, padding: 15, alignItems: "center" }}>
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