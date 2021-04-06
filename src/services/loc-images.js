import waltWhitman from 'images/loc-images/walt-whitman-papers.jpg';
import duchess from 'images/loc-images/duchess-hi-res.jpg';
import nationalPark from 'images/loc-images/national-park.jpg';
import filmstrip from 'images/loc-images/filmstrip.jpg';
import iceCreamSoda from 'images/loc-images/ice-cream-soda.jpg';

const duchessUrl =
  'https://tile.loc.gov/image-services/iiif/service:music:vaultscan.15:200218724:0001/full/pct:100/0/default.jpg';

export const locImages = [
  {
    id: '2007676133',
    alt: 'Yellowstone National Park poster',
    type: 'image',
    url: nationalPark,
  },
  {
    id: 'mss1863001302',
    alt: 'Walt Whitman on Leaves of Grass themes',
    title: 'Walt Whitman on Leaves of Grass themes',
    type: 'image',
    url: waltWhitman,
  },
  {
    id: 'ihas.200218724',
    alt:
      'The Duchess costume from "The Tragical History of Doctor Faustus" play',
    title:
      'The Duchess costume from "The Tragical History of Doctor Faustus" play',
    type: 'image',
    url: duchess,
  },
  {
    id: '2007660344',
    alt:
      'Zora Neale Hurston and other African Americans, probably at a recording site in Belle Glade, Florida',
    title:
      'Zora Neale Hurston and other African Americans, probably at a recording site in Belle Glade, Florida',
    type: 'image',
    url: filmstrip,
  },
  {
    id: '2017819414',
    alt:
      'Japanese-American farm workers have an ice cream soda on weekly trip to town',
    date: 'July 1942',
    title:
      'Japanese-American farm workers have an ice cream soda on weekly trip to town',
    type: 'image',
    url: iceCreamSoda,
  },
];
