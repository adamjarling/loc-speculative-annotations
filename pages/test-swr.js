import Layout from "../components/layout";
import Head from "next/head";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TestSWR() {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/albums",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>...loading</div>;

  return (
    <Layout>
      <Head>
        <title>SWR Data Fetch Test</title>
      </Head>
      {data.map((album) => (
        <p key={album.id}>{album.title}</p>
      ))}
    </Layout>
  );
}
