import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Center } from "@chakra-ui/react";

const name = "Adam test";
export const siteTitle = "Speculative Annotation Sample Website";

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Speculative Annotations" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <Center mt={6} mb={4}>
          {home ? (
            <>
              <img
                src="/images/logo.png"
                className={`${styles.headerHomeImage} `}
                alt={name}
              />
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <img
                    src="/images/logo.png"
                    className={`${styles.headerImage} `}
                    alt={name}
                  />
                </a>
              </Link>
            </>
          )}
        </Center>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
