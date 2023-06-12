import { SafeAreaView, View, Text } from 'react-native'
import { Image, TouchableOpacity } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { images } from '../../assets/index'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment/moment'
import { ScreenNavigator, AppHelper } from '../../helper'

export const JobCard = ({ job, onPress }) => {
  // console.log(job)
  const { title, location, categories, description, Name, Date } = job?.item
    ? job.item
    : job
  return (
    <TouchableOpacity onPress={onPress} >
      {/* onPress={onPress} */}
      <View style={styles.CardContainer}>
        <View style={styles.FirstRow}>
          <Text style={styles.CardTittle} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.CardCity} numberOfLines={1}>
            {location}
          </Text>
        </View>

        <View style={styles.CategoryRow}>
          <Text numberOfLines={1} style={styles.CategoryText}>
            {categories.join(', ')}
          </Text>
        </View>

        <View style={styles.Description}>
          <Text style={styles.DescriptionContent} numberOfLines={3}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  CardContainer: {
    height: 200,
    width: 300,
    borderRadius: 20,
    backgroundColor: AppHelper.material.green50,
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
  },
  CardTittle: {
    fontWeight: 'bold',
    maxWidth: '60%',
    fontSize: 15,
  },
  FirstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  Description: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  DescriptionContent: {
    color: AppHelper.gray,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SecondLastRowHeading: {
    maxWidth: '50%',
    fontWeight: '600',
  },
  CategoryText: {
    color: AppHelper.material.green600,
  },
  CardCity: {
    fontSize: 12,
    maxWidth: '30%',
  },
})
