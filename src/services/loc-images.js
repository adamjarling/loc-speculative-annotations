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
    contact: 'https://ask.loc.gov/prints-photographs',
    creator: 'Don C. (Chester) Powell',
    curatorImage: nationalParkLoc,
    date: '1938?',
    info:
      "This poster shows Old Faithful erupting at Yellowstone National Park. At first, posters were created by hand, individually painted and lettered. Later on, the divisions' artists usually used the silkscreen process, which was adapted and refined for the mass production of posters by project artist Anthony Velonis in 1936. The printing of a poster was a collaborative effort. Artists were responsible for the poster's design, color selection, and sometimes the cutting of the stencils used to print the poster. The workshop's technical staff screened the posters. With this silkscreening process, as many as six hundred posters were printed in a day.",
    questions: [
      'Why do you think this poster was made?',
      'What do the artists want people to do or learn?',
    ],
    place: '',
    seeCollection:
      'https://www.loc.gov/collections/works-progress-administration-posters/about-this-collection/',
    seeItem: 'https://www.loc.gov/resource/ppmsca.13399/',
    title: 'Yellowstone National Park poster',
    type: 'image',
    url: nationalPark,
  },
  {
    id: 'walt-whitman',
    alt: 'Walt Whitman on Leaves of Grass themes',
    contact: 'https://ask.loc.gov/manuscripts/',
    creator: 'Walt Whitman',
    curatorImage: waltWhitmanLoc,
    date: '1847-1891',
    info:
      'The poet Walt Whitman analyzes the themes of poem collection "Leaves of Grass," published in 1855. Whitman spent the rest of his life rewriting and revising "Leaves of Grass," which grew from 12 poems to 400 in the last edition.',
    questions: [
      'What other themes from "Leaves of Grass" would you add to Whitman\'s list?',
    ],
    place: '',
    seeCollection:
      'https://www.loc.gov/collections/feinberg-whitman/about-this-collection/',
    seeItem: 'https://www.loc.gov/item/mss1863001302',
    title: 'Walt Whitman on Leaves of Grass themes',
    type: 'image',
    url: waltWhitman,
  },
  {
    id: 'duchess',
    alt:
      'The Duchess costume from "The Tragical History of Doctor Faustus" play',
    contact: 'https://ask.loc.gov/#s-la-box-83050-container-tab1',
    creator: 'Paul Cadorette',
    curatorImage: duchessLoc,
    date: 'November 22, 1938',
    info:
      'The Federal Theatre Project Collection contains documentation for stage productions mounted by the Federal Theatre Project in the period 1935-39. The Federal Theatre Project was the largest and most ambitious effort mounted by the Federal Government to organize and produce theater events. It was an effort of the administration of President Franklin Delano Roosevelt to provide work for unemployed professionals in the theater during the Great Depression which followed the stock market crash of October 1929. The Federal Theatre Project was one of four (subsequently five) arts-related projects called Federal Project Number One, established under the Works Progress Administration (WPA) during Roosevelts first term. The WPA was created through Executive Order No. 7034 issued on May 6, 1935.  The FTP was administered from Washington, D. C., but its many companies stretched the full breadth of the Nation. It functioned from 1935 to 1939 when its funding was terminated. In that brief period, it was responsible for some of the most innovative staging of its time.',
    questions: [
      'What does this costume say about The Duchess as a character in the play?',
      'What lines would the Duchess say in this dress?',
    ],
    place: 'Boston, MA',
    seeCollection:
      'https://www.loc.gov/collections/federal-theatre-project-1935-to-1939/about-this-collection/',
    seeItem:
      'https://www.loc.gov/resource/ihas.200218724.0/?sp=1&r=-0.882,-0.057,2.765,1.441,0',
    title:
      'The Duchess costume from "The Tragical History of Doctor Faustus" play',
    type: 'image',
    url: duchess,
  },
  {
    id: 'filmstrip',
    alt:
      'Zora Neale Hurston and other African Americans, probably at a recording site in Belle Glade, Florida',
    contact: 'https://ask.loc.gov/american-folklife',
    creator: '',
    curatorImage: filmstripLoc,
    date: '1935',
    info:
      'These were photos taken during the Lomax-Hurston-Barnicle recording expedition to Georgia, Florida, and the Bahamas. Handwritten on back is: "Belle Glade, Fla, poss. 1935"; "Zora Hurston." Photographs depict African American, white, and Latino musicians, singers and dancers, in the southern United States (Alabama, Arkansas, Florida, Georgia, Louisiana, Mississippi, North Carolina, Texas, and Virginia) and the Bahamas (Nassau, Andros Island, and Cat Island). Includes portraits of musicians posed with and without their instruments; many photos show musicians in various settings and activities--at homes, working in prison yards, working on chain gangs, performing outside and on stage at the Asheville Mountain Music Festival, North Carolina. Some photos depict daily life, including domestic activities, baptisms, and farming. Also includes some landscape and marine views, houses, and children playing singing games. Musicians depicted include, among others, Henry Truvillion, James "Iron Head" Baker, Moses "Clear Rock" Platt, Leadbelly, Crockett "Davy" Ward, Bill Hensley, Uncle Bob Ledbetter, and Bascom Lamar Lunsford. Folklorist Zora Neale Hurston, who assisted the Lomaxes on expeditions to Georgia and Florida, is identified in four photographs in subdivisions 7414-C and 7414-G. Unlike many anthropoligists at that time, Hurston believed in integrating herself as an anthropologist and folklorist into the communities and cultures she was studying.',
    questions: [],
    place: 'Belle Glade, FL',
    seeCollection: 'https://www.loc.gov/search/?fa=partof:lot+7414',
    seeItem: 'https://www.loc.gov/resource/ppmsc.00618/',
    title:
      'Zora Neale Hurston and other African Americans, probably at a recording site in Belle Glade, Florida',
    type: 'image',
    url: filmstrip,
  },
  {
    id: 'ice-cream-soda',
    alt:
      'Japanese-American farm workers have an ice cream soda on weekly trip to town',
    contact: 'https://ask.loc.gov/prints-photographs',
    creator: 'Russell Lee',
    curatorImage: '',
    date: 'July 1942',
    info:
      'The photographs of the Farm Security Administration - Office of War Information Photograph Collection form an extensive pictorial record of American life between 1935 and 1944. This U.S. government photography project was headed for most of its existence by Roy E. Stryker, formerly an economics instructor at Columbia University, and employed such photographers as Walker Evans, Dorothea Lange, Russell Lee, Arthur Rothstein, Ben Shahn, Jack Delano, Marion Post Wolcott, Gordon Parks, John Vachon, and Carl Mydans. The project initially documented cash loans made to individual farmers by the Resettlement Administration and the construction of planned suburban communities. The second stage focused on the lives of sharecroppers in the South and migratory agricultural workers in the midwestern and western states. As the scope of the project expanded, the photographers turned to recording both rural and urban conditions throughout the United States as well as mobilization efforts for World War II. "From  May to November 1942, Nyssa [pronounced NISS-a], Oregon, served as the site of the first farm labor camp organized during the wartime Japanese American experience. Established as a result of the " Oregon Plan " for the forced removal and confinement of the state\'s Nikkei residents, the camp held approximately three hundred fifty laborers at its peak. These workers provided critical agricultural labor in eastern Oregon\'s Malheur County. By the summer of 1942, the camp became so well known that the Pacific Citizen referred to it as "the camp without a fence." [1]" https://encyclopedia.densho.org/Nyssa,_Oregon_(detention_facility)/',
    questions: [
      'What do you think the life of the man and child was like?',
      'What clues from the photograph and the place and time it was taken make you think that?',
    ],
    place: 'Nyssa, Oregon',
    seeCollection: 'https://www.loc.gov/search/?fa=partof:lot+292',
    seeItem: 'https://www.loc.gov/resource/fsa.8c25306/',
    title:
      'Japanese-American farm workers have an ice cream soda on weekly trip to town',
    type: 'image',
    url: iceCreamSoda,
  },
];
