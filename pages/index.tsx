import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Cards from '@/pages/components/Cards'
import SearchForm from './components/SearchForm'
import { Pokemon, PokemonList } from './types/pokemon'

const getPokemons = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [apiPokemons, setApiPokemons] = useState([] as Pokemon[]);
  const [filteredPokemons, setFilteredPokemons] = useState([] as Pokemon[]);
  const [message, setMessage] = useState('' as string);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=12' as string);
  const getNextPokemons = async () => {
    const response: PokemonList = await getPokemons(nextUrl);
    const { results, next } = response;
    setApiPokemons([...apiPokemons, ...results]);
    setNextUrl(next);
  };
  const getFirstPokemons = async () => {
    const { results, next } = await getPokemons('https://pokeapi.co/api/v2/pokemon?limit=12');
    setApiPokemons(results);
    setNextUrl(next);
  };
  const searchPokemons = async (search: string) => {
    const results = apiPokemons.filter((pokemon) => pokemon.name.includes(search));
    if (results.length === 0) {
      setMessage(`No pokemons found by name ${search}`);
      setSearch('');
    }
    setFilteredPokemons(results);
  };
  const resetSearch = () => {
    setFilteredPokemons([]);
  };
  const pokemons = filteredPokemons.length > 0 ? filteredPokemons : apiPokemons;
  useEffect(() => {
    getFirstPokemons();
    console.log('component rendered')
  }, []);
  return (
    <>
      <Head>
        <title>Welcome to pokemons!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to pokemons!
        </h1>
        {message && <h4 className={styles.message}>{message}</h4>}
        <SearchForm search={search} setSearch={setSearch} searchPokemons={searchPokemons} resetSearch={resetSearch}/>
        {pokemons.length > 0 && <Cards items={pokemons}/>}
        {nextUrl && 
        <div>
          <button onClick={getNextPokemons} className={styles['card-button']}>Load More</button>
        </div>}
      </main>
    </>
  )
}
