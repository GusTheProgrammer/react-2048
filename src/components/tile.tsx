import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  containerWidthMobile,
  containerWidthDesktop,
  mergeAnimationDuration,
  tileCountPerDimension,
} from "@/constants";
import { type Tile as TileProps } from "@/types/tile";
import styles from "@/styles/tile.module.css";

export default function Tile({ position, value }: TileProps) {
  const isWideScreen = useMediaQuery("(min-width: 512px)");
  const containerWidth = isWideScreen ? containerWidthDesktop : containerWidthMobile;

  const [scale, setScale] = useState(1);

  const positionToPixels = (position: number) =>
    (position / tileCountPerDimension) * containerWidth;

  useEffect(() => {
    setScale(1.1);
    setTimeout(() => setScale(1), mergeAnimationDuration);
  }, [value]);

  const style = {
    left: positionToPixels(position[0]),
    top: positionToPixels(position[1]),
    transform: `scale(${scale})`,
    zIndex: value,
  };

  return (
    <div className={`${styles.tile} ${styles[`tile${value}`]}`} style={style}>
      {value}
    </div>
  );
}
