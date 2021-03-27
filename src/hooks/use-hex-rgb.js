export default function useHexRGB() {
  // All functions pulled from
  // https://css-tricks.com/converting-color-spaces-in-javascript/

  function hexToRGB(h) {
    if (!h) return;
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length == 4) {
      r = '0x' + h[1] + h[1];
      g = '0x' + h[2] + h[2];
      b = '0x' + h[3] + h[3];

      // 6 digits
    } else if (h.length == 7) {
      r = '0x' + h[1] + h[2];
      g = '0x' + h[3] + h[4];
      b = '0x' + h[5] + h[6];
    }

    return 'rgb(' + +r + ',' + +g + ',' + +b + ')';
  }

  function hexToRGBA(h, opacity = 1) {
    let rgb = hexToRGB(h);
    if (!rgb) return;
    if (opacity < 0 || opacity > 1) {
      console.error('useHexRGB: opacity value must be between 0 and 1');
      return;
    }
    let rgba = rgb.replace('rgb', 'rgba');
    const indexPos = rgba.lastIndexOf(')');
    return `${rgba.slice(0, indexPos)},${opacity}${rgba.slice(indexPos)}`;
  }

  function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
  }

  return {
    hexToRGB,
    hexToRGBA,
    RGBToHex,
  };
}
