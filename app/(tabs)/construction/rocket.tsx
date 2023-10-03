import { useState } from "react";
import RocketComposer from "../../../components/RocketComposer";
import RocketStatus from "../../../components/RocketStatus";
import { Text } from "../../../components/Themed";

enum RocketState {
  Planning,
  Building,
  ReadyForLaunch,
}

export default function RocketScreen() {
  const [state, setState] = useState(RocketState.Planning);

  if (state === RocketState.ReadyForLaunch)
    return <Text>Ready for launch, proceed to Home-screen</Text>;

  if (state === RocketState.Planning)
    return <RocketComposer onCommit={() => setState(RocketState.Building)} />;

  if (state === RocketState.Building) {
    return <RocketStatus onCancel={() => setState(RocketState.Planning)} />;
  }
}
