
const brandPalette = {
  green: {
    50: '#deffde',
    100: '#afffaf',
    200: '#7dff7e',
    300: '#4bff4c',
    400: '#1aff1a',
    500: '#00e600', // the color
    600: '#00b300',
    700: '#008000',
    800: '#004e00',
    900: '#001c00',
  },
  pastelBlue: 
  {
    50: '#e2f8ff',
    100: '#bae7f8', // the color
    200: '#90d5f1',
    300: '#67c5eb',
    400: '#44b5e5',
    500: '#319bcb',
    600: '#24789f',
    700: '#175772',
    800: '#073445',
    900: '#00121a',
  },
  pastelGreen: 
  {
    50: '#e4fdf5',
    100: '#bff2e4', // the color
    200: '#99e8d2',
    300: '#72e0c2',
    400: '#4ed7b0',
    500: '#38be96',
    600: '#2a9375',
    700: '#1d6a53',
    800: '#0d4032',
    900: '#001611',
  },
  pastelPurple: 
  {
    50: '#efe8ff',
    100: '#cdbef4', // the color
    200: '#ab92ea',
    300: '#8a68e2',
    400: '#6a3dd9',
    500: '#5024c0',
    600: '#3e1b95',
    700: '#2c146b',
    800: '#1a0b41',
    900: '#0a0319',
  },
  pink: 
  {
    50: '#ffe2ff',
    100: '#ffb1f9',
    200: '#ff7ff1',
    300: '#ff4ceb',
    400: '#ff1ae4',
    500: '#e600ca', // the color
    600: '#b4009e',
    700: '#810071',
    800: '#4f0045',
    900: '#1f001a',
  },
  rust: 
  {
    50: '#ffe9e0',
    100: '#ffc3b5',
    200: '#f99d86',
    300: '#f47657',
    400: '#f05129', // the color
    500: '#d6370f',
    600: '#a82a0b',
    700: '#781d06',
    800: '#4a0f01',
    900: '#1f0200',
  },
  teal: 
  {
    50: '#dcfff4',
    100: '#afffe2',
    200: '#80fdd0',
    300: '#4ffcbe', // the color
    400: '#25fbac',
    500: '#12e293',
    600: '#03b071',
    700: '#007d51',
    800: '#004c30',
    900: '#001b0d',
  },
  yellow: 
  {
    50: '#fffeda',
    100: '#fffaad',
    200: '#fff67d',
    300: '#fff24b',
    400: '#ffef1a',
    500: '#e6d500', // the color
    600: '#b3a600',
    700: '#807700',
    800: '#4d4700',
    900: '#1b1800',
  },
};

export const brandColors = [
  {
    label: 'green',
    hex: brandPalette.green['500'],
  },
  {
    label: 'pink',
    hex: brandPalette.pink['500'],
  },
  {
    label: 'rust',
    hex: brandPalette.rust['400'],
  },
  {
    label: 'teal',
    hex: brandPalette.teal['500'],
  },
  {
    label: 'yellow',
    hex: brandPalette.yellow['500'],
  },
  {
    label: 'pastelBlue',
    hex: brandPalette.pastelBlue['100'],
  },
  {
    label: 'pastelGreen',
    hex: brandPalette.pastelGreen['100'],
  },
  {
    label: 'pastelPurple',
    hex: brandPalette.pastelPurple['100'],
  },
];

export default brandPalette;
