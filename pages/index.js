import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import ImageTest from "../components/image-test";
import { Container } from "@chakra-ui/react";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Speculative Annotations</title>
      </Head>
      <ImageTest />
    </Layout>
  );
}
