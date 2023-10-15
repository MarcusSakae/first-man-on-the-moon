import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer, loadObjAsync } from "expo-three";
import { useEffect, useState } from "react";
import {
  AmbientLight,
  Color,
  Fog,
  GridHelper,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
} from "three";
import { DrawerButton } from "../../components/DrawerButton";
import { HeightIndicator } from "../../components/HeightIndicator";
import { HeightRuler } from "../../components/HeightRuler";
import * as Haptics from "expo-haptics";
import { gsap } from "gsap";
import CustomEase from "gsap/CustomEase";
import { View } from "../../components/Themed";
import GlobalStyles from "../../components/GlobalStyles";
gsap.registerPlugin(CustomEase);

let model = { position: { y: 0 } };
let sceneColor = new Color(0, 0, 0);
export default function HomeScreen() {
  let [altitude, setAltitude] = useState(0);
  const launch = () => {
    model.position.y = 0;
    gsap.to(model.position, {
      duration: 100,
      y: model.position.y + 10000,
      ease: "sine.in",
    });

    let launchInterval = setInterval(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 50);
    setTimeout(() => {
      clearInterval(launchInterval);
    }, 3000);
  };

  // Clear the animation loop when the component unmounts
  let requestAnimationTimeout: number;
  useEffect(() => {
    return () => clearTimeout(requestAnimationTimeout);
  }, []);

  let rocket: any;
  let camera: PerspectiveCamera;
  let delta: number;

  async function onContextCreate(gl: ExpoWebGLRenderingContext) {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    sceneColor = new Color(0, 0, 0);

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 5, 5);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(100, 100, 0x00000, 0x00ff00));

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, -500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    rocket = await loadObjAsync({
      asset: require("../../assets/models/rocketobj.obj"),
      mtlAsset: require("../../assets/models/rocketmtl.mtl"),
    });

    rocket.scale.set(1, 1, 1);
    model = rocket;

    scene.add(rocket);

    camera.lookAt(rocket.position);
    delta = camera.position.y - rocket.position.y;
    let time = 0;

    function update() {
      if (rocket.position.y < 10) {
        time += 0.01;
        camera.position.x = 5 * Math.cos(time);
        camera.position.z = 5 * Math.sin(time);
        camera.lookAt(rocket.position);
      }
      camera.position.y = rocket.position.y + delta;
      setAltitude(rocket.position.y);
    }

    // Setup an animation loop
    const render = () => {
      requestAnimationTimeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  }

  return (
    <>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />

      <HeightRuler />
      <HeightIndicator altitude={altitude} />
      <View style={[GlobalStyles.navContainer]}>
        <DrawerButton isActive={false} text="launch" onPress={launch} />
      </View>
    </>
  );
}
