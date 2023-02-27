import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Remark Radar</title>
        <meta
          name="description"
          content="A work in progress by Ishraq Hasan."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mymain}>
        <div className={styles.center}>
          <div className={styles.description}>
            <h1>REMARK RADAR &nbsp;</h1>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.mydescription}>
            <p align="center">
              Remark Radar is an app that lets anyone add <br />
              interactivity to their website by adding a comments section. This
              site is a work in progress...
            </p>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.description}>
            <h3> - Ishraq Hasan &nbsp;</h3>
          </div>
        </div>
      </main>
    </>
  );
}
