import Link from 'next/link'
import styles from './SingleCard.module.scss';

export function SingleCard({ prefixLink, databaseId, title, description, imgUrl }) {
    return (
        <Link href={`${prefixLink}/${databaseId}`}>
            <a>
                <article className={styles.article}>
                    <img className={styles.img} alt={title} src={imgUrl}></img>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </article>
            </a>
        </Link>
    )
}