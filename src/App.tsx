import { Game2048 } from "@/index";

function App() {
  return <Game2048
    onGameEnd={({ score, moves, status }) => {
      console.log({ score, moves, status });
    }}
    onGameStart={() => console.log('game started')}
    size="xl"
  />;
}

export default App
