import styles from './CardsList.module.scss'
import { SingleCard } from '~/components/SingleCard/SingleCard';

export function CardsList({ prefixLink, items, forwardRef }) {
    return (
        <ul className={styles.root} ref={forwardRef}>
            {items.map((item, indexItem) => (
                <li key={indexItem}>
                    <SingleCard
                        prefixLink={prefixLink}
                        databaseId={item.databaseId}
                        title={item.title}
                        description={item.extraPostInfo.description}
                        imgUrl={item.featuredImage?.node?.mediaItemUrl}
                    />
                </li>
            ))}
        </ul>
    )
}