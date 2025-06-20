export function calculateTitleFontSize(width: number, ratio?: number): number {
  if (ratio !== undefined) {
    return width > 749 ? width / ratio : 30;
  }
  return width > 749 ? width / 25 : 35;
}

export function calculateFontSize(width: number, ratio?: number): number {
  if (ratio !== undefined) {
    return width > 749 ? width / ratio : 16;
  }
  return width > 749 ? width / 95 : 16;
}
