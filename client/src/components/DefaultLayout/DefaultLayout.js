import { Fragment } from 'react'

import { AppHeader } from '~/components/AppHeader/AppHeader';
import { AppFooter } from '~/components/AppFooter/AppFooter';


const Movies = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const MenuItems = [
  { title: 'סרטים מומלצים בנטפליקס', href: '/movies' },
  { title: 'סדרות מומלצות בנטפליקס', href: '/series' },
  { title: 'צור קשר', href: '/contact' },
]

export function DefaultLayout({ children, menuItems }) {
  return (
    <Fragment>
      <AppHeader menuItems={menuItems} />
      <main className="main">{children}</main>
      <AppFooter />
    </Fragment>
  )
}