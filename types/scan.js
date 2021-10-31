import { hasAlpha } from "./utils";
export function scanTop(data, rect) {
    for (var y = rect.top; y < rect.height - rect.bottom; y += 1) {
        for (var x = rect.left; x < rect.width - rect.right; x += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return y;
            }
        }
    }
    return rect.top;
}
export function scanRight(data, rect) {
    for (var x = rect.width - rect.right - 1; x > rect.left; x -= 1) {
        for (var y = rect.top; y < rect.height - rect.bottom; y += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return rect.width - x;
            }
        }
    }
    return rect.right;
}
export function scanBottom(data, rect) {
    for (var y = rect.height - rect.bottom - 1; y > rect.top; y -= 1) {
        for (var x = rect.left; x < rect.width - rect.right; x += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return rect.height - y;
            }
        }
    }
    return rect.bottom;
}
export function scanLeft(data, rect) {
    for (var x = rect.left; x < rect.width - rect.right; x += 1) {
        for (var y = rect.top; y < rect.height - rect.bottom; y += 1) {
            if (hasAlpha(data, x, y, rect.width)) {
                return x;
            }
        }
    }
    return rect.left;
}
