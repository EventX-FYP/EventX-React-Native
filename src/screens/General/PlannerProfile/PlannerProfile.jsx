import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../../assets'
import { AppHelper, Icon, Icons, ScreenNavigator, convertDateToDayMonthYear } from '../../../helper'
import { CustomImageCarousal, Loader } from '../../../components'
import { reviews } from '../../../constants/reviews'
import { fontStyles } from '../../../styles'
import { packages } from '../../../constants/planners'
import { useApollo } from '../../../graphql/apollo'
import { useProgress } from '../../../store/hooks/progress.hook'
import { GET_ALL_PACKAGES, GET_ALL_REVIEWS, GET_ANALYTICS, GET_PORTFOLIO, GET_USERS_WITH_IDS } from '../../../graphql/queries'
import { TextInput } from 'react-native-paper'
import { useIsFocused } from '@react-navigation/native'



const ReviewCard = ({ item }) => {
  const { name, rating, createdAt, review, image } = item;
  const bgColor = AppHelper.material.lightGreen50;
  console.log(item);
  return (
    <SafeAreaView style={[styles.shadow, { display: "flex", flexDirection: "column", backgroundColor: bgColor, borderRadius: 10, maxWidth: 300 }]}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, paddingVertical: 10 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: 100, marginRight: 10 }} />
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
            <Text style={{ fontWeight: "300", fontSize: 16 }}>{convertDateToDayMonthYear(createdAt)}</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>{rating}</Text>
          <Icon type={Icons.AntDesign} name="star" color={AppHelper.material.yellow500} size={20} />
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "column", paddingHorizontal: 15, paddingVertical: 10 }}>
        <Text style={{ fontWeight: "300", fontSize: 16 }}>{review}</Text>
      </View>
    </SafeAreaView>
  )
}

const PackageCard = ({ item }) => {
  const { id, createdAt, updatedAt, title, description, price, picture, sellerId, categories } = item;
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.shadow, { display: "flex", flexDirection: "column", alignItems: "center", margin: 10, borderRadius: 20, maxWidth: 300, backgroundColor: AppHelper.material.lightGreen50 }]}>
      <Image source={{ uri: picture }} style={{ height: 150, width: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
      <View style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Text>
        <Text style={{ fontWeight: "300", fontSize: 16 }}>{description}</Text>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          {/* <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>{rating}</Text> */}
          {/* <Icon type={Icons.AntDesign} name="star" color={AppHelper.material.yellow500} size={20} /> */}
          {/* <Text style={{ fontWeight: "300", fontSize: 16, marginLeft: 10 }}>{reviews} Reviews</Text> */}
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>{price}</Text>
          <Text style={{ fontWeight: "300", fontSize: 16 }}>PKR</Text>
        </View>
      </View>

    </TouchableOpacity>
  )
}

