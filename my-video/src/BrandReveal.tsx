import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Brand name animation
  const brandName = "LATUSO";
  const letterDelay = 6;

  // Tagline animation
  const taglineOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [50, 70], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Underline animation
  const underlineWidth = interpolate(frame, [60, 85], [0, 100], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Sun icon scale
  const iconScale = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const iconRotation = interpolate(frame, [0, 120], [0, 360], {
    extrapolateRight: "extend",
  });

  const sunRadius = 22;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #0a1628 0%, #0f1d35 40%, #1a2d50 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Small sun icon above brand */}
      <svg
        width={80}
        height={80}
        viewBox="0 0 80 80"
        style={{
          marginBottom: 10,
          transform: `scale(${iconScale})`,
        }}
      >
        <defs>
          <radialGradient id="miniSun">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#FF8C00" />
          </radialGradient>
        </defs>
        <circle cx={40} cy={40} r={sunRadius} fill="url(#miniSun)" />
        <g transform={`rotate(${iconRotation}, 40, 40)`}>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 360) / 8;
            const rad = (angle * Math.PI) / 180;
            const inner = sunRadius + 5;
            const outer = sunRadius + 14;
            return (
              <line
                key={i}
                x1={40 + inner * Math.cos(rad)}
                y1={40 + inner * Math.sin(rad)}
                x2={40 + outer * Math.cos(rad)}
                y2={40 + outer * Math.sin(rad)}
                stroke="#FFB347"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            );
          })}
        </g>
      </svg>

      {/* Brand name letters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
        {brandName.split("").map((letter, i) => {
          const start = i * letterDelay;
          const opacity = interpolate(frame, [start, start + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(frame, [start, start + 15], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.5)),
          });
          const scale = interpolate(frame, [start, start + 15], [0.5, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <span
              key={i}
              style={{
                fontSize: 100,
                fontWeight: 800,
                fontFamily: "Arial, Helvetica, sans-serif",
                color: "#FFFFFF",
                letterSpacing: 12,
                opacity,
                transform: `translateY(${y}px) scale(${scale})`,
                display: "inline-block",
                textShadow: "0 0 40px rgba(255,179,71,0.4)",
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* Underline accent */}
      <div
        style={{
          width: `${underlineWidth}%`,
          maxWidth: 350,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #FFB347, #FF8C00, #FFB347, transparent)",
          marginBottom: 16,
          borderRadius: 2,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          fontSize: 26,
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 300,
          color: "#C0C8D8",
          letterSpacing: 8,
          textTransform: "uppercase",
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        Solar Energy
      </div>
    </AbsoluteFill>
  );
};
