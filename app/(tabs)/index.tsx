import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { runOnUI, useSharedValue } from "react-native-reanimated";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { createWorkletContextManager } from "expo-gl/src/GLWorkletContextManager";
import { Dimensions } from "react-native";
import { HeightRuler } from "../../components/HeightRuler";
import { HeightIndicator } from "../../components/HeightIndicator";
import { useDispatch, useSelector } from "react-redux";

const getWorkletContext = createWorkletContextManager().getContext;

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export default function IndexScreen() {
  const dispatch = useDispatch();
  const { height } = useSelector((state: any) => state.some);
  const shared = {
    time: useSharedValue(0),
  };

  function render(gl: ExpoWebGLRenderingContext) {
    "worklet";    
    shared.time.value += 0.001;
    gl.clearColor(0, 0, Math.sin((shared.time.value % 1) * Math.PI * 2), 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.flush();
    gl.flushEXP();
    gl.endFrameEXP();
    requestAnimationFrame(() => render(gl));
  }

  function onContextCreate(gl: ExpoWebGLRenderingContext) {
    runOnUI((contextId: number) => {
      "worklet";

      const gl = getWorkletContext(contextId)!;
      render(gl);
    })(gl.contextId);
  }

 

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GLView
        style={{ width: windowWidth, height: windowHeight - 300 }}
        enableExperimentalWorkletSupport
        onContextCreate={onContextCreate}
      />
      <HeightRuler />
      <HeightIndicator height={height} />
      {/* <Text style={{color:"#ffffff"}}> {shared.time.value % 1}</Text> */}
    </View>
  );
}

