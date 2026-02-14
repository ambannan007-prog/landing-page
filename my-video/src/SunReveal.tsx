import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export const SunReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const sunScale = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const sunY = interpolate(frame, [0, 50], [height * 0.3, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowOpacity = interpolate(frame, [20, 50], [0, 0.6], {
    extrapolateRight: "clamp",
  });

  const rayCount = 12;
  const rayRotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: "extend",
  });

  const rayOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  const rayLength = interpolate(frame, [15, 50], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const horizonOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const cx = width / 2;
  const cy = height / 2 + sunY;
  const sunRadius = 90;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #1a2d50 50%, #0f1d35 100%)",
      }}
    >
      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,170,50,0.3) 0%, transparent 70%)",
          opacity: horizonOpacity,
        }}
      />

      <svg width={width} height={height} style={{ position: "absolute" }}>
        {/* Outer glow */}
        <defs>
          <radialGradient id="sunGlow">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow circle */}
        <circle
          cx={cx}
          cy={cy}
          r={sunRadius * 3}
          fill="url(#sunGlow)"
          opacity={glowOpacity * sunScale}
        />

        {/* Sun rays */}
        <g
          transform={`rotate(${rayRotation}, ${cx}, ${cy})`}
          opacity={rayOpacity}
        >
          {Array.from({ length: rayCount }).map((_, i) => {
            const angle = (i * 360) / rayCount;
            const innerR = sunRadius + 20;
            const outerR = sunRadius + 20 + 80 * rayLength;
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={cx + innerR * Math.cos(rad)}
                y1={cy + innerR * Math.sin(rad)}
                x2={cx + outerR * Math.cos(rad)}
                y2={cy + outerR * Math.sin(rad)}
                stroke="#FFB347"
                strokeWidth={3}
                strokeLinecap="round"
                opacity={0.7}
              />
            );
          })}
        </g>

        {/* Sun circle */}
        <circle
          cx={cx}
          cy={cy}
          r={sunRadius * sunScale}
          fill="url(#sunGradient)"
        />
        <defs>
          <radialGradient id="sunGradient">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="60%" stopColor="#FFB347" />
            <stop offset="100%" stopColor="#FF8C00" />
          </radialGradient>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};
