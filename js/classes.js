class Dataset {
  constructor(
    label,
    data,
    type,
    borderColor,
    fillOpacity,
    steppedLine,
    showLine,
    fill,
    pointRadius,
    pointBorderColor,
    pointBorderWidth,
    cubicInterpolationMode,
    backgroundColor
  ) {
    this.label = label;
    this.data = data;
    this.type = type;
    this.borderColor = borderColor;
    this.fillOpacity = fillOpacity;
    this.steppedLine = steppedLine;
    this.showLine = showLine;
    this.fill = fill;
    this.pointRadius = pointRadius;
    this.pointBorderColor = pointBorderColor;
    this.pointBorderWidth = pointBorderWidth;
    this.cubicInterpolationMode = cubicInterpolationMode;
    this.backgroundColor = backgroundColor;
  }
}
