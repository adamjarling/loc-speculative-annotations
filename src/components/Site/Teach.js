import React from 'react';
import {
  Container,
  Divider,
  Heading,
  Link,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import SubHeading from 'components/SubHeading';

function WorkHeading({ children }) {
  return <Heading size="xs">{children}</Heading>;
}

function WorkItem({ children, ...restProps }) {
  return (
    <WrapItem flexDirection="column" {...restProps}>
      {children}
    </WrapItem>
  );
}

function SiteTeach() {
  return (
    <Container maxW="4xl" pb="80px">
      <Heading as="h1">Teach</Heading>
      <Text>
        <i>Speculative Annotation</i> was created for students and teachers.
        This Q&A addresses how <i>Speculative Annotation</i> can be used in the
        classroom.{' '}
      </Text>
      <SubHeading>What are annotations? </SubHeading>
      <Text>
        Annotations are notes or marks added to an existing text or object. They
        can add additional information, share something you noticed or loved, or
        offer another point of view. Annotations provide a way to be in dialogue
        with a text or image, and possibly another person.
      </Text>
      <SubHeading>
        Why would students want to annotate items from the Library’s collection?
      </SubHeading>
      <Text>
        <i>Speculative Annotation</i> enables students to analyze and examine
        historical materials through hands-on engagement. History is an enduring
        mystery. Speculation is a form of investigation. This tool allows
        students to question and examine the point of view of the creators of
        primary sources. In response, student’s annotations are an
        interpretation. We are asking students to make their insights visible
        and in doing so, join history’s record.{' '}
      </Text>
      <SubHeading>Why is the tool called Speculative Annotation?</SubHeading>
      <Text>We define speculation and annotation as follows:</Text>
      <Heading as="h3" size="sm">
        Speculation:
      </Heading>
      <Text>
        Engaging in or projecting on to future events. Theorizing, imagining
        without knowing.
      </Text>
      <Heading as="h3" size="sm">
        Annotation:
      </Heading>
      <Text>
        A note of explanation or comment added to a text or diagram.
        Examples include margin notes, highlighting, thought bubbles.
      </Text>
      <Text>
        <i>Speculative Annotation</i> provides a space for students to examine
        history with an eye for fact-finding and storytelling.{' '}
      </Text>
      <SubHeading>
        How is Speculative Annotation different from other online annotation
        tools?
      </SubHeading>
      <Text>
        In addition to providing basic tools for annotation, Speculative
        Annotation provides a couple of unique features that offer context and
        aid in analysis.
      </Text>
      <Text>
        Quick Questions: These question prompts, some of which came from Project
        Zero at Harvard University, can be found at the top of the tool bar. As
        stamps they provide general questions applicable to any item in order to
        jump start the conversation.{' '}
      </Text>
      <Text>
        LC Staff Annotations and the Learn More panel: The LC Staff Annotation
        associated with some items offers the expertise and perspective of an
        individual Library of Congress staff member. Additionally, the Learn
        More button links to a metadata panel which provides general information
        about the item, like who made it and when it was created.{' '}
      </Text>
      <SubHeading>
        How do you teach with primary sources, particularly if you are not a
        history teacher?
      </SubHeading>
      <Text>
        Primary sources are for everyone, not just historians and history
        students. You probably already use them-- photos, maps, personal
        correspondence, newspaper articles, or professional documents. They can
        enrich any K-12 classroom. The Professional Learning and Outreach
        Initiatives Office offers many resources about how to incorporate
        primary source materials in your classroom.{' '}
      </Text>
      <SubHeading>Primary source guides: </SubHeading>
      <Wrap>
        <WrapItem>
          <Link
            href="https://www.loc.gov/programs/teachers/getting-started-with-primary-sources/"
            isExternal
          >
            https://www.loc.gov/programs/teachers/getting-started-with-primary-sources/{' '}
            <ExternalLinkIcon />
          </Link>
        </WrapItem>
        <WrapItem>
          <Link
            href="https://www.loc.gov/programs/teachers/getting-started-with-primary-sources/guides/"
            isExternal
          >
            https://www.loc.gov/programs/teachers/getting-started-with-primary-sources/guides/{' '}
            <ExternalLinkIcon />
          </Link>
        </WrapItem>
        <WrapItem>
          <Link href="https://crowd.loc.gov/for-educators/" isExternal>
            https://crowd.loc.gov/for-educators/ <ExternalLinkIcon />
          </Link>
        </WrapItem>
        <WrapItem>
          <Link
            href="https://blogs.loc.gov/teachers/2011/11/dealing-with-difficult-subjects-in-primary-sources"
            isExternal
          >
            https://blogs.loc.gov/teachers/2011/11/dealing-with-difficult-subjects-in-primary-sources{' '}
            <ExternalLinkIcon />
          </Link>
        </WrapItem>
      </Wrap>
      <SubHeading>
        How do you select the right item to annotate for you and your students?
      </SubHeading>
      <Text>
        The items included in the <i>Speculative Annotation</i> mini collection
        were chosen with the K-12 audience in mind. Of course, some items will
        be more applicable to specific subjects and ages. To help select
        material that is right for your students, review the subject headings in
        the Learn More panel available for each item.{' '}
      </Text>
      <Divider pt={6} />
      <SubHeading>
        A few suggestions of items associated with academic subject and age:
      </SubHeading>
      <Wrap spacing={6}>
        <WorkItem pt={4}>
          <WorkHeading>Item #33 Finn and Edith Ronne Photograph</WorkHeading>
          An elementary school Geography class learning about Antarctica
        </WorkItem>
        <WorkItem>
          <WorkHeading>
            Item #6 Civil rights march on Wash[ington], D.C. / [WKL]{' '}
          </WorkHeading>
          An elementary school Social Studies class learning about Civil Rights
        </WorkItem>
        <WorkItem>
          <WorkHeading>
            Item #34 Thomas Biggs Harned Collection of the Papers of Walt Whitman:
            Recovered Cardboard Butterfly and Notebooks, [1847]-[circa
            1863-1864]; Notebooks; [1847]
          </WorkHeading>{' '}
          A high school American Literature class studying Poetry
        </WorkItem>
        <WorkItem>
          <WorkHeading>
            Item #26 Wm. Oland Bourne Papers: Left-hand Penmanship contest; Broadsides,
            1866-1867
          </WorkHeading>{' '}
          A high school American History class studying the Civil War
        </WorkItem>
        <WorkItem>
          <WorkHeading>Item #13 The Star Spangled Banner</WorkHeading> A middle school Band class studying Anthems
        </WorkItem>
        <WorkItem>
          <WorkHeading>
            Item #19 Proposed Recording Expedition into the Floridas by Zora Neal Hurston
          </WorkHeading>{' '}
          A high school American Literature class preparing to Read Their Eyes
          Were Watching God
        </WorkItem>
        <WorkItem>
          <WorkHeading>Item #10 Ṣuwar al-kawākib.</WorkHeading> A high school Astronomy
          class studying constellations
        </WorkItem>
        <WorkItem>
          <WorkHeading>Item #20 Candide Costume</WorkHeading> A middle school Theater
          class studying Works Progress Administration productions
        </WorkItem>
        <WorkItem>
          <WorkHeading>
            Item #5 [Vietnam Veterans Memorial. Competition drawing]
          </WorkHeading>{' '}
          A high school Current Events class studying Monuments
        </WorkItem>
        <WorkItem>
          <WorkHeading>
            Item #18 Napoleon's bedroom, Palace of Fontainebleau, France
          </WorkHeading>{' '}
          A high school World History class learning about the French Revolution
        </WorkItem>
        <WorkItem>
          <WorkHeading>
            Item #29 [Robert Cornelius, self-portrait; believed to be the earliest extant
            American portrait photo]
          </WorkHeading>{' '}
          A high school Photography class studying self portraiture
        </WorkItem>
        <WorkItem>
          <WorkHeading>Item #21 Save The Pacific Northwest Tree Octopus</WorkHeading> A
          elementary school Language Arts class working on internet literacy
        </WorkItem>
      </Wrap>
      <Divider py={6} />
      <SubHeading>
        Can students annotate the same item concurrently?
      </SubHeading>{' '}
      <Text>
        No. Currently, students can not co-annotate a{' '}
        <i>Speculative Annotation</i> item simultaneously. While students cannot
        edit the same item on separate devices in real time, to allow for such 
        annotations they can download and share their annotations with one 
        another and their teacher, using{' '}  
        <strong>#AnnotateLOC</strong>. Additionally, teachers can project or
        share their screen and model annotations for their students.
      </Text>
      <SubHeading>Can students turn in their annotations?</SubHeading>{' '}
      <Text>
        Yes, students can download their annotations as a PNG file and share it.
      </Text>
      <SubHeading>
        How can you continue the conversation with Library staff and fellow
        teachers?
      </SubHeading>{' '}
      <Text>
        Help grow <i>Speculative Annotation</i>’s learning community by following other
        educators’ lessons, exercises, and implementation of the tool, or share
        your own with <strong>#AnnotateLOC</strong>.
      </Text>
      <Text>
        Use the Library’s Ask a Librarian service to further research a
        particular item or collection:{' '}
        <Link href="https://ask.loc.gov/" isExternal>
          https://ask.loc.gov/ <ExternalLinkIcon />
        </Link>
      </Text>
      <Text>
        Additional resources, interviews and events about{' '}
        <i>Speculative Annotation</i>
         can be found here:{' '}
        <Link
          href="https://labs.loc.gov/work/experiments/annotation/?loclr=blogsig"
          isExternal
        >
          https://labs.loc.gov/work/experiments/annotation/?loclr=blogsig{' '}
          <ExternalLinkIcon />
        </Link>
      </Text>
    </Container>
  );
}

export default SiteTeach;
