import { ImageSourcePropType } from "react-native";
const ASSET_PATH = "../assets/images";

export default {
  house: require(`${ASSET_PATH}/isometric-house.png`),
  rocketlaunchpad: require(`${ASSET_PATH}/launchpad.png`),
  excavator: require(`${ASSET_PATH}/excavate.png`),

  // Main navigation
  homeIcon: require(`${ASSET_PATH}/home.png`),
  hammerIcon: require(`${ASSET_PATH}/hammer.png`),
  astrosIcon: require(`${ASSET_PATH}/astronaut2.png`),
  economyIcon: require(`${ASSET_PATH}/economy1.png`),

  // Drawer buttons
  rocketButton: require(`${ASSET_PATH}/rocket.png`),
  buildingsButton: require(`${ASSET_PATH}/buildings.png`),
  forhireButton: require(`${ASSET_PATH}/forhire.png`),
  rosterButton: require(`${ASSET_PATH}/roster.png`),
  launchButton: require(`${ASSET_PATH}/redbutton.png`),

  // Rockets
  blueprint: require(`${ASSET_PATH}/blueprint.png`),
  copper: require(`${ASSET_PATH}/rocket-copper.png`),
  crystal: require(`${ASSET_PATH}/rocket-crystal.png`),
  glass: require(`${ASSET_PATH}/rocket-glass.png`),
  iron: require(`${ASSET_PATH}/rocket-iron.png`),
  sand: require(`${ASSET_PATH}/rocket-sand.png`),
  silver: require(`${ASSET_PATH}/rocket-silver.png`),
  steel: require(`${ASSET_PATH}/rocket-steel.png`),
  stone: require(`${ASSET_PATH}/rocket-stone.png`),
  wood: require(`${ASSET_PATH}/rocket-wood.png`),
} as Record<string, ImageSourcePropType>;
