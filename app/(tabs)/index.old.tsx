import React from "react";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Dimensions } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { connect } from "react-redux";

function IndexScreen(args: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GLView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 125, // 125 is the height of the tab bar
        }}
        onContextCreate={onContextCreate}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          height: "100%",
          backgroundColor: "#ffffff33",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 100,
          right: 60,
          width: 60,
          paddingVertical: 5,
          paddingHorizontal: 10,
          height: 30,
          backgroundColor: "#ffffff11",
        }}
      >
        <Text style={{ color: Colors.dark.text }}>{args.height}m</Text>
      </View>
    </View>
  );
}

function onContextCreate(gl: ExpoWebGLRenderingContext) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0.2, 0.2, 0.2, 1);

  // Create vertex shader (shape & position)
  const vert = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(
    vert,
    `
    void main(void) {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 100.0;
    }
  `
  );
  gl.compileShader(vert);

  // Create fragment shader (color)
  const frag = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(
    frag,
    `
    void main(void) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  `
  );
  gl.compileShader(frag);

  // Link together into a program
  const program = gl.createProgram()!;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);

  gl.flush();
  gl.endFrameEXP();
}

const mapStateToProps = (state: any) => {
  return { height: state.some.height, speed: state.some.speed };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setHeight: (height: number) =>
      dispatch({ type: "height/set", payload: height }),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);
