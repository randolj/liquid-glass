import { useRef, useState } from "react";

export default function LiquidGlass() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
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
      className="absolute rounded-2xl w-[500px] h-[400px] overflow-hidden border border-white border-opacity-30 shadow-inner cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Background distortion layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          filter: "url(#glass-distortion)",
        }}
      />

      {/* Optional glass tint and inner shadow layer */}
      <div
        className="absolute inset-0 z-0 rounded-2xl"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "inset 0 0 8px 1px hsl(0, 0%, 100%, 0.7)",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 text-white">
        <h2 className="text-xl font-semibold mb-2 pt-4 mx-auto text-center">
          Liquid Glass
        </h2>
      </div>
    </div>
  );
}
