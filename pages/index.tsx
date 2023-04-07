import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Cards from '@/pages/components/Cards'

// create a typescript interface for the setPokemons function
type Pokemon = {
  name: string;
  url: string;
}

const getPokemons = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default function Home() {
  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=12');
  const getNextPokemons = async () => {
    const { results, next } = await getPokemons(nextUrl);
    setPokemons([...pokemons, ...results]);
    setNextUrl(next);
  };
  const getFirstPokemons = async () => {
    const { results, next } = await getPokemons('https://pokeapi.co/api/v2/pokemon?limit=12');
    setPokemons(results);
    setNextUrl(next);
  };
  useEffect(() => {
    getFirstPokemons();
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {pokemons.length > 0 && <Cards items={pokemons}/>}
        {nextUrl && <div>
          <button onClick={getNextPokemons} className={styles['card-button']}>Load More</button>
        </div>}
      </main>
    </>
  )
}
