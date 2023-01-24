import { StyleSheet } from "react-native";
import { AppHelper } from '../../../helper'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.lightWhite,
    padding: 10,
  },
  searchContainer: {
    backgroundColor: AppHelper.material.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: AppHelper.material.greenA400,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: AppHelper.material.white,
    // padding: 10,
    marginTop: 10,
    height: '100%',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '45%',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: AppHelper.material.greenA400,
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  textColor: {
    color: AppHelper.material.darkWhite,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    // borderColor: AppHelper.material.greenA400,
    // borderWidth: 1,
    height: '100%'
  },
  
});