/**
 * Game Layout
 */
export const containerWidthMobile = 288; // px

export const containerWidthDesktop = 464; // px

export const tileCountPerDimension = 4;

/**
 * Game Size
 */
export type GameSize = "sm" | "md" | "lg" | "xl";

export const sizeConfig: Record<
  GameSize,
  { pixelSize: number; containerWidthMobile: number; containerWidthDesktop: number }
> = {
  // containerWidthMobile  = pixelSize * 36  (board inner width, mobile)
  // containerWidthDesktop = pixelSize * 58  (board inner width, desktop)
  sm: { pixelSize: 6, containerWidthMobile: 216, containerWidthDesktop: 348 },
  md: { pixelSize: 8, containerWidthMobile: 288, containerWidthDesktop: 464 },
  lg: { pixelSize: 10, containerWidthMobile: 360, containerWidthDesktop: 580 },
  xl: { pixelSize: 12, containerWidthMobile: 432, containerWidthDesktop: 696 },
};

/**
 * Animations
 */
export const mergeAnimationDuration = 100; // ms

export const moveAnimationDuration = 200; // ms

/**
 * Game setup
 */
export const gameWinTileValue = 2048;
