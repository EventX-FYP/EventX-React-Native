import { View, Text, StyleSheet,Image } from 'react-native'
import {  AppHelper } from '../../helper/AppHelper/AppHelper'
import {images} from '../../assets/index'
export const NotificationCard = ({  }) => {

    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown  "
    const title = "Verify Your Email"
return (
    <View style={styles.CardContainer}>
        <View style={styles.container}>
        <View>
            <Image source={images.Thunder} style={styles.icon}/>
        </View>
        <View style={styles.TextContainer}>
            <Text style={styles.heading} numberOfLines={1}>{title}</Text>
            <Text  style={styles.description} numberOfLines={2}  >{description}</Text>
        </View>       
         </View>
    </View>
    
)
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:"#ECECEC",
       padding:20,
       borderRadius:25,
       flexDirection:"row",
       justifyContent:"space-around",
       alignItems:"center",
    },
    heading:{
        fontSize:22
    },
    description:{
        color: AppHelper.gray,
        fontSize:15,
    },
    icon:{
        width:30,
        height:40
    },
    TextContainer:{
       flex:0.9
    },
    CardContainer:{
        height:120,
        marginVertical:10
    }
})