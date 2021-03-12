import styles from './AppHero.module.scss';

export function AppHero({ title, content, coverUrl }) {
    return (
        <header className={styles.root} style={{ backgroundImage: `url(${coverUrl})` }}>
            <div className="container container--sm">
                <h1>{title}</h1>
                <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        </header>
    )
}
