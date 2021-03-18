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
    <img src="public/logo.png" alt="Logo" width="534" height="367">
  </a>
</div>

# Speculative Annotations

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
        <li><a href="#view-demo">Demo</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-application-locally">Running the application locally</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#update-source-images">Update source images</a></li>
         <li><a href="#custom-theme">Custom theme</a></li>
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

**Speculative Annotations** is a dynamic website, presenting items from the Library’s collections for students, teachers, and other users to annotate through captions, drawings, and other types of markmaking.

Working with curators at the Library of Congress and students and teachers in the classroom, Innovator in Residence Courtney McClellan will develop tools that support the types of conversations students and educators want to have with historical objects.

The web application will include unique design features such as watermarks and/or visual layers to distinguish items annotated with this tool. The experimental application will premier in the summer of 2021, along with lessons plans and example annotations from Library curators. You can read a conversation about annotation and its role in the classroom with Courtney here.

If you are an educator interested in collaborating on the project, please email LC-Labs@loc.gov

Visit [Library of Congress Labs](https://labs.loc.gov/work/experiments/annotation/) for more information.

<a href="https://labs.loc.gov/">
  <img src="public/social-media-logos-Labs.svg" alt="Logo" style="height: 200px; width: auto;" />
</a>

### Demo

[Test drive the application](https://nervous-gates-006218.netlify.app/)

### Built With

- [React](https://reactjs.org/)
- [FabricJS](http://fabricjs.com/)
- [OpenSeadragon](https://openseadragon.github.io/)
- [IIIF](https://iiif.io/)
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

## Usage

### Update source images

Source images are currently defined in the following project file:

`src/services/loc-images.js`

The application uses the OpenSeadragon Viewer to render images, so your source images can be a combination of locally hosted images (within the application), or externally hosted images (for example, served from a IIIF image server).

This is currently where you'd update the application's source image definitions.

### Custom theme

If you'd like to update the UI with your own custom colors, fonts, etc. this is possible via Style Props and custom theming. This app uses the wonderful Chakra UI package, and see [Chakra UI Customize Theme](https://chakra-ui.com/docs/theming/customize-theme) for details.

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

Jaime Mears - Innovator in Residence Program Manager

Courtney McClellan - Artist in Residency

### Developer

Adam J. Arling

Senior UI Developer - Northwestern University Libraries :: Repository and Digital Curation

[adamarling.com](https://adamarling.com)

## Acknowledgements

- []()
- []()
- []()

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
