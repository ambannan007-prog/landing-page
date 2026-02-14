import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SunReveal } from "./SunReveal";
import { BrandReveal } from "./BrandReveal";
import { SolarPanels } from "./SolarPanels";
import { Closing } from "./Closing";

const FadeTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  frame: number;
  startFrame: number;
}> = ({ children, durationInFrames, frame, startFrame }) => {
  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const fadeOut = interpolate(
    frame,
    [startFrame + durationInFrames - 15, startFrame + durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
};

export const LatusoVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a1628" }}>
      {/* Scene 1: Sun Reveal (0-120 frames = 0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <FadeTransition
          durationInFrames={120}
          frame={frame}
          startFrame={0}
        >
          <SunReveal />
        </FadeTransition>
      </Sequence>

      {/* Scene 2: Brand Reveal (105-240 frames = 3.5-8s) */}
      <Sequence from={105} durationInFrames={135}>
        <FadeTransition
          durationInFrames={135}
          frame={frame}
          startFrame={105}
        >
          <BrandReveal />
        </FadeTransition>
      </Sequence>

      {/* Scene 3: Solar Panels (225-390 frames = 7.5-13s) */}
      <Sequence from={225} durationInFrames={165}>
        <FadeTransition
          durationInFrames={165}
          frame={frame}
          startFrame={225}
        >
          <SolarPanels />
        </FadeTransition>
      </Sequence>

      {/* Scene 4: Closing (375-480 frames = 12.5-16s) */}
      <Sequence from={375} durationInFrames={105}>
        <FadeTransition
          durationInFrames={105}
          frame={frame}
          startFrame={375}
        >
          <Closing />
        </FadeTransition>
      </Sequence>
    </AbsoluteFill>
  );
};
