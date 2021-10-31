import { scanRight, scanTop, scanBottom, scanLeft } from "./scan";
import { makeNewCanvas, parseOptions } from "./utils";
function trimCanvas(canvas, options) {
    var context = canvas.getContext("2d");
    var width = canvas.width, height = canvas.height;
    var data = context.getImageData(0, 0, width, height).data;
    var rect = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: width,
        height: height,
    };
    rect.top = scanTop(data, rect);
    rect.right = scanRight(data, rect);
    rect.bottom = scanBottom(data, rect);
    rect.left = scanLeft(data, rect);
    var trimWidth = rect.width - rect.right - rect.left + 1;
    var trimHeight = rect.height - rect.bottom - rect.top + 1;
    var trimData = context.getImageData(rect.left, rect.top, trimWidth, trimHeight);
    var trimOptions = parseOptions(options);
    var _a = trimOptions.padding, pt = _a[0], pr = _a[1], pb = _a[2], pl = _a[3];
    var renderData = {
        width: trimWidth + pl + pr,
        height: trimHeight + pt + pb,
        startX: pl,
        startY: pt,
    };
    var outputCanvas = makeNewCanvas(renderData.width, renderData.height);
    outputCanvas
        .getContext("2d")
        .putImageData(trimData, renderData.startX, renderData.startY);
    return outputCanvas;
}
export default trimCanvas;
