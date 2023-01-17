import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    // height: "50%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  picture: {
    width: 100,
    height: 100,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",

    // justifyContent: "space-between",
    height: "100%",
    width: "100%",
    paddingHorizontal: 10,
  },
  firstRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",

  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  bold: {
    fontWeight: "bold",
  },
  description: {
    // maxWidth: "10%",
    width: "60%",
    // handle text overflow
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  }
});