import AnimatedNumber from "react-native-animated-number";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { RootState } from "../state/store";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { incomeTick } from "../state/fundsSlice";

export default function ResourceBar() {
  const dollars = useSelector((state: RootState) => state.funds.dollars);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incomeTick());
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <View style={styles.resourceBar}>
      <Text></Text>
      <AnimatedNumber
        style={styles.text}
        formatter={(v) => `$${v}`}
        value={dollars}
        time={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resourceBar: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    color: Colors.secondary,
  },
});
