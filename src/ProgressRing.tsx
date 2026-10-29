export default function ProgressRing({ radius = 52, stroke = 8, progress = 0 }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={radius * 2 + stroke} height={radius * 2 + stroke}>
      <circle
        stroke="#eee"
        strokeWidth={stroke}
        fill="none"
        r={radius}
        cx={radius + stroke / 2}
        cy={radius + stroke / 2}
      />
      <circle
        stroke="#4caf50"
        strokeWidth={stroke}
        fill="none"
        r={radius}
        cx={radius + stroke / 2}
        cy={radius + stroke / 2}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 0.4s ease',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  );
}

// Использование
