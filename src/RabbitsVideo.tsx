import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";

type Props = {
  title: string;
  subtitle: string;
};

const Rabbit: React.FC<{ x: number; y: number; seed: string; delay: number }> = ({
  x,
  y,
  seed,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bounce = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: { damping: 8, stiffness: 120, mass: 0.5 },
  });

  const hop = Math.sin((frame - delay) * 0.2) * 20;

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const size = 60 + random(seed + "size") * 40;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + (1 - bounce) * 200 - hop,
        opacity,
        fontSize: size,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      🐇
    </div>
  );
};

const TitleCard: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    fps,
    frame,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <h1
        style={{
          fontSize: 120,
          color: "white",
          margin: 0,
          fontFamily: "Georgia, serif",
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          transform: `scale(${titleScale})`,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 48,
          color: "rgba(255,255,255,0.85)",
          margin: 0,
          fontFamily: "Georgia, serif",
          opacity: subtitleOpacity,
        }}
      >
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};

const GrassField: React.FC = () => {
  const frame = useCurrentFrame();

  const blades = Array.from({ length: 30 }, (_, i) => {
    const x = (i / 30) * 1920;
    const sway = Math.sin(frame * 0.05 + i * 0.5) * 5;
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          bottom: 0,
          left: x,
          fontSize: 40 + (i % 3) * 10,
          transform: `rotate(${sway}deg)`,
          transformOrigin: "bottom center",
          userSelect: "none",
        }}
      >
        🌿
      </div>
    );
  });

  return <AbsoluteFill style={{ pointerEvents: "none" }}>{blades}</AbsoluteFill>;
};

export const RabbitsVideo: React.FC<Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();

  const bgColor = interpolate(frame, [0, 90, 180], ["#87CEEB", "#FFA07A", "#4169E1"], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rabbits = [
    { x: 200, y: 700, seed: "r1", delay: 10 },
    { x: 500, y: 750, seed: "r2", delay: 25 },
    { x: 900, y: 720, seed: "r3", delay: 5 },
    { x: 1300, y: 760, seed: "r4", delay: 35 },
    { x: 1600, y: 730, seed: "r5", delay: 15 },
  ];

  return (
    <AbsoluteFill style={{ background: bgColor }}>
      {/* Sun */}
      <Sequence from={0}>
        <AbsoluteFill>
          <div
            style={{
              position: "absolute",
              top: 80,
              right: 160,
              fontSize: 120,
              userSelect: "none",
              transform: `rotate(${frame * 0.3}deg)`,
            }}
          >
            ☀️
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Clouds */}
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 200 + frame * 0.5,
            fontSize: 90,
            opacity: 0.8,
            userSelect: "none",
          }}
        >
          ☁️
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 600 + frame * 0.3,
            fontSize: 120,
            opacity: 0.7,
            userSelect: "none",
          }}
        >
          ☁️
        </div>
      </AbsoluteFill>

      {/* Grass */}
      <GrassField />

      {/* Rabbits */}
      {rabbits.map((r) => (
        <Rabbit key={r.seed} x={r.x} y={r.y} seed={r.seed} delay={r.delay} />
      ))}

      {/* Title card — first 90 frames */}
      <Sequence from={0} durationInFrames={90}>
        <TitleCard title={title} subtitle={subtitle} />
      </Sequence>

      {/* Outro text */}
      <Sequence from={120}>
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 60 }}>
          <p
            style={{
              fontSize: 36,
              color: "white",
              fontFamily: "Georgia, serif",
              opacity: interpolate(frame, [120, 145], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            Made with Remotion 🎬
          </p>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
