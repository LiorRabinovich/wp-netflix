import Link from 'next/link'
import styles from './AppSliderItem.module.scss';

export function AppSliderItem({ prefixLink, databaseId, title, description, imgUrl }) {
    return (
        <li>
            <Link href={`${prefixLink}/${databaseId}`}>
                <a>
                    <article className={styles.article}>
                        <img className={styles.img} alt={title} src={imgUrl}></img>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </article>
                </a>
            </Link>
        </li>
    )
}