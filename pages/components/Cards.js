import styles from '@/styles/Cards.module.css'
import Card from '@/pages/components/Card'

export default function Cards({ items }) {
  return (
    <div className={styles['cards-container']}>
      {items && items.map((item, index) => (
        <Card key={index} item={item}/>
      ))}
    </div>
  )
}
