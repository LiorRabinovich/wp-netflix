import { AppSlider } from '~/components/AppSlider/AppSlider'
import styles from './AppSection.module.scss'

export function AppSection({ title, items, prefixLink }) {
    return (
        <section className={styles.root}>
            <h2>{title}</h2>
            <AppSlider items={items} prefixLink={prefixLink} />
        </section>
    )
}