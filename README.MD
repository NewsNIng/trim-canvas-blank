# trim-canvas-blank

A lightweight library for trimming canvas blank, no dependencies.

## Installation

### npm

`npm i -S trim-canvas-blank`

### yarn

`yarn add trim-canvas-blank`

## Usage

```javascript
import trimCanvas from "trim-canvas-blank";

const canvas = document.querySelector("canvas");
const image = document.querySelector(".render-img");
let outputCanvas;

// simple usage
outputCanvas = trimCanvas(canvas);

// or you can custom padding
outputCanvas = trimCanvas(canvas, {
  padding: 12, // default 0
  // padding: [24, 12, 24, 12], // [top, right, bottom, left]
});

// output
const src = outputCanvas.toDataURL("image/png");
image.src = src;


```

## Demo

You can see a demo of `trim-canvas-blank` [here](https://newsning.github.io/trim-canvas-blank/).


## Thanks Repo

[trim-canvas](https://github.com/agilgur5/trim-canvas)

[signature-pad](https://github.com/szimek/signature_pad)
