import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Chip } from "react-native-ui-lib"
import { fontStyles } from '../../../../styles'
import { useSelector, useDispatch } from 'react-redux'
import { AppHelper } from '../../../../helper'
import { UPDATE_USER } from '../../../../store/types'


export const UserCategories = ({ navigation }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: '🎂 Birthday Planning',
      selected: false,
      dbName: 'Birthday',
    },
    {
      id: 2,
      name: '👰 Wedding Planning',
      selected: false,
      dbName: 'Wedding',
    },
    {
      id: 3,
      name: '🎉 Party Planning',
      selected: false,
      dbName: 'Party'
    },
    {
      id: 4,
      name: '💰 Financial Planning',
      selected: false,
      dbName: 'Financial',
    },
    {
      id: 5,
      name: '🏋️ Health and Fitness Planning',
      selected: false,
      dbName: "HealthFitness"
    },
    {
      id: 6,
      name: '🏢 Work Planning',
      selected: false,
      dbName: "Work"
    },
    {
      id: 7,
      name: '📅 Weekly Planning',
      selected: false,
      dbName: "Weekly"
    },
    {
      id: 8,
      name: '👨‍👩‍👧‍👦 Personal Planning',
      selected: false,
      dbName: "Personal"
    },
    {
      id: 9,
      name: '📱 Digital Planning',
      selected: false,
      dbName: "Digital"
    },
  ])

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleSelectChip = (e) => {
    const category = categories.find((item) => item.name === e.children[3].props.children)
    category.selected = !category.selected
    console.log(category)
    setCategories([...categories])
    const selectedCategories = categories.filter((item) => item.selected).map((item) => item.dbName)
    dispatch({ type: UPDATE_USER, payload: { ...user, categories: selectedCategories } })
  }

  return (
    <View style={userCategoriesStyles.container}>
      <View>
        <Text style={[fontStyles[900], fontStyles.large22, userCategoriesStyles.textCenter]}>Select your categories</Text>
        <View style={userCategoriesStyles.options}>
          {
            categories.map((category, index) => {
              return (
                <Chip
                  key={index}
                  label={category.name}
                  labelStyle={
                    category.selected && userCategoriesStyles.selectedText
                  }
                  containerStyle={[
                    userCategoriesStyles.option,
                    category.selected && userCategoriesStyles.selected,
                  ]}
                  onPress={handleSelectChip}
                />
              )
            })
          }
        </View>
      </View>
      {/* <Button
        label="Confirm"
        onPress={handleConfirm}
        style={userCategoriesStyles.button}
      /> */}
    </View>
  )
}

const userCategoriesStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '90%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  options: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "auto",
    padding: 10,
    borderColor: AppHelper.gray2,
  },
  option: {
    margin: 5,
  },
  selected: {
    backgroundColor: AppHelper.material.green400,
  },
  selectedText: {
    color: AppHelper.white,
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: AppHelper.material.green500,

  }
})