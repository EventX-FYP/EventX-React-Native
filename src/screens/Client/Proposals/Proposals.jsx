import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { images } from '../../../assets'
import { Picker } from 'react-native-ui-lib'
import { AppHelper, FalseError, ScreenNavigator } from '../../../helper'
import { BottomSheet, Loader } from '../../../components'
import { useApollo } from '../../../graphql/apollo'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_BIDS, GET_ALL_CONTRACTS } from '../../../graphql/queries'
import { SET_JOB } from '../../../store/types'
import { ACCEPT_BID } from '../../../graphql/mutations'

const ProposalCard = ({ proposal, setClick = () => <></> }) => {
  const color = AppHelper.material.green400;
  const textColor = AppHelper.white;
  console.log(proposal);
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
    const getContracts = async () => {
      try {
        startProgress();
        const { data } = await apolloClient.query({
          query: GET_ALL_CONTRACTS,
          variables: {
            userId: user.id,
          }
        });

        if (data.getAllContracts) {
          setAllJobs(data.getAllContracts)
          dispatch({ type: SET_JOB, payload: data.getAllContracts });
        }
      } catch (error) {
        alert(error.message);
      } finally {
        stopProgress();
      }
    }
    getContracts();
  }, [])

  const [proposals, setProposals] = useState([]);

  const [selectedProposal, setSelectedProposal] = useState({ value: "Select Contract", label: "Select Contract" });

  const proposalRef = useRef();
  const { height } = useWindowDimensions();

  const handleSelectProposal = async (e) => {
    setSelectedProposal(e);

    try {
      startProgress();
      const { data } = await apolloClient.query({
        query: GET_ALL_BIDS,
        variables: {
          contractId: e.value,
        }
      });

      if (data.getAllBids) {
        setProposals(data.getAllBids);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      stopProgress();
    }
  }

  const [selectedJob, setSelectedJob] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    sellerId: "",
    buyerId: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  });
  const onProposalPress = (proposal) => {
    proposalRef.current.expand();
    setSelectedJob(proposal);
  }

  const handleAcceptProposal = async () => {
    try {
      startProgress();
      const { data } = await apolloClient.mutate({
        mutation: ACCEPT_BID,
        variables: {
          sellerId: selectedJob.sellerId,
          contractId: selectedJob.contractId,
        }
      });

      if (data.acceptBid) {
        alert("Bid accepted successfully.");
        proposalRef.current.close();
        navigation.replace(ScreenNavigator.Client)
      }

    } catch (error) {
      alert(error.message);
    } finally {
      stopProgress();
    }
  }

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
              onChange={handleSelectProposal}
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
                    <ProposalCard proposal={{ ...proposal, title: selectedProposal.label }} setClick={() => onProposalPress(proposal)} />
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
            <Text style={{ fontSize: 16, fontWeight: "semibold", marginTop: 15, }}>{selectedJob.description}</Text>
          </View>
          <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <TouchableOpacity onPress={handleAcceptProposal} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green500, padding: 10, borderRadius: 10, width: "48%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: AppHelper.white }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => proposalRef.current.close()} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.red500, padding: 10, borderRadius: 10, width: "48%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: AppHelper.white }}>Close</Text>
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