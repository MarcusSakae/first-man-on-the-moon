import LottieView from "lottie-react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Button, StyleSheet } from "react-native";
import Animated, {
  Easing,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { View } from "../../components/Themed";

const AnimatedScrollView = Animated.createAnimatedComponent(
  Animated.ScrollView
);
const tileHight = 200;
const DRONE_SPEED = 0.2;

export default function GatherScreen() {
  let ref = useAnimatedRef<Animated.ScrollView>();
  const isScrolling = useSharedValue(false);
  const targetY = useSharedValue(0);
  const y = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(ref, 0, y.value, false);
  }, [y.value]);

  const greenStyles = [
    {
      backgroundColor: "#99dd99",
      transform: [{ rotate: "3deg" }, { scale: 1.2 }],
    },
    {
      backgroundColor: "#77cc77",
      transform: [{ rotate: "-2deg" }, { scale: 1.2 }],
    },
    {
      backgroundColor: "#66bb66",
      transform: [{ rotate: "1deg" }, { scale: 1.2 }],
    },
  ];

  const tiles = Array.from({ length: 100 }, (_, i) => {
    return <View style={[styles.tiles, greenStyles[i % 3]]} key={i} />;
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    if (isScrolling.value) return;
    y.value = event.contentOffset.y;
  });

  const playScrollAnimation = useCallback(() => {
    targetY.value = 1000;
    let distance = Math.abs(targetY.value - y.value);
    isScrolling.value = true;
    let duration = distance / DRONE_SPEED;
    y.value = 0;
    y.value = withTiming(targetY.value, {
      duration,
      easing: Easing.linear,
    });
    setTimeout(() => {
      isScrolling.value = false;
    }, duration);
  }, []);

  useEffect(() => {
    y.value = 0;
    y.value = withTiming(1000, {
      duration: 1500,
      easing: Easing.linear,
    });
  }, []);

  const doScroll = () => {
    playScrollAnimation();
  };

  return (
    <View style={styles.container}>
      <AnimatedScrollView
        ref={ref}
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        style={styles.scrollView}
      >
        {tiles.map((item, i) => {
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
      {/* {tiles} */}
      <View style={{ flexGrow: 1, backgroundColor: "#333333" }} />
      <Button title="Scroll" onPress={() => doScroll()} />
      <View style={styles.droneView}>
        <LottieView
          autoPlay={true}
          loop={true}
          useNativeLooping={true}
          onAnimationLoop={() => console.log("loop")}
          style={styles.drone}
          source={require("../../assets/lottie/rocket.json")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "50%",
    backgroundColor: "#333333",
    position: "relative",
  },
  scrollView: {
    height: 0,
  },
  tiles: {
    width: "100%",
    height: tileHight,
  },
  droneView: {
    width: "100%",
    height: 100,
    position: "absolute",
    backgroundColor: "transparent",
    top: 100,
    left: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  drone: {
    width: 300,
  },
});
