import styles from '@/styles/Cards.module.css'
import Card from '@/pages/components/Card'
import { Pokemon } from '../types/pokemon';

interface Props {
  items: Pokemon[];
}
export default function Cards({items}: Props) {
  return (
    <div className={styles['cards-container']}>
      {items && items.map(( item:Pokemon, index ) => (
        <Card key={ index } item={ item } />
      ))}
    </div>
  )
}
