import React from 'react'
import { SafeAreaView, Image, Text } from 'react-native'
import { fontStyles } from '../../styles'
import { styles } from './styles'

export const CategoryCard = ({ content }) => {
  const { title, image } = content
  return (
    <SafeAreaView style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={[fontStyles.bold, fontStyles.large20, styles.title]}>{title}</Text>
    </SafeAreaView>
  )
}