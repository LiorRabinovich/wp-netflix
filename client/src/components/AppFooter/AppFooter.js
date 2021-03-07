import Link from 'next/link'
import styles from './AppFooter.module.scss'

export function AppFooter() {
    return (
        <footer className={styles.root}>כל הזכויות שמורות ל<Link href="/">המלצות נטפליקס</Link> &copy; 2021 - {new Date().getFullYear() + 1}</footer>
    )
}