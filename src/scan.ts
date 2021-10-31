import { hasAlpha } from "./utils";

export function scanTop(data: Uint8ClampedArray, rect: Rect) {
  for (let y = rect.top; y < rect.height - rect.bottom; y += 1) {
    for (let x = rect.left; x < rect.width - rect.right; x += 1) {
      if (hasAlpha(data, x, y, rect.width)) {
        return y;
      }
    }
  }
  return rect.top;
}

export function scanRight(data: Uint8ClampedArray, rect: Rect) {
  for (let x = rect.width - rect.right - 1; x > rect.left; x -= 1) {
    for (let y = rect.top; y < rect.height - rect.bottom; y += 1) {
      if (hasAlpha(data, x, y, rect.width)) {
        return rect.width - x;
      }
    }
  }
  return rect.right;
}

export function scanBottom(data: Uint8ClampedArray, rect: Rect) {
  for (let y = rect.height - rect.bottom - 1; y > rect.top; y -= 1) {
    for (let x = rect.left; x < rect.width - rect.right; x += 1) {
      if (hasAlpha(data, x, y, rect.width)) {
        return rect.height - y;
      }
    }
  }
  return rect.bottom;
}
export function scanLeft(data: Uint8ClampedArray, rect: Rect) {
  for (let x = rect.left; x < rect.width - rect.right; x += 1) {
    for (let y = rect.top; y < rect.height - rect.bottom; y += 1) {
      if (hasAlpha(data, x, y, rect.width)) {
        return x;
      }
    }
  }
  return rect.left;
}
