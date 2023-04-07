import Image from 'next/image'
import styles from '@/styles/Card.module.css'
import { useFectch } from '@/pages/utils/useFetch'

export default function Card({ item }) {
  const { data, loading, error } = useFectch(item.url);
  return (
    <div className={styles['card']} data-testid="pokemon-card">
      {error && <h1>Something went wrong</h1>}
      {loading && <h1>Loading...</h1>}
      {data && (
        <>  
          <div className={styles['card-image']}>
            <Image src={data.sprites.front_default} alt={data.name} width={200} height={200} />
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
