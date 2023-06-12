import { View, Text, Icon, Image, Button } from 'react-native-ui-lib';
import { FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { fontStyles, inputStyles, ScrollStyles } from '../../../styles';
import { Loader, PlannerCard } from '../../../components';
import { AppHelper } from '../../../helper'
import { Searchbar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useApollo } from '../../../graphql/apollo';
import { useProgress } from '../../../store/hooks/progress.hook';
import { GET_PLANNERS, GET_RECOMMENDED_PLANNERS } from '../../../graphql/queries';
import { useSelector } from 'react-redux';


export const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const apolloClient = useApollo();
  const { startProgress, stopProgress } = useProgress();
  const user = useSelector(state => state.user);

  useEffect(() => {
    const getAllPlanners = async () => {
      try {
        startProgress();
        const { data } = await apolloClient.query({
          query: GET_PLANNERS,
        });

        if (data.getPlanners) {
          console.log(data.getPlanners);
          setGetPlanners(data.getPlanners);
        }

      } catch (err) {
        console.log(err);
      } finally {
        stopProgress();
      }
    }

    const getRecommendedPlanners = async () => {
      try {
        startProgress();
        const { data } = await apolloClient.query({
          query: GET_RECOMMENDED_PLANNERS,
          variables: {
            userId: user.id,
          }
        });

        if (data.getPlanners) {
          console.log(data.getPlanners);
          setRecommendedPlanners(data.getPlanners);
        }
      } catch (err) {
        console.log(err);
      } finally {
        stopProgress();
      }
    }
    getAllPlanners();
    getRecommendedPlanners();
  }, [])

  const [getPlanners, setGetPlanners] = useState([])
  const [recommdedPlanners, setRecommendedPlanners] = useState([])

  return (
    <ScrollView contentContainerStyle={ScrollStyles.scrollContainer}>
      <Loader />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Searchbar placeholder='Search' onChangeText={onChangeSearch} value={searchQuery} style={styles.input} elevation='2' />
        </View>
        <View style={styles.homeContainer}>
          {recommdedPlanners.length > 0 && (
            <View style={styles.info}>
              <View>
                <Text style={[fontStyles.bold, fontStyles.large24]}>Top Planners For You</Text>
                <Text style={[fontStyles[100], fontStyles.medium]}>Find planners working in your country</Text>
              </View>
              {/* <Button style={styles.button}>
              <Image />
              <Text style={[fontStyles.bold, fontStyles.large, styles.textColor]}>Show more from this area</Text>
            </Button> */}
              <View>
                <SafeAreaView>
                  <FlatList
                    data={recommdedPlanners}
                    horizontal={true}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    renderItem={planner => <PlannerCard navigation={navigation} planner={planner} />}
                  />
                </SafeAreaView>
              </View>
            </View>
          )}

          <View style={styles.info}>
            <View>
              <Text style={[fontStyles.bold, fontStyles.large24]}>Planners with high job success scores</Text>
              <Text style={[fontStyles[100], fontStyles.medium]}>Established planners with successful client relationships</Text>
            </View>
            {/* <Button style={styles.button}>
              <Image />
              <Text style={[fontStyles.bold, fontStyles.large, styles.textColor]}>See more profiles</Text>
            </Button> */}
            <View>
              <SafeAreaView>
                <FlatList
                  data={getPlanners}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                  renderItem={planner => <PlannerCard navigation={navigation} planner={planner} />}
                />
              </SafeAreaView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: AppHelper.material.lightWhite,
    padding: 10,
  },
  searchContainer: {
    // flex: 1,
    // padding: 10,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 10,
  },
  homeContainer: {
    flex: 1,
    // backgroundColor: AppHelper.material.white,
    // padding: 10,
    marginTop: 10,
    height: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '45%',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: AppHelper.material.green600,
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textColor: {
    color: AppHelper.material.darkWhite,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // borderColor: AppHelper.material.greenA400,
    // borderWidth: 1,
    height: '100%'
  },

});