import React from "react";
import { Pressable, SafeAreaView, ScrollView } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import { fontStyles } from "../../../styles";
import { styles } from "./styles";
import { images } from "../../../assets";
import { AppHelper } from "../../../helper";

export const Job = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
          <View style={styles.image}>
            <images.SVG.EmptyFolder width={200} height={150} />
          </View>
          <View style={styles.description}>
            <Text style={[fontStyles.bold, fontStyles.large18]}>No Active Job Posts</Text>
            <Text style={[fontStyles[100], fontStyles.large, styles.textLength]}>Post a job to the marketplace and let planner come to you</Text>
            <Button label="Post a Job" style={styles.button} />
          </View>
          <View style={{ borderBottomColor: AppHelper.material.minBlack, borderBottomWidth: 1, marginVertical: 10 }} />
          <Button link label="See all postings" labelStyle={styles.link}/>
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