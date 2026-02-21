# react-2048

[![npm version](https://img.shields.io/npm/v/react-2048.svg)](https://www.npmjs.com/package/react-2048)

A self-contained 2048 game React component.

## Install

```bash
npm install react-2048
```

## Usage

```tsx
import { Game2048 } from "react-2048";

export default function App() {
  return (
    <Game2048
      onGameEnd={({ score, status }) => {
        console.log({ score, status });
      }}
    />
  );
}
```

## Credits
This component is based on the [2048-in-react](https://github.com/mateuszsokola/2048-in-react) repository.