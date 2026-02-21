import { useContext, useEffect } from "react";
import GameProvider, { GameContext } from "@/context/game-context";
import Board from "@/components/board";
import Score from "@/components/score";
import { type GameSize, sizeConfig } from "@/constants";
import styles from "@/styles/game-2048.module.css";

export type GameResult = {
  score: number;
  moves: number;
  status: "won" | "lost";
};

export type Game2048Props = {
  onGameEnd?: (result: GameResult) => void;
  onGameStart?: () => void;
  className?: string;
  size?: GameSize;
};

export default function Game2048({ size = "md", ...props }: Game2048Props) {
  const { containerWidthMobile, containerWidthDesktop } = sizeConfig[size];
  return (
    <GameProvider
      containerWidthMobile={containerWidthMobile}
      containerWidthDesktop={containerWidthDesktop}
    >
      <GameContent size={size} {...props} />
    </GameProvider>
  );
}

function GameContent({ onGameEnd, onGameStart, className, size = "md" }: Game2048Props) {
  const { score, moves, status } = useContext(GameContext);
  const { pixelSize } = sizeConfig[size];

  useEffect(() => {
    if (status === "won" || status === "lost") {
      onGameEnd?.({ score, moves, status });
    }
  }, [status, score, moves, onGameEnd]);

  useEffect(() => {
    if (status === "ongoing") {
      onGameStart?.();
    }
  }, [status, onGameStart]);

  return (
    <div
      className={`${styles.game2048}${className ? ` ${className}` : ""}`}
      style={{ "--pixel-size": `${pixelSize}px` } as React.CSSProperties}
    >
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
