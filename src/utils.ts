let canvas: HTMLCanvasElement | null = null;
export function makeNewCanvas(width: number, height: number) {
  if (!canvas) {
    canvas = document.createElement("canvas");
  }
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, width, height);
  return canvas;
}

export function hasAlpha(
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number
) {
  return data[(width * y + x) * 4 + 3] !== 0;
}

export function parseOptions(options?: Options) {
  const outputOptions = {
    padding: [0, 0, 0, 0],
  };

  if (!options) {
    return outputOptions;
  }

  if (options.padding) {
    switch (typeof options.padding) {
      case "number": {
        outputOptions.padding = outputOptions.padding.map(
          (_) => options.padding as number
        );
        break;
      }
      case "object": {
        if (Array.isArray(options.padding)) {
          outputOptions.padding = options.padding as number[];
        }
        break;
      }
    }
  }

  return outputOptions;
}
