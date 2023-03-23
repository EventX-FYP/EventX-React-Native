import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-ui-lib";
import { fontStyles, imageStyles } from "../../styles";
import { AppHelper, Icon, Icons, ScreenNavigator } from "../../helper";

export const PlannerCard = ({ navigation, planner }) => {
  const { name, categories, image, earned, reviews, rating, location, status } = planner.item ? planner.item : planner;
  const [isHeartPressed, setIsHeartPressed] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(ScreenNavigator.PlannerProfileForClient, { name: name, categories: categories, image: image })} style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.info}>
          <Image source={image} style={[imageStyles.circularIcon]} />
          <View style={styles.infoText}>
            <View style={styles.infoName}>
              <Text numberOfLines={1} style={[fontStyles[700], fontStyles.large20, { maxWidth: 90 }]}>{name}</Text>
              <Text style={[styles.status, fontStyles.medium]}>{status}</Text>
            </View>
            <Text style={[fontStyles[100], fontStyles.small, styles.maxLimit]} numberOfLines={1}>
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
      <View style={styles.bottomRow}>
        <View style={styles.bottomRowItem}>
          <Text style={[fontStyles[700], fontStyles.large20]}>{earned}</Text>
          <Text style={[fontStyles[100], fontStyles.small]}>Earned</Text>
        </View>
        <View style={styles.bottomRowItem}>
          <Text style={[fontStyles[700], fontStyles.large20]}>{reviews}</Text>
          <Text style={[fontStyles[100], fontStyles.small]}>Reviews</Text>
        </View>
        <View style={styles.bottomRowItem}>
          <Text style={[fontStyles[700], fontStyles.large20]}>{rating}</Text>
          <Text style={[fontStyles[100], fontStyles.small]}>Rating</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
    borderRadius: 10,
    padding: 10,
    height: 150,
    width: 250,
    marginRight: 10,
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
    maxWidth: 120,
  },

});
