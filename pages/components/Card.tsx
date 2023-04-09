import Image from 'next/image'
import styles from '@/styles/Card.module.css'
import { useFectch } from '@/pages/utils/useFetch'
import { Pokemon, PokemonDetails, PokemonList } from '../types/pokemon';

interface PokemonDetailResponse {
  data: PokemonDetails | null;
  loading: boolean;
  error: boolean;
}
interface Props {
  item: Pokemon;
}
export default function Card({ item }: Props) {
  const response: PokemonDetailResponse = useFectch({url: item.url});
  const { data, loading, error } = response;
  return (
    <div className={styles['card']} data-testid="pokemon-card">
      {error && <h1>Something went wrong</h1>}
      {loading && <h1>Loading...</h1>}
      {data && (
        <>  
          <div className={styles['card-image']}>
            <Image src={data.sprites.front_default} alt={data.name} width={300} height={300} />
          </div>
          <div className={styles['card-content']}>
            <h2>{data.name}</h2>
            <p>{data.types.map((type) => type.type.name).join(', ')}</p>
          </div>
        </>
      )}
    </div>
  )
}
