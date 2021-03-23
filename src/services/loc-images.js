import waltWhitman from 'images/loc-images/walt-whitman-papers.jpg';
import waltWhitmanLoc from 'images/loc-images/walt-whitman-papers_loc-test.jpg';
import duchess from 'images/loc-images/duchess-hi-res.jpg';
import duchessLoc from 'images/loc-images/duchess-hi-res_loc-test.jpg';
import nationalPark from 'images/loc-images/national-park.jpg';
import nationalParkLoc from 'images/loc-images/national-park_loc-test.jpg';
import filmstrip from 'images/loc-images/filmstrip.jpg';
import filmstripLoc from 'images/loc-images/filmstrip_loc-test.jpg';
import iceCreamSoda from 'images/loc-images/ice-cream-soda.jpg';

const duchessUrl =
  'https://tile.loc.gov/image-services/iiif/service:music:vaultscan.15:200218724:0001/full/pct:100/0/default.jpg';

export const locImages = [
  {
    id: 'national-park',
    alt: 'Yellowstone National Park poster',
    curatorImage: nationalParkLoc,
    type: 'image',
    url: nationalPark,
  },
  {
    id: 'walt-whitman',
    alt: 'Walt Whitman on Leaves of Grass themes',
    curatorImage: waltWhitmanLoc,
    title: 'Walt Whitman on Leaves of Grass themes',
    type: 'image',
    url: waltWhitman,
  },
  {
    id: 'duchess',
    alt:
      'The Duchess costume from "The Tragical History of Doctor Faustus" play',
    curatorImage: duchessLoc,
    title:
      'The Duchess costume from "The Tragical History of Doctor Faustus" play',
    type: 'image',
    url: duchess,
  },
  {
    id: 'zora-neil-hurston',
    alt:
      'Zora Neale Hurston and other African Americans, probably at a recording site in Belle Glade, Florida',
    curatorImage: filmstripLoc,
    title:
      'Zora Neale Hurston and other African Americans, probably at a recording site in Belle Glade, Florida',
    type: 'image',
    url: filmstrip,
  },
  {
    id: 'ice-cream-soda',
    alt:
      'Japanese-American farm workers have an ice cream soda on weekly trip to town',
    curatorImage: '',
    date: 'July 1942',
    title:
      'Japanese-American farm workers have an ice cream soda on weekly trip to town',
    type: 'image',
    url: iceCreamSoda,
  },
];
