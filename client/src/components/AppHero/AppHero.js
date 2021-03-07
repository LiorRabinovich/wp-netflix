import styles from './AppHero.module.scss';

export function AppHero({ title, context }) {
    return (
        <header className={styles.root}>
            <h1>{title}</h1>
            <p>{context}</p>
        </header>
    )
}