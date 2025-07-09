import { useRef, useState } from "react";

interface LiquidGlassProps {
  howWhite?: number; // Optional, defaults provided below
  howBlur?: number;
  title?: string; // Optional, defaults to "Liquid Glass"
  draggable?: boolean; // Optional, defaults to false
  children?: React.ReactNode; // Optional, for additional content
  width?: number; // Optional, defaults to 500px
  height?: number; // Optional, defaults to 400px
}

export default function LiquidGlass({
  howWhite = 0.1,
  howBlur = 2,
  title = "Liquid Glass",
  draggable = false,
  children,
  width = 500,
  height = 400,
}: LiquidGlassProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggable) return; // Only allow dragging if draggable prop is true
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="absolute rounded-2xl overflow-hidden border border-white border-opacity-30 shadow-inner cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {/* Background distortion layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `blur(${howBlur}px)`,
          filter: "url(#glass-distortion)",
        }}
      />

      {/* Optional glass tint and inner shadow layer */}
      <div
        className="absolute inset-0 z-0 rounded-2xl"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${howWhite})`,
          boxShadow: "inset 0 0 8px 1px hsl(0, 0%, 100%, 0.6)",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 text-white">
        <h2 className="text-xl font-semibold mb-2 pt-4 mx-auto text-center">
          {title}
        </h2>
        {children}

      </div>
    </div>
  );
}
