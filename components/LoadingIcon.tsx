import { FontAwesome5 } from "@expo/vector-icons";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Colors from "../constants/Colors";
import { useAppSelector } from "../state/store";
import { Text, View } from "./Themed";

export default function LoadingIcon() {
  const isLoading = useAppSelector((state) => state.loading.api);
  const loadingRotation = useSharedValue(0);
  loadingRotation.value = withRepeat(withTiming(360, { duration: 3000, easing: Easing.linear }), -1, false);
  const loadingStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${loadingRotation.value}deg` }],
  }));

  return (
    <View style={{ flexDirection: "row" }}>
      {isLoading && (
        <>
          <Animated.View style={loadingStyle}>
            <FontAwesome5 name="asterisk" size={16} color={Colors.secondary} />
          </Animated.View>
          <Text style={{ marginLeft: 5 }}>API...</Text>
        </>
      )}
    </View>
  );
}
