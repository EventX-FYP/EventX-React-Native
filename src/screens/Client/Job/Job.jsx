import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import { fontStyles } from "../../../styles";
import { styles } from "./styles";
import { images } from "../../../assets";
import { AppHelper, FalseError, ScreenNavigator } from "../../../helper";
import { useApollo } from "../../../graphql/apollo";
import { useProgress } from "../../../store/hooks/progress.hook";
import { Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_CONTRACTS } from "../../../graphql/queries";
import { useIsFocused } from "@react-navigation/native";
import { SET_JOB } from "../../../store/types";

const JobCard = ({ budget, categories, customerId, description, id, location, status, title }) => {
  return (
    <View style={{
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      marginVertical: 10,
      paddingBottom: 10,
      backgroundColor: AppHelper.material.green50,
      padding: 5,
      borderRadius: 5,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <Text style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          fontWeight: 'bold',
        }}>{title}</Text>
        <Text style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
          fontWeight: 'bold',
        }}>PKR {budget}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <Text style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>{description}</Text>
        <View style={{
        }}>
          <Text style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>{location}</Text>
          <Text style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
            {categories.join(', ')}
          </Text>
        </View>
      </View>
    </View>
  )
}

export const Job = ({ navigation }) => {

  const [allJobs, setAllJobs] = useState([]);
  const apolloClient = useApollo();
  const { startProgress, stopProgress } = useProgress();
  const user = useSelector(state => state.user);
  const job = useSelector(state => state.job);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    const getJobs = async () => {
      try {
        startProgress();
        const { data } = await apolloClient.query({
          query: GET_ALL_CONTRACTS,
          variables: {
            userId: user.id
          }
        });

        if (data.getAllContracts) {
          console.log(data.getAllContracts);
          setAllJobs(data.getAllContracts);

          dispatch({ type: SET_JOB, payload: data.getAllContracts })
        }
      } catch (error) {
        alert(error.message);
      } finally {
        stopProgress();
      }
    }
    isFocused && getJobs();
  }, [isFocused])


  return (
    <SafeAreaView style={styles.container}>
      <Loader />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[fontStyles.bold, fontStyles.large30]}>Your Dashboard</Text>
            <Text style={[fontStyles.bold, fontStyles.large20]}>Haroon Tahir</Text>
          </View>
          <View style={styles.headerRight}>
            <Pressable>
              <images.SVG.UserAdd width={20} height={20} fill="black" />
            </Pressable>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={[fontStyles.bold, fontStyles.large22]}>Your Postings</Text>
          {allJobs.length === 0 ? (
            <>
              <View style={styles.image}>
                <images.SVG.EmptyFolder width={200} height={150} />
              </View>
              <View style={styles.description}>
                <Text style={[fontStyles.bold, fontStyles.large18]}>No Active Job Posts</Text>
                <Text style={[fontStyles[100], fontStyles.large, styles.textLength]}>Post a job to the marketplace and let planner come to you</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenNavigator.ClientJobPosting)} activeOpacity={0.8}>
                  <Text style={[fontStyles.bold, fontStyles.large, styles.whiteText]}>Post a Job</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : allJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
          {/* <View style={{ borderBottomColor: AppHelper.material.minBlack, borderBottomWidth: 1, marginVertical: 10 }} /> */}
          {/* <Button link label="See all postings" labelStyle={styles.link} /> */}
        </View>
        <View style={styles.card}>
          <Text style={[fontStyles.bold, fontStyles.large20]}>How to work with Planner</Text>
          <View style={styles.step}>
            <Text style={[fontStyles.bold, fontStyles.medium]}>1. Post a job to the marketplace</Text>
            <Text>Provide enough detail for great planner to figure out if your work is right for them</Text>
          </View>
          <View style={{ borderBottomColor: AppHelper.material.green100, borderBottomWidth: 1, marginVertical: 10 }} />

          <View style={styles.step}>
            <Text style={[fontStyles.bold, fontStyles.medium]}>2. Get proposals from Planner</Text>
            <Text>Ask about their experience and discuss terms of the work</Text>
          </View>
          <View style={{ borderBottomColor: AppHelper.material.green100, borderBottomWidth: 1, marginVertical: 10 }} />

          <View style={styles.step}>
            <Text style={[fontStyles.bold, fontStyles.medium]}>3. Start working together</Text>
            <Text>Collaborate with secure tools like chat, file sharing, and many more.</Text>
          </View>
          <View style={{ borderBottomColor: AppHelper.material.green100, borderBottomWidth: 1, marginVertical: 10 }} />

          <View style={styles.step}>
            <Text style={[fontStyles.bold, fontStyles.medium]}>4. Pay for work you approve</Text>
            <Text>Get invoices, make paymentsm and track work with billing summaries</Text>
          </View>

          <View style={styles.helpCenter}>
            <Text>
              Visit our
              <Text style={styles.greenText}> Help Center </Text>
              to learn more tips for finding the right planner
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}