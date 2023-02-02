import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Chip } from "react-native-ui-lib"
import { fontStyles } from '../../../styles'
import { useSelector, useDispatch } from 'react-redux'
import { User } from '../../../store/types'

export const UserCategories = ({ navigation }) => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: '👰 Wedding Planning',
      selected: false,
    },
    {
      id: 2,
      name: '🎂 Birthday Planning',
      selected: false,
    },
    {
      id: 3,
      name: '🎤 Concert Planning',
      selected: false,
    },
    {
      id: 4,
      name: '👔 Corporate Planning',
      selected: false,
    },
    {
      id: 5,
      name: '🎉 Party Planning',
      selected: false,
    },
    {
      id: 6,
      name: '🏋️ Health and Fitness Planning',
      selected: false,
    },
    {
      id: 7,
      name: '✈️ Travel Planning',
      selected: false,
    },
    {
      id: 8,
      name: '📅 Weekly Planning',
      selected: false,
    },
    {
      id: 9,
      name: '💰 Financial Planning',
      selected: false,
    },
    {
      id: 10,
      name: '🏠 Home Planning',
      selected: false,
    },
    {
      id: 11,
      name: '👩‍💻 Work Planning',
      selected: false,
    },
    {
      id: 12,
      name: '👩‍👧 Personal/Life Planning',
      selected: false,
    },
    {
      id: 13,
      name: '📱 Digital Planning',
      selected: false,
    },
  ])

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleSelectChip = (e) => {
    const category = categories.find((item) => item.name === e.children[3].props.children)
    category.selected = !category.selected
    setCategories([...categories])
  }

  const handleConfirm = () => {
    const selectedCategories = categories.filter((category) => category.selected)
    dispatch({ type: User.UPDATE_USER, payload: { ...user, categories: selectedCategories}})
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
      <Button
        label="Confirm"
        onPress={handleConfirm}
        style={userCategoriesStyles.button}
      />
    </View>
  )
}

const userCategoriesStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '98%',
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