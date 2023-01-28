import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { Image } from "react-native-ui-lib";
import { fontStyles, imageStyles } from "../../styles";

export const PlannerCard = ({ navigation, planner }) => {
  const { name, categories, image, earned, reviews, rating, location, status } = planner.item ? planner.item : planner;
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.info}>
          <Image source={image} style={[imageStyles.circularIcon]} />
          <View style={styles.infoText}>
            <View style={styles.infoName}>
              <Text style={[fontStyles[700], fontStyles.large20]}>{name}</Text>
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
        <Image source={image} style={imageStyles.circularIcon}/>
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
    </View>
  );
}