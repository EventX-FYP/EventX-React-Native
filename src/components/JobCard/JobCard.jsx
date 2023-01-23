import { SafeAreaView, View, Text } from 'react-native'
import { Image } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { images } from '../../assets/index'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment/moment'

const currentDate = new Date().toISOString().slice(0, 10)

export default function JobCard() {
  return (
    <View style={styles.CardContainer}>
      <View style={styles.FirstRow}>
        
          <Image style={styles.PersonImage} source={images.CardTestPicture} />
          <Text style={styles.CardTittle} numberOfLines={1}>
            Tittle
          </Text>
          {/* <Text>{moment(currentDate).format('DD-MMM-YYYY')}</Text> */}
        
      </View>

      <View style={styles.CategoryRow}>
        <Text numberOfLines={1} style={styles.CategoryText}>
          Category 1 | Category 1 | Category 1 | Category 1 | Category 1 |
          Category 1 |
        </Text>
      </View>

      <Text>
        
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  CardContainer: {
    height: 150,
    width: 270,
    borderRadius: 20,
    backgroundColor: 'grey',
    justifyContent: 'space-evenly',
    flex: 1,
    paddingHorizontal:10
  },
  PersonImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    resizeMode: 'cover',
    marginEnd:10
  },
  CardTittle: {
    fontWeight:"bold",
    maxWidth: '50%',
    fontSize:15
  },
  FirstRow: {
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginStart:15
  },
  ScrollViewRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    display: 'flex',
    width: '100%',
  },
  CategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
})
