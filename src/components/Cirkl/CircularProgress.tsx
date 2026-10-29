import React, { useRef } from "react";
import "./CircularProgress.css";

type CircularProgressProps = {
  currentTime: number;
  duration: number;
  image: string;
  onSeek: (time: number) => void;
};

export default function CircularProgress({
  currentTime,
  duration,
  image,
  onSeek,
}: CircularProgressProps) {
  const circleRef = useRef<SVGCircleElement>(null);

  const radius = 94;
  const circumference = 2 * Math.PI * radius;
  const progress =
    duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  function handlePointer(e: React.PointerEvent<SVGSVGElement>) {
    if (!duration || !circleRef.current) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    angle = (angle + 360) % 360;

    onSeek((angle / 360) * duration);
  }

  return (
    <div className="circular-player">
      <svg
        className="circular-progress"
        viewBox="0 0 220 220"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          handlePointer(e);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) handlePointer(e);
        }}
      >
        <circle
          cx="110"
          cy="110"
          r={radius}
          className="progress-background"
        />

        <circle
          ref={circleRef}
          cx="110"
          cy="110"
          r={radius}
          className="progress-value"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />

        <image
          href={image}
          x="22"
          y="22"
          width="176"
          height="176"
          preserveAspectRatio="xMidYMid slice"
          className="album-cover"
        />
      </svg>
    </div>
  );
}