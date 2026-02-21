import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { containerWidthMobile as defaultCWMobile, containerWidthDesktop as defaultCWDesktop } from "@/constants";
import {
  gameWinTileValue,
  mergeAnimationDuration,
  tileCountPerDimension,
} from "@/constants";
import { type Tile } from "@/types/tile";
import gameReducer, { initialState } from "@/reducers/game-reducer";

type MoveDirection = "move_up" | "move_down" | "move_left" | "move_right";

export const GameContext = createContext({
  score: 0,
  moves: 0,
  status: "idle",
  moveTiles: (_: MoveDirection) => {},
  getTiles: () => [] as Tile[],
  startGame: () => {},
  containerWidthMobile: defaultCWMobile,
  containerWidthDesktop: defaultCWDesktop,
});

type GameProviderProps = PropsWithChildren<{
  containerWidthMobile?: number;
  containerWidthDesktop?: number;
}>;

export default function GameProvider({
  children,
  containerWidthMobile = defaultCWMobile,
  containerWidthDesktop = defaultCWDesktop,
}: GameProviderProps) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const getEmptyCells = () => {
    const results: [number, number][] = [];

    for (let x = 0; x < tileCountPerDimension; x++) {
      for (let y = 0; y < tileCountPerDimension; y++) {
        if (gameState.board[y][x] == null) {
          results.push([x, y]);
        }
      }
    }
    return results;
  };

  const appendRandomTile = () => {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
      const cellIndex = Math.floor(Math.random() * emptyCells.length);
      const newTile = {
        position: emptyCells[cellIndex],
        value: 2,
      };
      dispatch({ type: "create_tile", tile: newTile });
    }
  };

  const getTiles = () => {
    return gameState.tilesByIds.map((tileId) => gameState.tiles[tileId]);
  };

  const lastCall = useRef(0);

  const moveTiles = useCallback(
    (type: MoveDirection) => {
      if (gameState.status !== "ongoing") return;
      const now = Date.now();
      const wait = mergeAnimationDuration * 1.05;
      if (now - lastCall.current >= wait) {
        lastCall.current = now;
        dispatch({ type });
      }
    },
    [dispatch, gameState.status],
  );

  const startGame = () => {
    dispatch({ type: "reset_game" });
    dispatch({ type: "update_status", status: "ongoing" });
    dispatch({ type: "create_tile", tile: { position: [0, 1], value: 2 } });
    dispatch({ type: "create_tile", tile: { position: [0, 2], value: 2 } });
  };

  const checkGameState = () => {
    const isWon =
      Object.values(gameState.tiles).filter((t) => t.value === gameWinTileValue)
        .length > 0;

    if (isWon) {
      dispatch({ type: "update_status", status: "won" });
      return;
    }

    const { tiles, board } = gameState;

    const maxIndex = tileCountPerDimension - 1;
    for (let x = 0; x < maxIndex; x += 1) {
      for (let y = 0; y < maxIndex; y += 1) {
        if (
          gameState.board[x][y] == null ||
          gameState.board[x + 1][y] == null ||
          gameState.board[x][y + 1] == null
        ) {
          return;
        }

        if (tiles[board[x][y]].value === tiles[board[x + 1][y]].value) {
          return;
        }

        if (tiles[board[x][y]].value === tiles[board[x][y + 1]].value) {
          return;
        }
      }
    }

    dispatch({ type: "update_status", status: "lost" });
  };

  useEffect(() => {
    if (gameState.hasChanged) {
      setTimeout(() => {
        dispatch({ type: "clean_up" });
        appendRandomTile();
      }, mergeAnimationDuration);
    }
  }, [gameState.hasChanged]);

  useEffect(() => {
    if (!gameState.hasChanged) {
      checkGameState();
    }
  }, [gameState.hasChanged]);

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        moves: gameState.moves,
        status: gameState.status,
        getTiles,
        moveTiles,
        startGame,
        containerWidthMobile,
        containerWidthDesktop,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
