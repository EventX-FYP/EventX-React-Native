import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { images } from '../../../assets'
import { Picker } from 'react-native-ui-lib'
import { AppHelper, FalseError } from '../../../helper'
import { BottomSheet, Loader } from '../../../components'
import { useApollo } from '../../../graphql/apollo'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_BIDS, GET_ALL_CONTRACTS } from '../../../graphql/queries'
import { SET_JOB } from '../../../store/types'

const ProposalCard = ({ proposal, setClick = () => <></> }) => {
  const color = AppHelper.material.green400;
  const textColor = AppHelper.white;
  return (
    <TouchableOpacity onPress={setClick} activeOpacity={0.8} style={{ backgroundColor: color, padding: 10, borderRadius: 10, width: "100%", marginBottom: 10, display: "flex", flexDirection: "column", }}>
      <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: "bold", color: textColor, maxWidth: "75%" }}>{proposal.title}</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: textColor }}>{proposal.price}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 15, color: AppHelper.material.darkWhite }}>{proposal.description}</Text>
    </TouchableOpacity>
  )
}

export const Proposals = ({ navigation }) => {

  const apolloClient = useApollo();
  const { startProgress, stopProgress } = useProgress();
  const user = useSelector(state => state.user);
  const job = useSelector(state => state.job);
  const dispatch = useDispatch();
  const [allJobs, setAllJobs] = useState(null)

  useEffect(() => {
    const getProposals = async () => {
      try {
        const { data } = await apolloClient.query({
          query: GET_ALL_BIDS,
          variables: {
            contractId: selectedProposal.value,
          }
        });

        if (data.getAllBids) {
          setProposals(data.getAllBids);
        }
      } catch (error) {
        if (!FalseError(error.message)) {
          alert(error.message);
        }
      }
    }
    const getContracts = async () => {
      try {
        const { data } = await apolloClient.query({
          query: GET_ALL_CONTRACTS,
          variables: {
            userId: user.id,
          }
        });

        if (data.getAllContracts) {
          console.log(data.getAllContracts)
          setAllJobs(data.getAllContracts)
          dispatch({ type: SET_JOB, payload: data.getAllContracts });
          console.log(job);
        }
      } catch (error) {
        alert(error.message);
      }
    }
    startProgress();
    if (job !== null) {
      getProposals().then(() => stopProgress()).catch((error) => alert(error.message));
    } else {
      getContracts()
        .then(() => getProposals())
        .catch((error) => alert(error.message));
    }
    stopProgress();
  }, [])

  useEffect(() => {
    console.log(allJobs, 85)
    console.log(job, 86)
  }, [allJobs])

  const [proposals, setProposals] = useState([]);

  const [selectedProposal, setSelectedProposal] = useState({ value: "Select Contract", label: "Select Contract" });

  const proposalRef = useRef();
  const { height } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Loader />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Proposals</Text>
      {
        <View style={{ marginTop: 20, alignItems: "center", width: "100%" }}>
          {(allJobs || job) && (
            <Picker
              value={{
                value: selectedProposal.value,
                label: selectedProposal.label,
              }}
              onChange={(e) => setSelectedProposal(e)}
              placeholder={"Select jobs"}
              style={[styles.shadowEffect, { width: "100%", borderColor: AppHelper.material.grey300, borderRadius: 15, padding: 10, backgroundColor: "white" }]}
            >
              {job ? job.map((job) => (
                <Picker.Item value={job.id} label={job.title} />
              )) : allJobs.map((job) => (
                <Picker.Item value={job.id} label={job.title} />
              ))}
            </Picker>
          )}

          {selectedProposal.value !== "Select Contract" ? proposals.length > 0 ? (
            <>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>You have {proposals.length} proposals.</Text>
              <View style={{ width: "100%", marginVertical: 10 }}>
                {
                  proposals.map(proposal => (
                    <ProposalCard proposal={{ ...proposal, title: selectedProposal.label }} setClick={() => proposalRef.current.expand()} />
                  ))
                }
              </View>
            </>)
            : (
              <>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>No proposals found.</Text>
                <images.SVG.NoProposals width={200} height={200} />
              </>
            ) : (
            <>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Select a contract to view proposals.</Text>
              <images.SVG.NoProposals width={200} height={200} />
            </>
          )}
        </View>
      }
      <BottomSheet ref={proposalRef} activeHeight={height * 0.6} backgroundColor={AppHelper.material.lightGreen50} backDropColor={"black"}>
        <View style={{ width: "100%", height: "100%", padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <View style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Proposal</Text>
            <Text style={{ fontSize: 16, fontWeight: "semibold", marginTop: 15, }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, impedit debitis recusandae velit id autem? Soluta quaerat sed labore assumenda.</Text>
          </View>
          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <TouchableOpacity onPress={() => proposalRef.current.close()} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green500, padding: 10, borderRadius: 10, width: "48%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: AppHelper.white }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => proposalRef.current.close()} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.red500, padding: 10, borderRadius: 10, width: "48%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: AppHelper.white }}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
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