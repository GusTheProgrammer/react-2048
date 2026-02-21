import { useContext, useEffect } from "react";
import GameProvider, { GameContext } from "@/context/game-context";
import Board from "@/components/board";
import Score from "@/components/score";
import styles from "@/styles/game-2048.module.css";

export type GameResult = {
  score: number;
  status: "won" | "lost";
};

export type Game2048Props = {
  onGameEnd?: (result: GameResult) => void;
  onGameStart?: () => void;
  className?: string;
};

export default function Game2048(props: Game2048Props) {
  return (
    <GameProvider>
      <GameContent {...props} />
    </GameProvider>
  );
}

function GameContent({ onGameEnd, onGameStart, className }: Game2048Props) {
  const { score, status } = useContext(GameContext);

  useEffect(() => {
    if (status === "won" || status === "lost") {
      onGameEnd?.({ score, status });
    }
  }, [status, score, onGameEnd]);

  useEffect(() => {
    if (status === "ongoing") {
      onGameStart?.();
    }
  }, [status, onGameStart]);

  return (
    <div className={`${styles.game2048}${className ? ` ${className}` : ""}`}>
      <header>
        <h1>2048</h1>
        <div>
          <Score />
        </div>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}
