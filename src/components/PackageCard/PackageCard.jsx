import { SafeAreaView, View, Text } from "react-native"
import { Image } from "react-native-ui-lib"
import { styles } from "./styles"
export const PackageCard = ({ name, price, description, image }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image style={styles.picture} source={image} />
        <View style={styles.descriptionContainer}>
          <View style={styles.firstRow}>
            <View style={styles.row}>
              <Text style={styles.bold}>Name: </Text>
              <Text>{name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.bold}>Price: </Text>
              <Text>{price}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.bold}>Description: </Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}