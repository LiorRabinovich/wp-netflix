import { useState, useEffect, useRef } from 'react';
import { Fragment } from 'react'
import styles from './AppMediaContent.module.scss'

export function AppMediaContent({ trailer, title, content }) {
    const [frameHeight, setFrameHeight] = useState('300px');

    return (
        <Fragment>
            <iframe
                className={styles.iframe}
                style={{ height: frameHeight }}
                src={`https://www.youtube.com/embed/${trailer}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>

            <section className="container container--sm">
                <h1 onClick={() => setFrameHeight('calc(100vh - 75px)')}>{title}</h1>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
            </section>
        </Fragment>
    )
}