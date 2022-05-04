import Head from "next/head";
import styles from "../styles/Home.module.css";
import Main from "../Components/Main";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tabela Fipe</title>
        <meta name="description" content="Busca de preços de carros" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main />

      <footer className={styles.footer}>
        Desenvolvido por{" "}
        <a href="https://github.com/flipggs" target="_blank" rel="noreferrer">
          flipggs
        </a>
      </footer>
    </div>
  );
}
