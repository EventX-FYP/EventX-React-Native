import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../../../assets'
import { Picker } from 'react-native-ui-lib'
import { AppHelper } from '../../../helper'

const ProposalCard = ({ proposal }) => {
  const color = AppHelper.material.green400;
  const textColor = AppHelper.white;
  return (
    <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: color, padding: 10, borderRadius: 10, width: "100%", marginBottom: 10, display: "flex", flexDirection: "column", }}>
      <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: "bold", color: textColor, maxWidth: "75%" }}>{proposal.title}</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: textColor }}>{proposal.range}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15, color: AppHelper.material.darkWhite }}>{proposal.description}</Text>
    </TouchableOpacity>
  )
}

export const Proposals = ({ navigation }) => {
  const [proposals, setProposals] = React.useState([
    {
      id: 1,
      userId: 1,
      range: "1000 - 2000",
      title: "I need a logo for my company please help me",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, impedit debitis recusandae velit id autem? Soluta quaerat sed labore assumenda.",
    },
    {
      id: 2,
      userId: 2,
      range: "1000 - 2000",
      title: "I need a logo for my company",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, impedit debitis recusandae velit id autem? Soluta quaerat sed labore assumenda.",
    },
    {
      id: 3,
      userId: 3,
      range: "1000 - 2000",
      title: "I need a logo for my company",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, impedit debitis recusandae velit id autem? Soluta quaerat sed labore assumenda.",
    },
  ]);

  const [selectedProposal, setSelectedProposal] = React.useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Proposals</Text>
      {
        proposals.length > 0 ? (
          <View style={{ marginTop: 20, alignItems: "center", width: "100%" }}>
            <Picker placeholder={"Select jobs"} style={[styles.shadowEffect, { width: "100%", borderColor: AppHelper.material.grey300, borderRadius: 15, padding: 10, backgroundColor: "white" }]}>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Pending" value="pending" />
              <Picker.Item label="Accepted" value="accepted" />
              <Picker.Item label="Rejected" value="rejected" />
            </Picker>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>You have {proposals.length} proposals.</Text>
            <View style={{ width: "100%" , marginVertical: 10 }}>
              {
                proposals.map(proposal => (
                  <ProposalCard proposal={proposal} />
                ))
              }
            </View>
          </View>
        ) : (
          <View style={{ marginVertical: 10, alignItems: "center", flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>You have no proposals yet.</Text>
            <images.SVG.NoProposals width={300} height={300} />
          </View>
        )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textOverflow: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

})