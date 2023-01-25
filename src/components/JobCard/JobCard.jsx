import { SafeAreaView, View, Text } from 'react-native'
import { Image, TouchableOpacity } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { images } from '../../assets/index'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment/moment'
import { ScreenNavigator, AppHelper } from "../../helper";

const currentDate = new Date().toISOString().slice(0, 10)
const content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"
export const JobCard = () => {
  return (

    
      <View style={styles.CardContainer}>

        <View style={styles.FirstRow}>      
            <Text style={styles.CardTittle} numberOfLines={1}>
              Tittle
            </Text>

            <Text  style={styles.CardCity} numberOfLines={1}>
              Lahore
            </Text>
        </View>

        <View style={styles.CategoryRow}>
          <Text numberOfLines={1} style={styles.CategoryText}>
            Category 1 | Category 1 | Category 1 | Category 1 | Category 1 |
            Category 1 |
          </Text>
        </View>

        <View style={styles.Description}>
          <Text style={styles.DescriptionContent} numberOfLines={3}>
             {content}
          </Text>
        </View>

        <View style={styles.Row} >
          <Text style={styles.SecondLastRowHeading} >
            Posted By:
          </Text>
          <Text style={styles.SecondLastRowHeading} >
            Deadline: 
          </Text>
        </View>

        <View style={styles.Row} >
          <Text numberOfLines={1}  style={styles.SecondLastRowHeading}>
              Haroon Tahir Haroon Tahir Haroon Tahir Haroon Tahir
          </Text>

          <Text numberOfLines={1} style={styles.SecondLastRowHeading}>
          {moment(currentDate).format('DD-MMM-YYYY')}
          </Text>
        </View>
        
      </View>
    

    
  )
}

const styles = StyleSheet.create({
  CardContainer: {
    height: 200,
    width: 300,
    borderRadius: 20,
    backgroundColor: AppHelper.material.green50,
    justifyContent: 'space-evenly',
    paddingHorizontal:15,
    paddingVertical:5,
    borderWidth:1
  },
  CardTittle: {
    fontWeight:"bold",
    maxWidth: '60%',
    fontSize:15,
  },
  FirstRow: {
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  Description:{
    flexDirection:"row",
    justifyContent:"flex-start",
  },
  DescriptionContent:{
    color: AppHelper.gray
  },
  Row:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  SecondLastRowHeading:{
    maxWidth:"50%",
    fontWeight:"600"
  },
  CategoryText:{
    color:AppHelper.material.green600,
  },
  CardCity:{
    fontSize:12,
    maxWidth:"30%"
  }
})
