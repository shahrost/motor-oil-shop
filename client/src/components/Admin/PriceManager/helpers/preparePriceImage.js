export function rotatePriceCanvas(source, degrees) {
  const angle = degrees * Math.PI / 180, cos = Math.abs(Math.cos(angle)), sin = Math.abs(Math.sin(angle));
  const canvas = document.createElement("canvas");
  canvas.priceDark = source.priceDark;
  canvas.width = Math.ceil(source.width * cos + source.height * sin);
  canvas.height = Math.ceil(source.height * cos + source.width * sin);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2); ctx.rotate(angle);
  ctx.drawImage(source, -source.width / 2, -source.height / 2);
  return canvas;
}

export function lightPriceCanvas(source) {
  const ctx = source.getContext("2d"), pixels = ctx.getImageData(0, 0, source.width, source.height);
  let dark = 0, light = 0, count = 0;
  for (let p = 0; p < pixels.data.length; p += 64) {
    const gray = (pixels.data[p] + pixels.data[p + 1] + pixels.data[p + 2]) / 3;
    dark += gray < 65; light += gray > 190; count++;
  }
  if (dark < count * 0.45 || dark < light * 1.2) return source;
  const canvas = rotatePriceCanvas(source, 0), target = canvas.getContext("2d");
  canvas.priceDark = true;
  let run = 0;
  for (let y = Math.floor(source.height * 0.2); y < source.height; y++) {
    let rowDark = 0, samples = 0;
    for (let x = Math.floor(source.width * 0.05); x < source.width * 0.95; x += 8) {
      const p = (y * source.width + x) * 4;
      rowDark += (pixels.data[p] + pixels.data[p + 1] + pixels.data[p + 2]) / 3 < 65; samples++;
    }
    run = rowDark > samples * 0.85 ? run + 1 : 0;
    if (run >= 40) { canvas.priceBodyTop = y - run + 1; break; }
  }
  for (let p = 0; p < pixels.data.length; p += 4) {
    for (let channel = 0; channel < 3; channel++) pixels.data[p + channel] = 255 - pixels.data[p + channel];
  }
  target.putImageData(pixels, 0, 0);
  return canvas;
}

export function priceTextRows(source, start = 0) {
  const { data } = source.getContext("2d").getImageData(0, 0, source.width, source.height);
  const rows = [];
  let first = -1, last = -1;
  for (let y = start; y <= source.height + 3; y++) {
    let ink = 0;
    if (y < source.height) for (let x = 0; x < source.width; x += 2) {
      const p = (y * source.width + x) * 4;
      if (data[p] + data[p + 1] + data[p + 2] < 570) ink++;
    }
    if (ink > Math.max(2, source.width * 0.001)) { if (first < 0) first = y; last = y; }
    else if (first >= 0 && y - last > 3) {
      if (last - first >= 5 && last - first < 100) rows.push({ top: Math.max(start, first - 5), height: Math.min(source.height, last + 6) - Math.max(start, first - 5) });
      first = -1;
    }
  }
  return rows;
}

// Projection of dark pixels finds small scan/camera tilts. Work on a thumbnail
// so this stays bounded on phones even for a high-resolution camera image.
export function preparePriceImage(source) {
  const small = document.createElement("canvas"), scale = Math.min(1, 600 / Math.max(source.width, source.height));
  small.width = Math.max(1, Math.round(source.width * scale));
  small.height = Math.max(1, Math.round(source.height * scale));
  const context = small.getContext("2d");
  context.drawImage(source, 0, 0, small.width, small.height);
  const { data } = context.getImageData(0, 0, small.width, small.height), points = [];
  for (let y = 0; y < small.height; y++) for (let x = 0; x < small.width; x++) {
    const p = (y * small.width + x) * 4;
    if (data[p] + data[p + 1] + data[p + 2] < 330) points.push([x, y]);
  }
  let best = 0, bestScore = 0, zeroScore = 0;
  for (let angle = -6; angle <= 6; angle += 0.25) {
    const radians = angle * Math.PI / 180, sin = Math.sin(radians), cos = Math.cos(radians);
    const bins = new Uint32Array(small.height + small.width + 4);
    for (const [x, y] of points) bins[Math.round(y * cos - x * sin) + small.width]++;
    const score = bins.reduce((sum, count) => sum + count * count, 0);
    if (angle === 0) zeroScore = score;
    if (score > bestScore) { bestScore = score; best = angle; }
  }
  small.width = small.height = 0;
  const canvas = Math.abs(best) >= 0.5 && bestScore > zeroScore * 1.08 ? rotatePriceCanvas(source, -best)
    : rotatePriceCanvas(source, 0);
  const ctx = canvas.getContext("2d"), pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let p = 0; p < pixels.data.length; p += 4) {
    const gray = Math.round(0.299 * pixels.data[p] + 0.587 * pixels.data[p + 1] + 0.114 * pixels.data[p + 2]);
    const enhanced = Math.max(0, Math.min(255, (gray - 128) * 1.35 + 128));
    pixels.data[p] = pixels.data[p + 1] = pixels.data[p + 2] = enhanced;
  }
  ctx.putImageData(pixels, 0, 0);
  return canvas;
}
