import Link from 'next/link'
import styles from './AppHeader.module.scss'



export function AppHeader({ menuItems }) {
    return (
        <header>
            <nav className={styles.nav}>
                <Link className={styles.logo} href="/">המלצות נטפליקס</Link>
                <ul className={styles.menu}>
                    {menuItems.map((item, itemIndex) => (<li key={itemIndex}><Link href={item.url}>{item.label}</Link></li>))}
                </ul>
            </nav>
        </header>
    )
}