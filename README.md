<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/adamjarling/loc-speculative-annotations">
    <img src="public/logo2.png" alt="Logo" width="534" height="367">
  </a>
</div>

# Speculative Annotation

  <!-- <p>
    <a href="https://labs.loc.gov/work/experiments/annotation/?loclr=blogsig"><strong>More info »</strong></a>
    <br />
    <br />
    <a href="https://github.com/adamjarling/loc-speculative-annotations">View Demo</a>
    ·
    <a href="https://github.com/adamjarling/loc-speculative-annotations/issues">Report Bug</a>
    ·
    <a href="https://github.com/adamjarling/loc-speculative-annotations/issues">Request Feature</a>
  </p> -->

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#demo">Demo</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-application-locally">Running the application locally</a></li>
        <li><a href="#styleguide">Styleguide</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#source-images">Source Images</a></li>
        <li><a href="#librarian-annotations">Librarian Annnotations</a></li>
        <li><a href="#iiif-manifests">IIIF Manifests</a></li>
        <li><a href="#custom-theme">Custom Theme</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**Speculative Annotation** is a dynamic website and public art project by Library of Congress Innovator in Residence Courtney McClellan. The tool presents a unique mini collection of Free to Use items from the Library of Congress for students, teachers, and users of all ages to annotate through captions, drawings, and other types of markmaking. Working with curators at the Library and students and teachers in the classroom, McClellan developed Speculative Annotation to provide a way for students to speak back to history.

Speculative Annotation connects items from the past with the day-to-day experience of users. It was made with a K-12 audience in mind, with the hope that primary sources from the Library’s collection will be used by educators. The items are shared with contextual aids including curator annotations and links to additional resources for further research on the Library’s website.

The experimental application will premier at the Library of Congress in the summer of 2021 at https://labs.loc.gov/work/experiments/. We hope that other cultural heritage organizations will use this open source tool with their own materials to spark engagement and dialogue with historical objects.

Visit [Library of Congress Labs](https://labs.loc.gov/work/experiments/annotation/) for more information.

<a href="https://labs.loc.gov/">
  <img src="public/social-media-logos-Labs.svg" alt="Logo" style="height: 200px; width: auto;" />
</a>

### Demo

[Test drive the application](https://nervous-gates-006218.netlify.app/)

The staging environment is currently hosted with [Netlify](https://www.netlify.com/), and builds are synced with Github pushes to https://github.com/adamjarling/loc-speculative-annotations `main` branch.

### Built With

- [React](https://reactjs.org/)
- [FabricJS](http://fabricjs.com/)
- [IIIF](https://iiif.io/)
- [OpenSeadragon](https://openseadragon.github.io/)
- [Chakra UI](https://chakra-ui.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You must be running a local copy of NodeJS and `npm` or `yarn` for package management. We'll use `yarn` in these examples:

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/adamjarling/loc-speculative-annotations.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```

### Running the application locally

To run the application locally in your development environment:

```sh
yarn start
```

To run tests (coming soon...)

```sh
yarn test
```

### Styleguide

[View styleguide](https://www.figma.com/file/laNqMbfi7FSeHweqgyH8Jn/Speculative-Annotation-Style-Guide?node-id=0%3A1)

## Usage

### Source images

Source images are currently hosted locally and defined and imported in the following configuration file:

`src/services/loc-images.js`

An Work image file names should be its LOC `id`. Image files, thumbnails of images, and Curator annotation image files are located in:

```
src/images/loc-images
src/images/loc-images/thumbnails
src/images/curator-annotations
```

The application uses the OpenSeadragon Viewer to render images, so your source images can be a combination of locally hosted images (within the application), or externally hosted images (for example, served from a IIIF image server).

### IIIF Manifests

Application metadata is represented by a combination of local IIIF Presentation API 3.0 manifest files, and Library of Congress hosted IIIF manifest files. The organization of local files is as follows:

_Top level manifest:_
`public/iiif/speculative-annotations-manifest.json`

- Top level **Collection** type manifest resource which contains information about the Speculative Annotation works as a collection.
- Individual **Manifest** type manifests which each represent a Work, its metadata, annotations, containing LOC Collection, and more.
- Placeholder Library of Congress Collection manifests which contain metadata about a containing Collection for each Work.

The naming convention here is also cued off a Work's LOC `id`. Every Work image in the app should have a corresponding folder in:

`public/iiif/[LOC_WORK_ID_HERE]`

Every work image in the app should also be an object entry in the `public/iiif/speculative-annotations-manifest.json` file as well.

### Custom theme

If you'd like to update the UI with your own custom colors, fonts, etc. this is possible via Style Props and custom theming. This app uses the wonderful Chakra UI package, and see [Chakra UI Customize Theme](https://chakra-ui.com/docs/theming/customize-theme) for details.

### Testing

Currently only broad, high-level integration testing is supported via the Cypress.io testing library. To manually run tests, from the command line do:

```
yarn cypress:open
```

See all available application scripts and commands in the `package.json` file.

## Roadmap

See the [open issues](https://github.com/adamjarling/loc-speculative-annotations/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

### Library of Congress Labs

Jaime Mears - Innovator in Residence Program Manager jame@loc.gov

LC Labs - (https://labs.loc.gov) lc-labs@loc.gov

Courtney McClellan - Innovator in Residence - www.courtneymcclellan.com

### Developers / Designers

Adam J. Arling - UI Developer - [@adamjarling](https://github.com/adamjarling)

Jessica VU - UX Consultant

Olivia Graham - Grahpic Design Intern

## Acknowledgements

Remi Kalir PhD and Antero Garcia PhD
Emily Kirkpatrick and the National Council of Teachers of English
Kaleena Stasiak, Printmaker
Josh Hadro and the team at IIIF

The contributing staff of the Library of Congress:
Manuscript Division
Prints and Photographs Division
Hispanic Section
Near East Section
American Folklife Center
Performing Arts Division
Music Division
Serial and Government Publications
Rare Book Division
Geography and Maps Division
Professional Learning, Outreach & Initiatives Office
Motion Picture, Broadcasting & Recorded Sound

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/adamjarling/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/adamjarling/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/adamjarling/repo.svg?style=for-the-badge
[forks-url]: https://github.com/adamjarling/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/adamjarling/repo.svg?style=for-the-badge
[stars-url]: https://github.com/adamjarling/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/adamjarling/repo.svg?style=for-the-badge
[issues-url]: https://github.com/adamjarling/repo/issues
[license-shield]: https://img.shields.io/github/license/adamjarling/repo.svg?style=for-the-badge
[license-url]: https://github.com/adamjarling/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/adamjarling
