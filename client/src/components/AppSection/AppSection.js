import Link from 'next/link'
import { AppSlider } from '~/components/AppSlider/AppSlider'
import styles from './AppSection.module.scss'

export function AppSection({ title, href, items, prefixLink }) {
    return (
        <section className={styles.root}>
            <Link href={href}><a><h2>{title}</h2></a></Link>
            <AppSlider items={items} prefixLink={prefixLink} />
        </section>
    )
}