import React from 'react'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { Text, View, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../assets'

export const GeneralInfo = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Image style= {styles.wave} source={images.GeneralInfoWave}></Image>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: AppHelper.material.green50,
    },
    wave:{
        height:"25%",
        resizeMode:"stretch"
    }
});