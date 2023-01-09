import React from 'react'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { Text, View, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../assets'

export const GeneralInfo = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>General info</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: AppHelper.material.green50,
        justifyContent: "space-between"
    },
});