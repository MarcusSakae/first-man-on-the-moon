import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";
// import vector icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "./Themed";
import { Pressable } from "react-native";

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props: BaseToastProps) => (
    <Pressable
      {...props}
      style={{
        borderColor: Colors.primary,
        borderWidth: 1,
        backgroundColor: Colors.secondaryLight,
        justifyContent: "center",
        padding: 10,
        flexDirection: "row",
      }}
      onPress={props.onPress}
    >
      <FontAwesome5 name="trophy" size={24} color="gold" />
      <Text
        style={{
          fontSize: 16,
          color: "#fff",
          fontWeight: "400",
          marginLeft: 10,
        }}
      >
        You have unlocked&nbsp;
        <Text style={{ color: Colors.primary }}>{props.text1}</Text>!
      </Text>
    </Pressable>
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};
