import styles from '@/styles/Cards.module.css'
import Card from '@/pages/components/Card'
import { Pokemon } from '../types/pokemon';

interface Props {
  items: Pokemon[];
}
export default function Cards({items}: Props) {
  const getPokemonsCount = () => {
    return items.length;
  };
  return (
    <div>
      <div className={styles['cards-header']}>
        <h2>Pokemons: {getPokemonsCount()}</h2>
      </div>
      <div className={styles['cards-container']}>
        {items && items.map(( item:Pokemon, index ) => (
          <Card key={ index } item={ item } data-testid="pokemon-card" />
        ))}
      </div>
    </div>
  )
}
