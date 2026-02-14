import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

const SolarPanel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  frame: number;
}> = ({ x, y, w, h, delay, frame }) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [delay, delay + 15], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const shimmer = interpolate(
    frame,
    [delay + 20, delay + 50],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const rows = 3;
  const cols = 4;
  const gap = 3;
  const cellW = (w - gap * (cols + 1)) / cols;
  const cellH = (h - gap * (rows + 1)) / rows;

  return (
    <g
      opacity={opacity}
      transform={`translate(${x + w / 2}, ${y + h / 2}) scale(${scale}) translate(${-(x + w / 2)}, ${-(y + h / 2)})`}
    >
      {/* Panel frame */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill="#1a2a44"
        stroke="#2a4a6a"
        strokeWidth={2}
      />
      {/* Solar cells */}
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const cx = x + gap + col * (cellW + gap);
        const cy = y + gap + row * (cellH + gap);
        const cellShimmer = interpolate(
          shimmer,
          [col / cols, Math.min(1, col / cols + 0.3)],
          [0, 0.3],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <rect
            key={i}
            x={cx}
            y={cy}
            width={cellW}
            height={cellH}
            rx={1}
            fill={`rgba(30, 80, 160, ${0.7 + cellShimmer})`}
            stroke="#2a5a9a"
            strokeWidth={0.5}
          />
        );
      })}
      {/* Shine reflection */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill="url(#panelShine)"
        opacity={0.2 * shimmer}
      />
    </g>
  );
};

const EnergyParticle: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  frame: number;
  duration: number;
}> = ({ startX, startY, endX, endY, delay, frame, duration }) => {
  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    progress,
    [0, 0.1, 0.8, 1],
    [0, 1, 1, 0],
  );

  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);

  return (
    <circle cx={x} cy={y} r={3} fill="#FFE066" opacity={opacity}>
      <animate
        attributeName="r"
        values="2;4;2"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </circle>
  );
};

export const SolarPanels: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Stats animation
  const statsOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  const powerValue = Math.round(
    interpolate(frame, [60, 110], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #0a1628 0%, #0f1d35 50%, #1a2d50 100%)",
      }}
    >
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="panelShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Solar panels row */}
        <SolarPanel x={180} y={280} w={160} h={110} delay={0} frame={frame} />
        <SolarPanel x={370} y={260} w={160} h={110} delay={8} frame={frame} />
        <SolarPanel x={560} y={240} w={160} h={110} delay={16} frame={frame} />
        <SolarPanel x={750} y={260} w={160} h={110} delay={24} frame={frame} />
        <SolarPanel x={940} y={280} w={160} h={110} delay={32} frame={frame} />

        {/* Energy particles flowing upward */}
        {Array.from({ length: 12 }).map((_, i) => {
          const panelIdx = i % 5;
          const panelX = [260, 450, 640, 830, 1020][panelIdx];
          const panelY = [280, 260, 240, 260, 280][panelIdx];
          return (
            <EnergyParticle
              key={i}
              startX={panelX}
              startY={panelY}
              endX={panelX + (Math.random() - 0.5) * 60}
              endY={panelY - 120 - Math.random() * 60}
              delay={40 + i * 5}
              frame={frame}
              duration={30}
            />
          );
        })}
      </svg>

      {/* Title text */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#FFFFFF",
            opacity: interpolate(frame, [5, 25], [0, 1], {
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [5, 25], [20, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
          }}
        >
          Powering Tomorrow
        </div>
        <div
          style={{
            fontSize: 20,
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#8899AA",
            marginTop: 8,
            letterSpacing: 4,
            opacity: interpolate(frame, [15, 35], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          CLEAN & SUSTAINABLE ENERGY
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
          opacity: statsOpacity,
        }}
      >
        {[
          { label: "Efficiency", value: `${powerValue}%`, color: "#FFB347" },
          { label: "Clean Power", value: `${powerValue}kW`, color: "#4FC3F7" },
          { label: "CO₂ Saved", value: `${powerValue}t`, color: "#81C784" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: stat.color,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "#8899AA",
                letterSpacing: 2,
                marginTop: 4,
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
