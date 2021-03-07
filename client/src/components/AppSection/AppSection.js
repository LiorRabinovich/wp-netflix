import { Fragment, useEffect, useRef, useState } from 'react';
import clsx from 'clsx'
import Link from 'next/link'

import { AppSlider } from '~/components/AppSlider/AppSlider'
import styles from './AppSection.module.scss'

export function AppSection({ title, items }) {
    return (
        <section className={styles.root}>
            <h2>{title}</h2>
            <AppSlider items={items} />
        </section>
    )
}