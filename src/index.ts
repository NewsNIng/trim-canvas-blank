import { scanRight, scanTop, scanBottom, scanLeft } from "./scan";
import { makeNewCanvas, parseOptions } from "./utils";

function trimCanvas(canvas: HTMLCanvasElement, options?: Options) {
  const context = canvas.getContext("2d")!;
  const { width, height } = canvas;
  const data = context.getImageData(0, 0, width, height).data;

  const rect: Rect = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width,
    height,
  };

  rect.top = scanTop(data, rect);
  rect.right = scanRight(data, rect);
  rect.bottom = scanBottom(data, rect);
  rect.left = scanLeft(data, rect);

  const trimWidth = rect.width - rect.right - rect.left + 1;
  const trimHeight = rect.height - rect.bottom - rect.top + 1;

  const trimData = context.getImageData(
    rect.left,
    rect.top,
    trimWidth,
    trimHeight
  );

  const trimOptions = parseOptions(options);

  const [pt, pr, pb, pl] = trimOptions.padding;

  const renderData = {
    width: trimWidth + pl + pr,
    height: trimHeight + pt + pb,
    startX: pl,
    startY: pt,
  };

  const outputCanvas = makeNewCanvas(renderData.width, renderData.height);

  outputCanvas
    .getContext("2d")!
    .putImageData(trimData, renderData.startX, renderData.startY);
  return outputCanvas;
}

export default trimCanvas;
