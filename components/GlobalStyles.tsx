import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.secondary,
    padding: 10,
    paddingBottom: 0,
    height: "100%",
    width: "100%",
    alignItems: "stretch",
  },
  partialContainer: {
    backgroundColor: Colors.secondary,
    padding: 10,
  },
  title: {
    color: Colors.primary,
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    textAlign: "right",
    marginVertical: 5,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryDark,
    borderTopWidth: 1,
    borderTopColor: Colors.primaryDark,
    paddingVertical: 5,
    width: "100%",
    right: 0,
  },
});
