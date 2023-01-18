import { StyleSheet } from 'react-native';
import { AppHelper } from "../../../helper/AppHelper/AppHelper"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.lightWhite,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  wizard: {
    backgroundColor: AppHelper.material.white,
    borderBottomColor: AppHelper.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wizardStepContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  button: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    height: 40,
    backgroundColor: AppHelper.material.green500,
  },
});

export const userTypeStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardTextWhite: {
    fontWeight: 'bold',
    fontSize: 20,
    color: AppHelper.white,
  },
  cardClicked: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    height: 200,
    backgroundColor: AppHelper.material.green500,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  }
});

export const userPackagesStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '90%',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 20,
  },
  uploadPictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
  uploadPicture: {
    width: 110,
    height: 110,
    borderRadius: 10,
    borderColor: AppHelper.material.green200,
    borderWidth: 1.4,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    width: "100%",
    height: '37%',
  },
  defaultInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: AppHelper.material.green500,
  },
  listPackages: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '30%',
    borderColor: AppHelper.gray2,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  inputRow: {
    height: 70,
    justifyContent: 'space-between',
  }

});

export const userCategoriesStyles = StyleSheet.create({
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

});