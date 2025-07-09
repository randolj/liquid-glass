import LiquidGlass from "./LiquidGlass/LiquidGlass";

function App() {
  return (
    <div className="bg-[url('/trees.jpg')] bg-cover bg-center min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <LiquidGlass
          howWhite={0.1}
          howBlur={2}
          draggable={true}
        >
        </LiquidGlass>
      </div>
    </div>
  );
}

export default App;
