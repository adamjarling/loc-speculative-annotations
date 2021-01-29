import brandPalette from 'styles/brandPalette';
import useRandomNumber from 'hooks/use-random-number';

export default function useRandomColor() {
  const { getRandomNumber } = useRandomNumber();

  function getRandomColor() {
    const colorKeys = Object.keys(brandPalette);
    const randomKey = getRandomNumber(0, colorKeys.length);

    return brandPalette[colorKeys[randomKey]]['500'];
  }

  return { getRandomColor };
}
