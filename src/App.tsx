import { Game2048 } from "@/index";

function App() {
  return <Game2048 onGameEnd={(result) => console.log(result)} />;
}

export default App
