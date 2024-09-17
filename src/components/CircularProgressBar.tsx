import React from 'react'

interface CircularProgressBarProps {
  progress: number
  size?: number
  strokeWidth?: number
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress, size = 100, strokeWidth = 4 }) => {
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer SVG Circle for Progress */}
      <svg width={size} height={size} className="absolute -top-[2px] -left-[1px] transform -rotate-90">
        {/* Full background circle */}
        <circle stroke="transparent" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={center} cy={center} />
        {/* Progress stroke */}
        <circle
          stroke="#753CBD"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>

      {/* Inner green circle with number */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-full bg-[#753CBD]"
        style={{
          width: `${size - strokeWidth * 3}px`,
          height: `${size - strokeWidth * 3}px`,
          margin: `${strokeWidth}px`, // Ensures no overlap between inner circle and outer stroke
        }}
      >
        {/* Progress number */}
        <span className="text-white leading-[12.45px] tracking-[0.19px] text-[14px] font-[400]">{progress}%</span>
      </div>
    </div>
  )
}

export default CircularProgressBar
