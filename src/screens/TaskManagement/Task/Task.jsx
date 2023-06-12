import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, TextInput } from 'react-native'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { AppHelper, convertDateToDayMonthYear, Icon, Icons, pickImageOrVideo, ScreenNavigator } from '../../../helper'
import Animated, { useAnimatedStyle, withSpring, useSharedValue, set } from 'react-native-reanimated'
import { BottomSheet, Loader } from '../../../components'
import { Modal, Portal, Provider } from 'react-native-paper'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useApollo } from '../../../graphql/apollo'
import { GET_TASKS } from '../../../graphql/queries'
import { DateTimePicker, Picker } from 'react-native-ui-lib'
import { CREATE_TASK, UPDATE_TASK_STATUS } from '../../../graphql/mutations'
import { useSelector } from 'react-redux'

const Banner = ({ navigation, name }) => {
  return (
    <View style={{ height: 50, backgroundColor: AppHelper.material.green500 }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, height: "100%" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{name}</Text>
        {/* <TouchableOpacity activeOpacity={0.8}>
          <Icon name={"plus"} type={Icons.AntDesign} size={18} color="white" />
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const TaskCard = ({ data, value, setClick, showModal }) => {
  const color = AppHelper.material.faintWhite
  return (
    <View style={{ display: "flex", flexDirection: "column", backgroundColor: color, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 10, marginHorizontal: 15, marginVertical: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{value}</Text>

      <ScrollView style={{ flex: 1, marginVertical: 15 }}>
        {data.map((item, index) => (
          <TouchableOpacity activeOpacity={0.8} key={index} style={[styles.shadowEffect, { display: "flex", padding: 10, margin: 5, backgroundColor: "white", borderRadius: 4 }]} onPress={() => setClick(item)}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: AppHelper.material.grey900, marginLeft: 4 }}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={showModal} activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const InformationBottomSheet = forwardRef(({ navigation, setClick, showModal, task, changeStatus }, ref) => {
  const { height } = useWindowDimensions();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <BottomSheet ref={ref} activeHeight={height * 0.8} backgroundColor={AppHelper.material.lightGreen50} backDropColor={AppHelper.material.green500} useGestureHandler={false} setClick={setClick}>
      <SafeAreaView style={{ justifyContent: "space-between", height: height * 0.7 }}>
        <View style={{ display: "flex", flexDirection: "column", backgroundColor: AppHelper.material.lightGreen50, paddingHorizontal: 10, paddingBottom: 15, borderRadius: 10, marginHorizontal: 15, marginVertical: 20, justifyContent: "space-between" }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Icon name={"description"} type={Icons.MaterialIcons} size={20} color={AppHelper.material.grey900} />
            <Text style={{ fontSize: 22, fontWeight: "bold", color: AppHelper.material.grey900, marginLeft: 10 }}>Description</Text>
            {/* <TouchableOpacity activeOpacity={0.8} onPress={() => setIsEdit(true)} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
              <Icon name={"edit"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Edit</Text>
            </TouchableOpacity> */}
          </View>
          <View style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Icon name={"user"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 4 }}>Created by: <Text style={{ fontWeight: "400" }}>Admin</Text></Text>
              </View>

              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                <Icon name={"calendar"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 4 }}>Deadline: <Text style={{ fontWeight: "400" }}>{convertDateToDayMonthYear(task?.deadline)}</Text></Text>
              </View>
            </View>
          </View>
          {isEdit ? (
            <View style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <TextInput multiline={true} numberOfLines={4} style={styles.textInput} value={task?.description} onChangeText={(text) => setDescription(text)} />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setIsEdit(false)} style={styles.cancelButton}>
                  <Icon name={"close"} type={Icons.AntDesign} size={16} color={AppHelper.material.white} />
                  <Text style={{ fontSize: 14, fontWeight: "800", color: AppHelper.material.white, marginLeft: 4 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setIsEdit(false)} style={styles.saveButton}>
                  <Icon name={"check"} type={Icons.AntDesign} size={16} color={AppHelper.material.white} />
                  <Text style={{ fontSize: 14, fontWeight: "800", color: AppHelper.material.white, marginLeft: 4 }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ height: 200, marginVertical: 10 }}>
              <ScrollView>
                <Text style={styles.textInput}>{task?.description}</Text>
              </ScrollView>
            </View>
          )}
          {/* <View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
              <Icon name={"attach-file"} type={Icons.MaterialIcons} size={16} color={AppHelper.material.grey900} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 4 }}>
                Attachments:
                <Text style={{ fontWeight: "400" }}> 2</Text>
              </Text>

              <TouchableOpacity activeOpacity={0.8} onPress={showModal} style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto" }}>
                <Icon name={"eye"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>View</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => changeStatus(task)} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", height: 50, backgroundColor: AppHelper.material.green500 }}>
          <Icon name={"check"} type={Icons.AntDesign} size={16} color={AppHelper.material.white} />
          <Text style={{ fontSize: 14, fontWeight: "800", color: AppHelper.material.white, marginLeft: 4 }}>Change to {task?.status === "OPEN" ? "In Progress" : task?.status === "INPROGRESS" ? "Complete" : "To Do"}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </BottomSheet>
  )
})

export const Task = ({ navigation, route }) => {
  const offset = useSharedValue(1);
  const taskRef = useRef();

  const [click, setClick] = useState(false);

  const [isAttachmentsModalVisible, setIsAttachmentsModalVisible] = useState(false);
  const [isAddSubTaskModalVisible, setIsAddSubTaskModalVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showAttachmentModal = () => setIsAttachmentsModalVisible(true);
  const hideAttachmentModal = () => setIsAttachmentsModalVisible(false);

  const showAddSubTaskModal = () => setIsAddSubTaskModalVisible(true);
  const hideAddSubTaskModal = () => setIsAddSubTaskModalVisible(false);

  const taskOpen = () => taskRef.current.expand();
  const taskClose = () => taskRef.current.close();

  useEffect(() => {
    if (click) taskOpen();
    else taskClose();
  }, [click]);


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(offset.value) }]
    }
  });

  const data = [
    { id: 1, value: "Error Arguments" },
    { id: 2, value: "Implement Fast Searching on Every Page" },
    { id: 3, value: "Make UI Transitions Smoother" },
    { id: 4, value: "Save Application Settings" },
    { id: 5, value: "Eliminate All Modified Models" },
    { id: 6, value: "Project Portability" },
  ]

  const pickImage = async () => {
    try {
      setIsLoaded(true);
      const uri = await pickImageOrVideo();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(false);
    }
  }

  // -------------------------------------
  const { board } = route.params

  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();
  const user = useSelector(state => state.user);

  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [createTask, setCreateTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: { name: "", code: "" },
  });


  useEffect(() => {
    const getTasks = async () => {
      try {
        startProgress();
        const { data } = await apolloClient.query({
          query: GET_TASKS,
          variables: {
            boardId: board.id
          }
        });

        if (data.getTasks) {
          console.log(data.getTasks);
          if (data.getTasks.length > 0) {
            const todo = data.getTasks.filter(task => task.status === "OPEN");
            const inProgress = data.getTasks.filter(task => task.status === "INPROGRESS");
            const completed = data.getTasks.filter(task => task.status === "COMPLETED");

            setTodo(todo);
            setInProgress(inProgress);
            setCompleted(completed);
          }
        }
      } catch (error) {
        alert(error.message);
      } finally {
        stopProgress();
      }
    }

    getTasks();
  }, []);

  const handleSelectedTask = (task) => {
    setSelectedTask(task);
    setClick(true);
  }

  const handleCreateTask = async () => {
    if (createTask.title === "") return alert("Title is required");
    if (createTask.description === "") return alert("Description is required");
    if (createTask.deadline === "") return alert("Deadline is required");
    // if (createTask.status.code === "") return alert("Status is required");
    try {
      startProgress();
      const { data } = await apolloClient.mutate({
        mutation: CREATE_TASK,
        variables: {
          data: JSON.stringify({
            boardId: board.id,
            title: createTask.title,
            description: createTask.description,
            deadline: createTask.deadline,
            // status: createTask.status.code,
            userId: user.id,
          }),
        }
      });

      if (data.createTask) {
        if (data.createTask.status === "OPEN") {
          setTodo([...todo, data.createTask]);
        } else if (data.createTask.status === "INPROGRESS") {
          setInProgress([...inProgress, data.createTask]);
        } else {
          setCompleted([...completed, data.createTask]);
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      stopProgress();
    }
  }


  const handleChangeStatus = async (task) => {
    try {
      startProgress();
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_TASK_STATUS,
        variables: {
          id: task.id,
          status: task.status === "OPEN" ? "INPROGRESS" : task.status === "INPROGRESS" ? "COMPLETED" : "OPEN",
        }
      });

      if (data.updateTaskStatus) {
        console.log(data.updateTaskStatus);
        if (data.updateTaskStatus.status === "OPEN") {
          setCompleted(completed.filter(item => item.id !== task.id));
          setTodo([...todo, data.updateTaskStatus]);
        } else if (data.updateTaskStatus.status === "INPROGRESS") {
          setTodo(todo.filter(item => item.id !== task.id));
          setInProgress([...inProgress, data.updateTaskStatus]);
        } else {
          setInProgress(inProgress.filter(item => item.id !== task.id));
          setCompleted([...completed, data.updateTaskStatus]);
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      stopProgress();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Banner navigation={navigation} name={board.name} />
      <Loader visible={isLoaded} />

      <Provider>
        <Portal>
          <Modal visible={isAttachmentsModalVisible} onDismiss={hideAttachmentModal} contentContainerStyle={{ backgroundColor: "white", margin: 40, borderRadius: 20, padding: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: AppHelper.material.grey900 }}>Attachments</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={hideAttachmentModal} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Icon name={"close"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", marginVertical: 10, marginTop: 30 }}>
              <Icon name={"file-picture-o"} type={Icons.FontAwesome} size={16} color={AppHelper.material.grey900} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10 }}>
                Sample
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", marginVertical: 10 }}>
              <Icon name={"video-camera"} type={Icons.FontAwesome} size={16} color={AppHelper.material.grey900} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10 }}>
                Sample
              </Text>
            </TouchableOpacity>
            {/* Create TouchableOpacity to add */}
            <TouchableOpacity activeOpacity={0.9} onPress={pickImage} style={{ display: "flex", flexDirection: "row", marginVertical: 10, alignItems: "flex-end", width: "100%" }}>
              <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
              <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 10 }}>
                Add
              </Text>
            </TouchableOpacity>

          </Modal>

          <Modal visible={isAddSubTaskModalVisible} onDismiss={hideAddSubTaskModal} contentContainerStyle={{ backgroundColor: "white", margin: 40, borderRadius: 20, padding: 20 }}>
            <SafeAreaView style={{ display: "flex", flexDirection: "column" }}>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: AppHelper.material.grey900 }}>Add Sub Task</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={hideAddSubTaskModal} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Icon name={"close"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
                </TouchableOpacity>
              </View>
              <View style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                  <Icon name={"file-text"} type={Icons.FontAwesome} size={16} color={AppHelper.material.grey900} />
                  <TextInput value={createTask.title} onChangeText={(e) => setCreateTask({ ...createTask, title: e })} style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, width: "90%", borderRadius: 5, paddingHorizontal: 10 }} placeholder={"Task Name"} />
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                  <Icon name={"file-text"} type={Icons.FontAwesome} size={16} color={AppHelper.material.grey900} />
                  <TextInput multiline={true} value={createTask.description} onChangeText={(e) => setCreateTask({ ...createTask, description: e })} style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, width: "90%", borderRadius: 5, paddingHorizontal: 10 }} placeholder={"Task Description"} />
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                  <Icon name={"calendar"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
                  <DateTimePicker mode={'date'} value={createTask.deadline} dateFormat="DD-MMM-YYYY" onChange={(e) => setCreateTask({ ...createTask, deadline: e })} style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10, borderWidth: 1, borderColor: AppHelper.material.grey300, width: "90%", borderRadius: 5, paddingHorizontal: 10 }} placeholder={"Deadline"} />
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.8} onPress={hideAddSubTaskModal} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Icon name={"close"} type={Icons.AntDesign} size={16} color={AppHelper.material.grey900} />
                  <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.grey900, marginLeft: 10 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={handleCreateTask} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Icon name={"check"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
                  <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 10 }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
        </Portal>
        <Animated.View style={[animatedStyle, { flex: 1 }]}>
          <ScrollView horizontal>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TaskCard value={"To Do"} data={todo} setClick={handleSelectedTask} showModal={showAddSubTaskModal} />
              <TaskCard value={"In Progress"} data={inProgress} setClick={handleSelectedTask} showModal={showAddSubTaskModal} />
              <TaskCard value={"Completed"} data={completed} setClick={handleSelectedTask} showModal={showAddSubTaskModal} />
            </View>
          </ScrollView>
        </Animated.View>
        <InformationBottomSheet ref={taskRef} task={selectedTask} navigation={navigation} changeStatus={handleChangeStatus} setClick={setClick} showModal={showAttachmentModal} />
      </Provider>
      {/* <CameraComponent /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    fontSize: 14,
    fontWeight: "400",
    maxHeight: 200,
    color: AppHelper.material.grey900,
    marginTop: 10,
    padding: 10,
    backgroundColor: AppHelper.material.green50,
    borderRadius: 10,
    borderColor: AppHelper.material.grey300,
    borderWidth: 1,
  },
  cancelButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: AppHelper.material.red400,
    borderRadius: 10,
    marginRight: 10,
    width: "50%",
    justifyContent: "center",
  },
  saveButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: AppHelper.material.green700,
    borderRadius: 10,
    width: "50%",
    justifyContent: "center",
  }
})