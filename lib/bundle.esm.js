var canvas = null;
function makeNewCanvas(width, height) {
    if (!canvas) {
        canvas = document.createElement("canvas");
    }
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    return canvas;
}
function hasAlpha(data, x, y, width) {
    return data[(width * y + x) * 4 + 3] !== 0;
}
function parseOptions(options) {
    var outputOptions = {
        padding: [0, 0, 0, 0],
    };
    if (!options) {
        return outputOptions;
    }
    if (options.padding) {
        switch (typeof options.padding) {
            case "number": {
                outputOptions.padding = outputOptions.padding.map(function (_) { return options.padding; });
                break;
            }
            case "object": {
                if (Array.isArray(options.padding)) {
                    outputOptions.padding = options.padding;
                }
                break;
            }
        }
    }
    return outputOptions;
}

function scanTop(data, rect) {
    for (var y = rect.top; y < rect.height - rect.bottom; y += 1) {
        for (var x = rect.left; x < rect.width - rect.right; x += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return y;
            }
        }
    }
    return rect.top;
}
function scanRight(data, rect) {
    for (var x = rect.width - rect.right - 1; x > rect.left; x -= 1) {
        for (var y = rect.top; y < rect.height - rect.bottom; y += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return rect.width - x;
            }
        }
    }
    return rect.right;
}
function scanBottom(data, rect) {
    for (var y = rect.height - rect.bottom - 1; y > rect.top; y -= 1) {
        for (var x = rect.left; x < rect.width - rect.right; x += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return rect.height - y;
            }
        }
    }
    return rect.bottom;
}
function scanLeft(data, rect) {
    for (var x = rect.left; x < rect.width - rect.right; x += 1) {
        for (var y = rect.top; y < rect.height - rect.bottom; y += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return x;
            }
        }
    }
    return rect.left;
}

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

export { trimCanvas as default };
