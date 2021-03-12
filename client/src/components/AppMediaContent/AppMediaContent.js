import clsx from 'clsx'
import styles from './AppMediaContent.module.scss'

export function AppMediaContent({ trailer, content }) {
    return (
        <section className={clsx(styles.root, 'container container--sm')}>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
            <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </section>
    )
}