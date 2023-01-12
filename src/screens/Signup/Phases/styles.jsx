import { StyleSheet } from 'react-native';
import { AppHelper } from "../../../helper/AppHelper/AppHelper"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  wizard: {
    backgroundColor: AppHelper.material.green50,
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
})

export const userPortfolioStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  pictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
})