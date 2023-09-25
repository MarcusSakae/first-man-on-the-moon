import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { View, Text } from "../../components/Themed";

const grassHeight = 200;

const AnimatedScrollView = Animated.createAnimatedComponent(Animated.ScrollView);

export default function GatherScreen() {
  let ref = useAnimatedRef<Animated.ScrollView>();
  const y = useSharedValue(0);
  
  useDerivedValue(() => {
    // console.log(y.value);
    scrollTo(ref, 0, y.value, false);
  });



  const grass = Array.from({ length: 100 }, (_, i) => {
    const greenStyle = [styles.green1, styles.green2, styles.green3][i % 3];
    return (
      <View style={{ ...styles.grass, ...greenStyle }} key={i} >
        <Text>{i}</Text>
      </View>
    );
  });

  const doScroll = () => {
    // console.log(ref);
    y.value = withTiming(1000, {
      duration: 1500,
      easing: Easing.linear,
    });
  };

  return (
    <View style={styles.container}>
      <AnimatedScrollView
        ref={ref}
        scrollEventThrottle={1}
        style={styles.scrollView}
      >
        {grass.map((item, i) => {
          return (
            <Animated.View
              key={i}
              style={[
                {
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              {item}
            </Animated.View>
          );
        })}
      </AnimatedScrollView>
      {/* {grass} */}
      <View style={{ flexGrow: 1, backgroundColor: "#333333" }} />
      <Button title="Scroll" onPress={() => doScroll()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "50%",
    backgroundColor: "#333333",
  },
  scrollView: {
    height: 0,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  grass: {
    width: "100%",
    height: grassHeight,
  },
  green1: {
    backgroundColor: "#33cc33",
  },
  green2: {
    backgroundColor: "#33aa33",
  },
  green3: {
    backgroundColor: "#339933",
  },
});
