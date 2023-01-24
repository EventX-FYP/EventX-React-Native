import { View, Text, Icon, Image, Button } from 'react-native-ui-lib';
import { SafeAreaView, ScrollView } from 'react-native';
import { styles } from './styles';
import { fontStyles, inputStyles, ScrollStyles } from '../../../styles';
import { TextField } from 'react-native-ui-lib/src/incubator';
import { PlannerCard } from '../../../components';
import { images } from '../../../assets';

export const Home = ({ navigation }) => {
  const planners = [
    { name: 'Haroon', categories: ['Birthday', 'Party', 'Wedding', 'Birthday'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
    { name: 'Haroon', categories: ['Birthday', 'Party'], image: images.GoogleIcon, earned: 1000, reviews: 10, rating: 4.5, location: 'Lahore', status: 'Online' },
  ]
  return (
    <ScrollView contentContainerStyle={ScrollStyles.scrollContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextField placeholder={'Search'} maxLength={40} style={inputStyles.inputField} />
          <Icon />
        </View>
        <View style={styles.homeContainer}>
          <View style={styles.info}>
            <View>
              <Text style={[fontStyles.bold, fontStyles.large24]}>Top Planners in Pakistan</Text>
              <Text style={[fontStyles[100], fontStyles.medium]}>Find planners working in your country</Text>
            </View>
            <Button style={styles.button}>
              <Image/>
              <Text style={[fontStyles.bold, fontStyles.large, styles.textColor]}>Show more from this area</Text>
            </Button>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>
                  {
                    planners.map((planner, index) =>
                      <PlannerCard planner={planner} key={index}/>
                    )
                  }
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.info}>
            <View>
              <Text style={[fontStyles.bold, fontStyles.large24]}>Planners with high job success scores</Text>
              <Text style={[fontStyles[100], fontStyles.medium]}>Established planners with successful client relationships</Text>
            </View>
            <Button style={styles.button}>
              <Image/>
              <Text style={[fontStyles.bold, fontStyles.large, styles.textColor]}>See more profiles</Text>
            </Button>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>
                  {
                    planners.map((planner, index) =>
                      <PlannerCard planner={planner} key={index}/>
                    )
                  }
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}