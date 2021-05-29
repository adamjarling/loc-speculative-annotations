import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import SubHeading from 'components/SubHeading';
import courtney1 from 'images/McClellan-About1.jpeg';
import courtney2 from 'images/McClellan-About2.jpeg';
import aboutImg from 'images/About3-Manuscript.jpg';

function SiteAbout() {
  return (
    <Container maxW="4xl" pb="80px">
      <Heading as="h1">About</Heading>
      <Text>
        <i>Speculative Annotation</i> is a dynamic website and public art
        project by Library of Congress Innovator in Residence Courtney
        McClellan. The tool presents a unique mini collection of Free to Use
        items from the Library of Congress for students, teachers, and users of
        all ages to annotate through captions, drawings, and other types of
        markmaking. Working with curators at the Library and students and
        teachers in the classroom, McClellan developed{' '}
        <i>Speculative Annotation</i> to provide a way for students to speak
        back to history.{' '}
      </Text>
      <Text>
        <i>Speculative Annotation</i> connects items from the past with the
        day-to-day experience of users. It was made with a K-12 audience in
        mind, with the hope that primary sources from the Library’s collection
        will be used by educators. The items are shared with contextual aids
        including curator annotations and links to additional resources for
        further research on the Library’s website.
      </Text>
      <SubHeading>Creating Speculative Annotation</SubHeading>
      <Text>
        Developing <i>Speculative Annotation</i> was a creative and
        collaborative effort. Throughout the process, McClellan conducted three
        kinds of research: studio experimentation, class visits with students
        and educators, and collaborative curation of the{' '}
        <i>Speculative Annotation</i>
        mini collection with Library staff.
      </Text>
      <SubHeading>Studio Experimentation & Design</SubHeading>
      <Text>
        Speculative Annotation was inspired by McClellan’s interest in civic
        engagement and creative notetaking as record. She wanted to stage a
        space where students feel valued within a conversation about shared
        history. When thinking about annotation as an artistic gesture, she
        looked to the work of other contemporary artists such as Wendy Red Star,
        Tony Cokes, and Laura Owens. Her research also extended to
        interdisciplinary conversations around annotation. The book Annotation
        (The MIT Press Essential Knowledge series) (2021) was especially
        important to her exploration, as was speaking with its authors, Dr. Remi
        Kalir and Dr. Antero Garcia.
      </Text>
      <Text>
        McClellan worked in a printmaking studio to explore markmaking and
        printing processes in order to consider annotation as an artistic
        medium. Monoprinting and collage particularly informed the tool, and can
        be seen in the form of hand cut stamps. McClellan wanted the application
        to feel touched, handmade even in its digital format. These principles
        guided many visual choices in the resulting site.{' '}
      </Text>
      <Text>
        The design of Speculative Annotation’s tools and features visually
        contrasted the archival material presented in the mini collection. The
        color palette was inspired by colors regularly used for annotation, like
        fluorescent highlighter yellow, diverging from the muted colors of many
        of the aged artifacts and allowing the annotations to be highly visible.
        Many of the stamp forms, like an arrow or a pointing finger, also allow
        the user to draw attention to a particular aspect of the historical
        items,while thought bubbles and punctuation marks offer a way to share
        ideas, opinions or emotional reactions.
      </Text>
      <Box as="figure" aria-labelledby="fig1" textAlign="center" mb={6}>
        <Flex direction="row" w="100%">
          <Image
            objectFit="cover"
            w="50%"
            src={courtney1}
            alt="Courtney McClellan"
          />
          <Image
            objectFit="cover"
            w="50%"
            src={courtney2}
            alt="Courtney McClellan"
          />
        </Flex>
        <figcaption id="fig1">
          McClellan testing types of markmaking in the printmaking studio
        </figcaption>
      </Box>

      <SubHeading>Class Visits</SubHeading>
      <Text>
        McClellan virtually visited classes throughout the development of the
        tool in order to learn about the kinds of conversations students and
        teachers wanted to have with history. These visits began with McClellan
        sharing the Library’s Free to Use digital collection items and asking
        students to annotate them with applications with which they were already
        familiar. You can access these items here:{' '}
        <Link href="https://www.loc.gov/free-to-use/" isExternal>
          https://www.loc.gov/free-to-use/
        </Link>
        . She learned from the writings and drawings students made, and listened
        to their advice about what they wanted from the tool. When the tool was
        prototyped, students and educators tested the site, giving feedback and
        brainstorming solutions to educational and technical challenges.
      </Text>
      <Text>
        Students shared that they most often hand-annotated with a highlighter,
        so a highlighter was added to the toolbar. They also wanted to be able
        to zoom deeper into the images allowing for a more detailed view of a
        given item. Finally, students suggested ways to make the tool more user
        friendly. For example, they requested that the text tool be contained
        within a bounding box, allowing students to write longer annotations
        that could wrap to multiple lines.
      </Text>

      <Text>
        Read more about McClellan’s visit to educator Ashley Wood’s photography
        class here:
        <Link href="https://blogs.loc.gov/thesignal/2020/12/speculative-annotation-in-the-classroom-a-conversation-with-educator-ashley-wood-and-innovator-courtney-mcclellan/">
          https://blogs.loc.gov/thesignal/2020/12/speculative-annotation-in-the-classroom-a-conversation-with-educator-ashley-wood-and-innovator-courtney-mcclellan/
        </Link>
      </Text>
      <Text>
        <i>Speculative Annotation</i> aims to foster visual literacy and
        interpretation of primary sources across subjects. The tool is informed
        by methods of historical analysis, literary close reading, and studio
        art critique.
      </Text>
      <SubHeading>Library Research and Curation of Mini Collection</SubHeading>
      <Text>
        Working with curators, Library staff and field experts, McClellan
        developed the mini collection in parallel with the creation of the
        Speculative Annotation website. Library curators provided a host of
        contemporaneous examples of historical annotation from the collection.
        Rosenwald and Rare Book curators, for example, shared medieval
        manuscript materials that included ample margin space with the
        expectation that scholars would add in their own notes. At the time,
        books were rare and expensive to create, and scholars would often travel
        to a manuscript, and document their findings directly in the same book.
        These historical examples of annotation influenced the layout of the
        tool, for example, the need for extra space around an item.
      </Text>
      <Box as="figure" aria-labelledby="fig2" textAlign="center" mb={6}>
        <Flex direction="row" w="100%">
          <Image
            objectFit="cover"
            w="100%"
            src={aboutImg}
            alt="Courtney McClellan"
          />
        </Flex>
        <figcaption id="fig2">
          Peter Schoeffer Mainz’s Institutiones, cum glossa c. 1468. Rosenwald
          Collection, Rare Book and Special Collections Division.
        </figcaption>
      </Box>

      <Text>
        Library staff also proposed works to be included in the Speculative
        Annotation mini collection. Through conversations with experts from
        around the Library, several key themes related to storytelling and
        imagination emerged among the items, including civil and human rights,
        the creative process, and technological development.
      </Text>
      <Text>
        Read more about the curation of the mini collection here:{' '}
        <Link
          href="https://blogs.loc.gov/thesignal/2021/04/selecting-items-speculative-annotation"
          isExternal
        >
          https://blogs.loc.gov/thesignal/2021/04/selecting-items-speculative-annotation
        </Link>
      </Text>
      <SubHeading>About the Artist</SubHeading>
      <Text>
        Courtney McClellan (she/her/hers) is the 2021 Innovator in Residence at
        the Library of Congress. She is a visual, research-based artist who
        lives in Atlanta, GA, and works in a range of media including sculpture,
        performance, photography, and writing. In subject, McClellan's work
        addresses speech and civic engagement. She has served as studio art
        faculty at Virginia Commonwealth University, the University of Georgia,
        and Georgia State University. Most recently, she was the 2019-2020 Roman
        J. Witt Artist in Residence at the University of Michigan.
      </Text>
      <SubHeading>About the Program</SubHeading>
      <Text>
        The Innovator in Residence Program is a creative research residency
        funded by the Library of Congress Labs. Innovators such as McClellan
        work with Library of Congress collections and staff to create short-term
        experimental public projects that enrich the work, life, and imagination
        of the American people.
      </Text>
      <Text>Press contact: Jaime Mears, jame@loc.gov</Text>
      <SubHeading>Get Involved</SubHeading>
      <Text>
        If you would like to share your Speculative Annotation, post it on
        social media with #AnnotateLOC or email it directly to:{' '}
        <Link href="mailto: LC-Labs@loc.gov">LC-Labs@loc.gov</Link>
      </Text>
      <SubHeading>Thank you</SubHeading>
      <Text>
        Speculative Annotation would not be possible without the work of:
      </Text>
      <Wrap direction="column" pb={6}>
        <WrapItem>Adam Arling, Developer</WrapItem>
        <WrapItem>Jess Vu, UX Consultant</WrapItem>
        <WrapItem>Olivia Graham, Graphic Design Intern</WrapItem>
      </Wrap>
      <Text>Additional Thanks to:</Text>
      <Wrap direction="column" pb={6}>
        <WrapItem>Jaime Mears, Senior Innovation Specialist, LC Labs</WrapItem>
        <WrapItem>The LC Labs Team </WrapItem>
        <WrapItem>Remi Kalir PhD and Antero Garcia PhD</WrapItem>
        <WrapItem>
          Emily Kirkpatrick and the National Council of Teachers of English
        </WrapItem>
        <WrapItem>Kaleena Stasiak, Printmaker</WrapItem>
        <WrapItem>Josh Hadro and the team at IIIF</WrapItem>
      </Wrap>
      <Text>The contributing staff of the Library of Congress:</Text>
      <Wrap direction="column" pb={6}>
        <WrapItem>Manuscript Division</WrapItem>
        <WrapItem>Prints and Photographs Division</WrapItem>
        <WrapItem>Hispanic Section</WrapItem>
        <WrapItem>Near East Section</WrapItem>
        <WrapItem>American Folklife Center</WrapItem>
        <WrapItem>Performing Arts Division</WrapItem>
        <WrapItem>Music Division</WrapItem>
        <WrapItem>Serial and Government Publications</WrapItem>
        <WrapItem>Rare Book Division</WrapItem>
        <WrapItem>Geography and Maps Division</WrapItem>
        <WrapItem>
          Professional Learning, Outreach & Initiatives Office
        </WrapItem>
        <WrapItem>Motion Picture, Broadcasting & Recorded Sound</WrapItem>
      </Wrap>
      <Text>The teachers and students who advised during development:</Text>
      <Wrap direction="column" pb={6}>
        <WrapItem>
          Ashley Wood’s Photography class at Francis W. Parker Charter Essential
          School, Fort Devens, MA
        </WrapItem>
        <WrapItem>
          Shakirah Bryant’s Design class at Benjamin Banneker High School,
          Atlanta, GA
        </WrapItem>
        <WrapItem>
          Patrick Pilkey, Dorsey Sammataro and Heidi Domescik’s AP Art classes
          at Holy Innocent’s Episcopal School, Atlanta, GA
        </WrapItem>
        <WrapItem>
          Monica Rowley’s English classes at Brooklyn Technical High School,
          Brooklyn, NY
        </WrapItem>
        <WrapItem>
          Melissa Guerrette’s 5th grade Language Arts class at Oxford
          Elementary, Oxford, ME
        </WrapItem>
      </Wrap>
    </Container>
  );
}

export default SiteAbout;
