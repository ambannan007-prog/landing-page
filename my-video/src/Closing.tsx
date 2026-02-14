import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export const Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Brand name fade in
  const brandOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const brandScale = interpolate(frame, [0, 25], [0.9, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // CTA fade in
  const ctaOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [25, 45], [20, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Pulsing glow
  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  // Website text
  const webOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background particles
  const particleCount = 30;

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #0a1628 0%, #0f1d35 50%, #1a2d50 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Floating particles */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {Array.from({ length: particleCount }).map((_, i) => {
          const seed = i * 137.508;
          const x = ((seed * 7.3) % width);
          const baseY = ((seed * 3.7) % height);
          const y = baseY - (frame * (0.3 + (i % 5) * 0.15)) % height;
          const adjustedY = y < 0 ? y + height : y;
          const size = 1 + (i % 3);
          const opacity = 0.1 + (i % 5) * 0.06;
          return (
            <circle
              key={i}
              cx={x}
              cy={adjustedY}
              r={size}
              fill="#FFB347"
              opacity={opacity}
            />
          );
        })}
      </svg>

      {/* Main brand */}
      <div
        style={{
          opacity: brandOpacity,
          transform: `scale(${brandScale})`,
          textAlign: "center",
        }}
      >
        {/* Sun icon */}
        <svg
          width={60}
          height={60}
          viewBox="0 0 60 60"
          style={{ marginBottom: 12 }}
        >
          <defs>
            <radialGradient id="closingSun">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="100%" stopColor="#FF8C00" />
            </radialGradient>
          </defs>
          <circle cx={30} cy={30} r={16} fill="url(#closingSun)" />
          <g opacity={pulse}>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={30 + 20 * Math.cos(rad)}
                  y1={30 + 20 * Math.sin(rad)}
                  x2={30 + 27 * Math.cos(rad)}
                  y2={30 + 27 * Math.sin(rad)}
                  stroke="#FFB347"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        </svg>

        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#FFFFFF",
            letterSpacing: 10,
            textShadow: `0 0 ${40 * pulse}px rgba(255,179,71,0.4)`,
          }}
        >
          LATUSO
        </div>

        {/* Underline */}
        <div
          style={{
            width: 200,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #FFB347, transparent)",
            margin: "8px auto",
          }}
        />

        <div
          style={{
            fontSize: 18,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#8899AA",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Solar Energy
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 50,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 600,
            color: "#FFB347",
            marginBottom: 12,
          }}
        >
          Harness the Power of the Sun
        </div>
      </div>

      {/* Website */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: webOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#5A6A7A",
            letterSpacing: 4,
          }}
        >
          www.latuso.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
