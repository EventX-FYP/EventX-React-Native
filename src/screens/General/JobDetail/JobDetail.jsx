import React, { useRef } from 'react'
import { SafeAreaView, View, Text, TextInput, StyleSheet, FlatList, useWindowDimensions } from 'react-native'
import { AppHelper } from '../../../helper'
import moment from 'moment/moment'
import { TouchableOpacity } from 'react-native'
import { Chip } from 'react-native-paper';
import { BottomSheet, Loader } from '../../../components'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useApollo } from '../../../graphql/apollo'
import { CREATE_BID } from '../../../graphql/mutations'
import { useSelector } from 'react-redux'

const currentDate = new Date().toISOString().slice(0, 10);

const JobList = [
  {
    id: 1,
    title:
      'tittle tittle tittle tittle tittle tittle tittle tittle tittle tittle',
    City: 'Lahore',
    Category:
      ["category1", "category2", "catgeory3", "category1",],
    Content:
      "Lorem Ipsum is  Ipsum is simplyLorem Lorem Ipsum is  Ipsum is simplyLorem  Ipsum is si mplyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    Name: 'Haroon Tahir Haroon',
    Date: moment(currentDate).format('DD-MMM-YYYY'),
  },
]

export const JobDetail = ({ route, navigation }) => {
  const jobRef = useRef();
  const { height } = useWindowDimensions();

  const { item } = route.params;

  const openBottomSheet = () => jobRef.current.expand();
  const closeBottomSheet = () => jobRef.current.close();

  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();
  const user = useSelector(state => state.user);

  const [info, setInfo] = React.useState({
    coverLetter: "",
    price: ""
  });

  const handlePlaceBid = async () => {
    if (!info.coverLetter || !info.price) {
      alert("Please fill all the fields");
      return;
    }
    try {
      startProgress();

      console.log({
        data: {
          contractId: item.id,
          sellerId: user.id,
          price: parseInt(info.price),
          description: info.coverLetter,
        },
      });
      const { data } = await apolloClient.mutate({
        mutation: CREATE_BID,
        variables: {
          data: JSON.stringify({
            contractId: item.id,
            sellerId: user.id,
            price: parseInt(info.price),
            description: info.coverLetter,
          }),
        },
      });

      if (data.createBid) {
        alert("Bid Placed Successfully");
      }

    } catch (error) {
      alert(error.message);
    } finally {
      stopProgress();
      closeBottomSheet();
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <Loader />
      <View style={styles.row}>
        <View style={styles.col1}>
          <Text style={styles.majorHeading}>{item.title}</Text>
          {/* <Text style={styles.date}>{JobList[0].Date}</Text> */}
        </View>

        <View style={styles.col2}>
          {/* <Text style={styles.name}>{JobList[0].Name}</Text> */}
          <Text style={styles.cityHeading}>{item.location}</Text>
        </View>

      </View>

      <View style={styles.chipContainer}>
        <FlatList
          data={item.categories}
          ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
          horizontal={true}
          renderItem={({ item }) => <Chip textStyle={styles.chipTextStyle} style={styles.chipStyle} >{item}</Chip>} />
      </View>

      <View>
        <Text style={styles.descriptionHeading}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <TouchableOpacity onPress={openBottomSheet} style={styles.buttonContainer}>
        <Text style={styles.button}>Bid</Text>
      </TouchableOpacity>

      <BottomSheet ref={jobRef} activeHeight={height * 0.6} backgroundColor={AppHelper.material.green50} backDropColor="black">
        <View style={styles.contentContainer}>
          <Text>Bidding</Text>
          <TextInput
            placeholder="Cover letter..."
            style={styles.textInput}
            maxLength={10}
            textAlignVertical="top"
            onChangeText={(text) => setInfo({ ...info, coverLetter: text })}
            value={info.coverLetter}
            multiline={true}
          />

          <TextInput placeholder="Estimated Price" style={styles.priceInput} value={info.price} onChangeText={(text) => setInfo({ ...info, price: text })} />

          <TouchableOpacity onPress={handlePlaceBid} style={styles.buttonContainer}>
            <Text style={styles.button}>Send Proposal</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>





  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-evenly'
  },
  majorHeading: {
    fontSize: 25,
  },
  category: {
    fontSize: 16,
    color: AppHelper.material.green700,
  },
  row: {
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'space-between'
  },
  cityHeading: {
    fontSize: 18,
  },
  name: {

    color: AppHelper.gray,
  },
  date: {

    color: AppHelper.gray,
  },
  description: {
    color: AppHelper.gray,
    fontSize: 15,
    marginVertical: 25
  },
  button: {
    backgroundColor: AppHelper.material.green400,
    paddingHorizontal: 15,
    color: "white",
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: '90%',
    textAlign: "center",
  },
  descriptionContainer: {

    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  col1: {
    maxWidth: '60%',
    justifyContent: 'space-evenly',
  },
  col2: {
    maxWidth: '30%',
    alignItems: "center",
    justifyContent: 'space-evenly'
  },
  descriptionHeading: {
    fontSize: 25,
    marginVertical: 20
  },
  chipContainer: {

  },
  chipStyle: {
    backgroundColor: AppHelper.material.green500,
  },
  chipTextStyle: {
    color: "white",
    fontSize: 15,

  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: "space-evenly"
  },
  textInput: {
    fontSize: 20,
    width: "90%",
    height: 150,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
    marginVertical: 15,
  },
  priceInput: {
    fontSize: 20,
    width: "90%",
    height: 50,
    borderWidth: 0.7,
    borderRadius: 15,
    padding: 10,
  },
})
