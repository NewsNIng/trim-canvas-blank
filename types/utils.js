var canvas = null;
export function makeNewCanvas(width, height) {
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
export function hasAlpha(data, x, y, width) {
    return data[(width * y + x) * 4 + 3] !== 0;
}
export function parseOptions(options) {
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
