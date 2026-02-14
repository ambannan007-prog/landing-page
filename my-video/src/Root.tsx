import { Composition } from "remotion";
import { LatusoVideo } from "./LatusoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LatusoSolarEnergy"
        component={LatusoVideo}
        durationInFrames={480}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
