export default function PersonIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full h-full max-w-md"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2))",
      }}
    >
      {/* Modern Office Chair */}
      <g id="chair">
        {/* Chair base - wheel base */}
        <circle cx="260" cy="420" r="35" fill="#333" opacity="0.6" />
        <circle cx="260" cy="420" r="30" fill="#444" />
        
        {/* Wheels */}
        <circle cx="235" cy="410" r="8" fill="#555" />
        <circle cx="285" cy="410" r="8" fill="#555" />
        <circle cx="260" cy="435" r="8" fill="#555" />
        
        {/* Gas cylinder */}
        <rect x="255" y="380" width="10" height="40" fill="#666" rx="5" />
        
        {/* Chair seat - cushioned */}
        <ellipse cx="260" cy="370" rx="50" ry="25" fill="#1a1a1a" />
        <ellipse cx="260" cy="365" rx="48" ry="22" fill="#2a2a2a" />
        
        {/* Chair back - ergonomic */}
        <path d="M 220 360 Q 200 300 210 240 L 310 240 Q 320 300 300 360" fill="#1a1a1a" />
        <path d="M 222 358 Q 205 305 213 245 L 307 245 Q 318 298 298 358" fill="#2a2a2a" />
        
        {/* Armrests */}
        <rect x="165" y="340" width="15" height="50" fill="#333" rx="7" />
        <rect x="320" y="340" width="15" height="50" fill="#333" rx="7" />
        
        {/* Armrest tops */}
        <ellipse cx="172" cy="340" rx="10" ry="8" fill="#444" />
        <ellipse cx="327" cy="340" rx="10" ry="8" fill="#444" />
      </g>

      {/* Desk */}
      <g id="desk">
        <rect x="80" y="340" width="240" height="20" fill="#8B7355" rx="4" />
        <line x1="100" y1="340" x2="100" y2="420" stroke="#6B5344" strokeWidth="8" />
        <line x1="300" y1="340" x2="300" y2="420" stroke="#6B5344" strokeWidth="8" />
      </g>

      {/* Laptop on desk */}
      <g id="laptop">
        <rect x="130" y="300" width="100" height="60" fill="#333" rx="4" />
        <rect x="135" y="305" width="90" height="45" fill="#1a1a1a" rx="2" />
        {/* Screen glow */}
        <rect x="135" y="305" width="90" height="45" fill="#4a9eff" opacity="0.3" rx="2" />
        {/* Keyboard */}
        <rect x="130" y="360" width="100" height="8" fill="#222" rx="2" />
      </g>

      {/* Person body */}
      <g id="person">
        {/* Head */}
        <circle cx="260" cy="100" r="35" fill="#D4A574" />

        {/* Hair */}
        <path
          d="M 225 100 Q 225 65 260 65 Q 295 65 295 100"
          fill="#2C2C2C"
        />

        {/* Face features */}
        {/* Eyes */}
        <circle cx="250" cy="95" r="4" fill="#2C2C2C" />
        <circle cx="270" cy="95" r="4" fill="#2C2C2C" />
        {/* Smile */}
        <path d="M 250 110 Q 260 115 270 110" stroke="#2C2C2C" strokeWidth="2" fill="none" />

        {/* Neck */}
        <rect x="250" y="130" width="20" height="15" fill="#D4A574" />

        {/* Torso - wearing shirt */}
        <ellipse cx="260" cy="180" rx="45" ry="55" fill="#FF6B6B" />

        {/* Arms */}
        {/* Left arm */}
        <g>
          <ellipse cx="215" cy="170" rx="20" ry="50" fill="#D4A574" transform="rotate(-30 215 170)" />
          {/* Left hand */}
          <circle cx="200" cy="210" r="12" fill="#D4A574" />
        </g>

        {/* Right arm */}
        <g>
          <ellipse cx="305" cy="170" rx="20" ry="50" fill="#D4A574" transform="rotate(30 305 170)" />
          {/* Right hand */}
          <circle cx="320" cy="210" r="12" fill="#D4A574" />
        </g>

        {/* Legs */}
        {/* Left leg */}
        <rect x="240" y="230" width="18" height="90" fill="#333" rx="9" />
        {/* Right leg */}
        <rect x="242" y="230" width="18" height="90" fill="#333" rx="9" />

        {/* Shoes */}
        <ellipse cx="249" cy="325" rx="12" ry="8" fill="#1a1a1a" />
        <ellipse cx="251" cy="325" rx="12" ry="8" fill="#1a1a1a" />
      </g>

      {/* Floating code elements around person */}
      <g id="code-elements" opacity="0.6">
        {/* CSS icon */}
        <rect x="50" y="120" width="40" height="40" fill="#1572B6" rx="4" />
        <text x="70" y="150" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
          CSS
        </text>

        {/* JavaScript icon */}
        <rect x="330" y="140" width="40" height="40" fill="#F7DF1E" rx="4" />
        <text x="350" y="170" fontSize="12" fill="#333" textAnchor="middle" fontWeight="bold">
          JS
        </text>

        {/* React icon */}
        <circle cx="80" cy="280" r="20" fill="#61DAFB" />
        <text x="80" y="285" fontSize="10" fill="#333" textAnchor="middle" fontWeight="bold">
          React
        </text>

        {/* HTML icon */}
        <rect x="320" y="260" width="40" height="40" fill="#E34C26" rx="4" />
        <text x="340" y="290" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">
          HTML
        </text>
      </g>

      {/* Decorative lines */}
      <g id="decorative" stroke="#4a9eff" strokeWidth="2" opacity="0.3" fill="none">
        <line x1="50" y1="150" x2="80" y2="120" />
        <line x1="350" y1="170" x2="320" y2="200" />
        <line x1="100" y1="300" x2="80" y2="280" />
        <line x1="320" y1="300" x2="340" y2="280" />
      </g>
    </svg>
  );
}
