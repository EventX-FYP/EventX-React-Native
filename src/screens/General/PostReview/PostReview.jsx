import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { AppHelper, Icon, Icons } from '../../../helper'
import { images } from '../../../assets';
import { useProgress } from '../../../store/hooks/progress.hook';
import { Loader } from '../../../components';
import { useApollo } from '../../../graphql/apollo';
import { CREATE_REVIEW } from '../../../graphql/mutations';
import { useSelector } from 'react-redux';

export const PostReview = ({ route, navigation }) => {
  const { planner } = route.params;
  const user = useSelector(state => state.user);

  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();

  const [review, setReview] = React.useState({
    rating: 0,
    comment: "",
  });

  const handleRating = (rating) => {
    setReview({ ...review, rating });
  }

  const handleComment = (comment) => {
    setReview({ ...review, comment });
  }

  const isFormFilled = () => {
    if (review.rating >= 0 && review.rating <= 5 && review.comment.length > 0) {
      return true;
    }
    return false;
  }

  const handleSubmit = async () => {
    if (isFormFilled()) {
      try {
        // startProgress();

        const formData = new FormData();
        formData.append("sentence", review.comment);
        let result;
        try {
          const response = await fetch("http://localhost:8080/sentiment", {
            method: "POST",
            body: formData,
            redirect: "follow"
          });
          result = await response.json();

        } catch (error) {
          console.log(error);
        }

        const { data } = await apolloClient.mutate({
          mutation: CREATE_REVIEW,
          variables: {
            data: JSON.stringify({
              sellerId: planner.id,
              customerId: user.id,
              review: review.comment,
              rating: review.rating,
              sentiment: result?.label === "POSTIVE" ? 1 : result?.label === "NEGAIVE" ? -1 : 0,
            })
          }

        })

        if (data.createReview) {
          alert("Review posted successfully");
          navigation.goBack();
        }
      } catch (error) {
        alert(error.message);
      } finally {
        // stopProgress();
      }
    } else {
      console.log("Go Back");
      navigation.goBack();
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Loader /> */}
      <View style={{ display: "flex", flexDirection: "column", padding: 10, }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, }}>{planner.name}'s Review</Text>
        <ScrollView>
          <View style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", }}>Rating</Text>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                {[1, 2, 3, 4, 5].map((_, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => handleRating(index + 1)} >
                      <Icon type={Icons.AntDesign} name={review.rating >= index + 1 ? "star" : "staro"} color={review.rating >= index + 1 ? AppHelper.material.yellow600 : AppHelper.material.grey300} />
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginBottom: 10, }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", }}>Comment</Text>
              <TextInput
                style={{ borderColor: AppHelper.material.grey500, borderWidth: 1, width: "100%", borderRadius: 10, paddingHorizontal: 7, marginTop: 7, fontSize: 16 }}
                onChangeText={handleComment}
                value={review.comment}
                placeholder="Write your comment here"
                multiline={true}
                numberOfLines={3}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image source={images.AppIcons.Review} style={{ width: 250, height: 250 }} />
            </View>
          </View>

        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleSubmit} style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", backgroundColor: AppHelper.material.green700, }}>
        <Text style={{ color: "white", textAlign: "center", padding: 15, }}>{isFormFilled() ? "Post" : "Go Back"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: AppHelper.material.lightGreen50,
    // padding: 10,
  },
})