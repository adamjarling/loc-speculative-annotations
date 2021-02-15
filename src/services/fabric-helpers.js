export function fabricCalcArrowAngle(x1, y1, x2, y2) {
  var angle = 0,
    x,
    y;
  x = x2 - x1;
  y = y2 - y1;
  if (x === 0) {
    angle = y === 0 ? 0 : y > 0 ? Math.PI / 2 : (Math.PI * 3) / 2;
  } else if (y === 0) {
    angle = x > 0 ? 0 : Math.PI;
  } else {
    angle =
      x < 0
        ? Math.atan(y / x) + Math.PI
        : y < 0
        ? Math.atan(y / x) + 2 * Math.PI
        : Math.atan(y / x);
  }
  return (angle * 180) / Math.PI + 90;
}

export function starPolygonPoints(spikeCount, outerRadius, innerRadius) {
  var rot = (Math.PI / 2) * 3;
  var cx = outerRadius;
  var cy = outerRadius;
  var sweep = Math.PI / spikeCount;
  var points = [];
  var angle = 0;

  for (var i = 0; i < spikeCount; i++) {
    var x = cx + Math.cos(angle) * outerRadius;
    var y = cy + Math.sin(angle) * outerRadius;
    points.push({ x: x, y: y });
    angle += sweep;

    x = cx + Math.cos(angle) * innerRadius;
    y = cy + Math.sin(angle) * innerRadius;
    points.push({ x: x, y: y });
    angle += sweep;
  }
  return points;
}
