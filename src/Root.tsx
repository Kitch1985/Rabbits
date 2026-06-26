import { Composition } from "remotion";
import { RabbitsVideo } from "./RabbitsVideo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={RabbitsVideo}
        durationInFrames={180}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{
          title: "Rabbits",
          subtitle: "A Remotion Video",
        }}
      />
    </>
  );
};