// This is for the client to show planner profile
export const PlannerProfile = ({ navigation, route }) => {
  const { planner: { item } } = route.params;
  const planner = item;

  const apolloClient = useApollo();

  const [portfolio, setPortfolio] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [_packages, setPackages] = useState([]);
  const [_reviews, setReviews] = useState([]);

  const { startProgress, stopProgress } = useProgress();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const { data } = await apolloClient.query({
          query: GET_ANALYTICS,
          variables: {
            userId: planner.id
          }
        });

        if (data.getAnalytics) {
          console.log(data.getAnalytics);
          setAnalytics(data.getAnalytics);
        }

      } catch (error) {
        console.log("GET_ANALYTICS", error);
      }
    }
    const getPortfolio = async () => {
      try {
        const { data } = await apolloClient.query({
          query: GET_PORTFOLIO,
          variables: {
            userId: planner.id
          }
        });

        if (data.getPortfolio) {
          console.log(data.getPortfolio);
          setPortfolio(data.getPortfolio);
        }

      } catch (error) {
        console.log("GET_PORTFOLIO", error);
        setPortfolio({ about: "" });
      }
    }
    const getPackages = async () => {
      try {
        const { data } = await apolloClient.query({
          query: GET_ALL_PACKAGES,
          variables: {
            userId: planner.id
          }
        })

        if (data.getAllPackages) {
          console.log(data.getAllPackages);
          setPackages(data.getAllPackages);
        }
      } catch (error) {
        console.log("GET_PACKAGES", error);
      }
    }
    const getReviews = async () => {
      try {
        const { data } = await apolloClient.query({
          query: GET_ALL_REVIEWS,
          variables: {
            userId: planner.id
          }
        });

        if (data.getAllReviews) {
          console.log("GET_REVIEWS", data.getAllReviews);
          try {
            const res = await apolloClient.query({
              query: GET_USERS_WITH_IDS,
              variables: {
                userIds: data.getAllReviews.map(review => review.customerId)
              }
            });

            if (res.data.getUsersWithIds) {
              const __reviews = data.getAllReviews.map(review => {
                const user = res.data.getUsersWithIds.find(user => user.id === review.customerId);
                return {
                  ...review,
                  name: user.name,
                  image: user.picture
                }
              });
              setReviews(__reviews);
            }
          } catch (error) {
            console.log("GET_USERS_WITH_IDS", error);
          }
        }
      } catch (error) {
        console.log("GET_REVIEWS", error);
      }
    }

    startProgress()
    isFocused &&
      Promise.all([
        getPackages(),
        getPortfolio(),
        getAnalytics(),
        getReviews(),
      ])
        .then(() => stopProgress())
        .catch(error => console.log(error))
        .finally(() => stopProgress());

  }, [isFocused])

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Loader />
        <View style={styles.infoContainer}>
          <Image source={{ uri: planner.picture }} style={{ width: 110, height: 120, borderRadius: 20 }} />
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", textAlign: "right", fontSize: 30 }}>{analytics?.completedEvents ?? 0}</Text>
            <Text style={{ fontWeight: "300", fontSize: 16 }}>Completed Events</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", textAlign: "right", fontSize: 30 }}>{analytics?.totalEvents ?? 0}</Text>
            <Text style={{ fontWeight: "300", fontSize: 16 }}>Total Events</Text>
          </View>
        </View>
        <View style={styles.userContainer}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>{planner.name}</Text>
              <Text style={[fontStyles[100], fontStyles.large, { maxWidth: 150 }]} numberOfLines={1}>
                {
                  planner.categories.map((category, index) => {
                    if (index === planner.categories.length - 1) {
                      return category;
                    } else {
                      return category + ' | ';
                    }
                  })
                }
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNavigator.Chat, { planner: planner })} style={{ borderColor: AppHelper.material.green400, borderWidth: 1, borderRadius: 10, padding: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: AppHelper.material.green400 }}>Message</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ display: "flex", flexDirection: "column", marginTop: 15 }}>
            <Text style={{ color: AppHelper.material.green600, fontWeight: "bold", fontSize: 26, paddingHorizontal: 20, marginVertical: 15 }}>Recent Experiences</Text>
            <CustomImageCarousal data={data} pagination={true} aspectRatio={2 / 1.5} autoPlay={true} />
          </View> */}
        </View>
        <View style={[styles.userContainer, { paddingHorizontal: 15 }]}>
          <View style={{ display: "flex", flexDirection: "column", marginVertical: 15, marginTop: 0 }}>
            <View style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: 26, fontWeight: "bold", color: AppHelper.material.green600 }}>About</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "400", }}>{portfolio?.about !== "" ? portfolio?.about : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quam a obcaecati dicta minima est nulla eaque ab veniam totam dolorem iste voluptatem, animi cumque, numquam tempora libero magni placeat. Unde quod tenetur tempore quaerat corporis aut magnam inventore quidem ducimus deserunt odio voluptates amet nemo obcaecati possimus id dolor magni facilis earum corrupti, ab, ea animi optio! Ad, laborum."}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", marginVertical: 15, marginTop: 0 }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", color: AppHelper.material.green600 }}>Packages</Text>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              {_packages.length === 0
                ? <Text style={{ fontSize: 18, fontWeight: "400", }}>No packages yet</Text>
                : <FlatList
                  data={_packages}
                  horizontal
                  renderItem={({ item }) => <PackageCard item={item} />}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View style={{ marginHorizontal: 5 }} />}
                />
              }
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Text style={{ fontSize: 26, fontWeight: "bold", color: AppHelper.material.green600, marginBottom: 10 }}>Reviews</Text>
              <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green400, padding: 5, paddingHorizontal: 10, borderRadius: 100, alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate(ScreenNavigator.PostTestimonials, { planner: planner })}>
                <Icon type={Icons.AntDesign} name="plus" color={AppHelper.material.white} size={18} />
              </TouchableOpacity>
            </View>
            {_reviews.length === 0
              ? <Text style={{ fontSize: 18, fontWeight: "400", }}>No reviews yet</Text>
              : <FlatList
                data={_reviews}
                horizontal
                renderItem={({ item }) => <ReviewCard item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ marginHorizontal: 5 }} />}
              />
            }
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  userContainer: {
    flex: 1,
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})